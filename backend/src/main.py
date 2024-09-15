from pathlib import Path
from uuid import uuid4, UUID

import requests
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
DATA_DIRECTORY = Path(__file__).parent.parent / "data"

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/files/")
def get_files():
    """ファイルの一覧を取得する"""
    filenames = [filepath.name for filepath in DATA_DIRECTORY.glob("*")]
    return JSONResponse({"filenames": filenames})


@app.post("/files/upload")
async def save_upload_file(file: UploadFile = File(...)):
    """アップロードされたファイルを保存する

    Args:
        file (UploadFile, optional): _description_. Defaults to File(...).
    """
    file_extension = file.filename.split(".")[-1]  # 拡張子を取得
    file_id = uuid4().hex
    unique_filename = file_id + "." + file_extension  # ファイル名を生成

    # 保存先のパスを生成
    save_path = DATA_DIRECTORY / Path(unique_filename)

    # ファイルの保存
    try:
        contents = await file.read()
        with open(save_path, "wb") as f:
            f.write(contents)

        return JSONResponse(
            {
                "message": "File uploaded successfully",
                "file_id": file_id,
                "filename": file.filename,
            },
            status_code=201,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/files/{file_id}")
def delete_file(file_id: UUID):
    """ファイルを削除する

    Args:
        file_id (UUID): _description_
    """
    filepaths = [filepath for filepath in DATA_DIRECTORY.glob(f"{file_id.hex}.*")]

    if len(filepaths) == 0:
        raise HTTPException(status_code=404, detail="File not found")
    elif len(filepaths) > 1:
        raise HTTPException(status_code=500, detail="Multiple files found")
    else:
        filepaths[0].unlink()

    return JSONResponse(
        {
            "message": "File deleted successfully",
            "file_id": file_id.hex,
        },
        status_code=204,
    )

@app.get("/files/download")
async def download_file(url: str):
    """ファイルをダウンロードする

    Args:
        url (str): ダウンロードするファイルのURL

    Returns:
        FileResponse: ファイルのダウンロード
    """
    filename = url.split("/")[-1]
    file_extension = filename.split(".")[-1]  # 拡張子を取得
    if file_extension not in ["pdf"]:
        raise HTTPException(status_code=400, detail="Invalid file extension")
    
    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to download the file")
    
    # ファイルの保存
    file_id = uuid4().hex
    unique_filename = file_id + "." + file_extension
    save_path = DATA_DIRECTORY / Path(unique_filename)
    
    with open(save_path, "wb") as f:
        f.write(response.content)
    
    return JSONResponse(
        {
            "message": "File downloaded successfully",
            "file_id": file_id,
            "filename": filename,
        },
        status_code=201,
    )
    