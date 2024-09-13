import sys
from pathlib import Path
from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient
from fastapi.responses import Response

from backend.src.main import app, DATA_DIRECTORY


client = TestClient(app)


@pytest.fixture(autouse=True, scope="function")
def setup():
    DATA_DIRECTORY.mkdir(exist_ok=True)
    yield
    for file in DATA_DIRECTORY.glob("*"):
        file.unlink()


def test_save_upload_file():
    """ファイルのアップロードをテスト"""
    test_file_content = b"Hello, this is a test file."
    files = {"file": ("test.txt", test_file_content)}

    response: Response = client.post(url="/files/upload", files=files)

    # -------------
    # Assert
    # ------------
    actual_file_path = DATA_DIRECTORY / Path(response.json()["file_id"] + ".txt")

    assert response.status_code == 201
    assert actual_file_path.exists()
    assert actual_file_path.read_bytes() == test_file_content


def test_save_upload_file_failure_500():
    """ファイルのアップロード失敗をテスト"""
    # 存在しないディレクトリをモック
    with patch(target="src.main.DATA_DIRECTORY", new=Path("/invalid/directory")):
        test_file_content = b"Hello, this is a test file."
        files = {"file": ("test.txt", test_file_content)}

        response = client.post(url="/files/upload", files=files)

        assert response.status_code == 500


def test_delete_file():
    """ファイルの削除をテスト"""
    test_file_content = b"Hello, this is a test file."
    files = {"file": ("test.txt", test_file_content)}

    response: Response = client.post(url="/files/upload", files=files)
    file_id = response.json()["file_id"]
    response: Response = client.delete(url=f"/files/{file_id}")

    assert response.status_code == 204
    assert not (DATA_DIRECTORY / Path(response.json()["file_id"] + ".txt")).exists()


def test_get_files():
    """ファイル一覧の取得をテスト"""
    test_file_content = b"Hello, this is a test file."
    files = {"file": ("test.txt", test_file_content)}
    
    # ファイルを2つアップロード
    file_ids = []
    response: Response = client.post(url="/files/upload", files=files)
    file_ids.append(response.json()["file_id"])
    response: Response = client.post(url="/files/upload", files=files)
    file_ids.append(response.json()["file_id"])
    expected_filenames = [ file_id + ".txt" for file_id in file_ids]
    expected_filenames.sort()
    
    # ファイル一覧を取得
    response: Response = client.get(url="/files/")
    actual_filenames = response.json()["filenames"]
    actual_filenames.sort()
    
    assert response.status_code == 200
    assert actual_filenames == expected_filenames
    