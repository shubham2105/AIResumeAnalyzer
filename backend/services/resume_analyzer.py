import os
import json

from dotenv import load_dotenv
from mistralai import Mistral
load_dotenv()



api_key = os.getenv("MISTRAL_API_KEY")

client = Mistral(api_key=api_key)

def analyze_resume(text: str):

    prompt = f"""
You are an ATS Resume Analyzer.

Analyze the resume below.

Return ONLY valid JSON.

Resume:

{text}

Required format:

{{
  "overall_score": 0,
  "summary": "",
  "skills": [],
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "job_roles": []
}}
"""

    response = client.chat.complete(
        model="mistral-large-latest",
        response_format={"type":"json_object"},
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content
    return json.loads(content)

