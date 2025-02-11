from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from textblob import TextBlob
import speech_recognition as sr
from pydub import AudioSegment
from io import BytesIO

app = Flask(__name__)

# Enable CORS for development
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")


def analyze_text(text):
    doc = nlp(text)

    # Tone analysis (using TextBlob sentiment for better accuracy)
    tone = "Neutral"
    sentiment = TextBlob(text).sentiment.polarity
    if sentiment > 0.1:
        tone = "Positive"
    elif sentiment < -0.1:
        tone = "Negative"

    # Grammar issues and suggestions
    grammar_issues = 0
    suggestions = []
    blob = TextBlob(text)
    for sentence in blob.sentences:
        corrected_sentence = str(sentence.correct())
        if corrected_sentence != sentence.raw:
            grammar_issues += 1
            suggestions.append({
                "original": sentence.raw.strip(),
                "suggested": corrected_sentence.strip()
            })

    # Word count and clarity score
    word_count = len(doc)
    sentence_count = len(list(doc.sents))
    clarity_score = round(min(100, max(50, (sentence_count / word_count) * 1000)), 2) if word_count > 0 else 0

    return {
        "tone": tone,
        "grammar_issues": grammar_issues,
        "clarity_score": clarity_score,
        "suggestions": suggestions
    }


@app.route("/analyze_text", methods=["POST"])
def analyze_text_endpoint():
    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"error": "Text cannot be empty or whitespace-only."}), 400

    analysis = analyze_text(text)
    return jsonify({"analysis": analysis})


@app.route('/interview/analyze-audio', methods=['POST'])
def analyze_audio():
    try:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file uploaded."}), 400

        # Parse audio blob
        audio_blob = request.files['audio']
        audio = AudioSegment.from_file(BytesIO(audio_blob.read()), format="wav")

        # Save temporarily to process (optional; can handle in-memory)
        audio.export("temp.wav", format="wav")

        # Transcribe audio using SpeechRecognition
        recognizer = sr.Recognizer()
        with sr.AudioFile("temp.wav") as source:
            audio_data = recognizer.record(source)
            transcription = recognizer.recognize_google(audio_data)

        # Analyze the transcribed text
        analysis = analyze_text(transcription)

        return jsonify({
            "transcription": transcription,
            "analysis": analysis,
        })
    except sr.UnknownValueError:
        return jsonify({"error": "Unable to transcribe audio. Please try again."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
