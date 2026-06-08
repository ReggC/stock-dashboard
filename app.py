from flask import Flask, render_template, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("d8g548hr01qlgcuha0b0d8g548hr01qlgcuha0bg")

if not API_KEY:
    raise Exception("FINNHUB_API_KEY is not set")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/quote/<symbol>")
def quote(symbol):

    try:
        quote_url = (
            f"https://finnhub.io/api/v1/quote"
            f"?symbol={symbol}&token={API_KEY}"
        )

        profile_url = (
            f"https://finnhub.io/api/v1/stock/profile2"
            f"?symbol={symbol}&token={API_KEY}"
        )

        quote = requests.get(quote_url, timeout=5).json()
        profile = requests.get(profile_url, timeout=5).json()

        return jsonify({
            "quote": quote,
            "profile": profile
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)