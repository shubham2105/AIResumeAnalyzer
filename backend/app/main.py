from fastapi import FastAPI, UploadFile, File
import fitz

app = FastAPI()


@app.get("/")
def health():
    return {
        "message": "Resume Analyzer API Running"
    }


@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...)
):
    try:
        pdf_bytes = await file.read()

        doc = fitz.open(
            stream=pdf_bytes,
            filetype="pdf"
        )

        text = ""

        for page in doc:
            text += page.get_text("text") + "\n"

        doc.close()

        return {
            "success": True,
            "file_name": file.filename,
            "characters": len(text),
            "text": text
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }