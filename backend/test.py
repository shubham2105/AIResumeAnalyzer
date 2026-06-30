from services.resume_analyzer import analyze_resume

result = analyze_resume("""
React Native Developer
Python
FastAPI
Firebase
""")

print(result)