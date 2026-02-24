# NoorLocal - Offline Qur’an, Tafsīr, Hadith & RAG Chatbot

NoorLocal is a privacy-first, fully offline web application designed for reading the Qur’an (Uthmāni script), Urdu translations, detailed scholar-reviewed tafsīr per āyah, and Sahih Bukhari & Sahih Muslim hadith collections. It features an offline RAG (Retrieval-Augmented Generation) chatbot capable of answering questions based on the ingested corpus using a locally hosted LLM.

## Features

*   **Offline-First:** No runtime external network calls. All models, embeddings, vector DB, and content are stored locally.
*   **Qur’an Reader:** Uthmāni Arabic script, Urdu translation, and detailed per-aya tafsīr.
*   **Hadith Library:** Sahih Bukhari & Sahih Muslim with metadata and search.
*   **Offline RAG Chatbot:** Queries local vector DB (FAISS/SQLite) and uses a local LLM (Llama 2 via llama.cpp/vllm) for answers with citations.
*   **Admin CMS:** Content ingestion, scholar review workflow, and moderation.
*   **Privacy:** No telemetry by default. Local data export and deletion.

## Prerequisites

*   Node.js (v18+)
*   Python (v3.10+)
*   Docker & Docker Compose (optional, for containerized deployment)
*   Local LLM runtime (llama.cpp or vllm) installed separately.

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/noorlocal.git
    cd noorlocal
    ```

2.  **Install Dependencies:**
    Run the provided install script to setup Node.js and Python environments.
    ```bash
    chmod +x install.sh
    ./install.sh
    ```

3.  **Content Ingestion:**
    Place the required content files in `ingest/manifests/` (see `LICENSE_NOTICE.md` for details).
    Then run the ingestion scripts:
    ```bash
    # Ingest Quran
    python3 ingest/scripts/ingest_tanzil.py
    # Ingest Tafsir
    python3 ingest/scripts/ingest_urdu_tafsir.py
    # Ingest Hadiths
    python3 ingest/scripts/ingest_hadiths.py
    # Build Embeddings & Vector Index
    python3 ingest/scripts/build_embeddings.py
    ```

4.  **Local LLM Setup:**
    Download a GGUF model (e.g., Llama-2-7b-chat.Q4_K_M.gguf) and place it in `models/local_llm/`.
    Update `.env` with the path to your model or the URL of your local LLM server.

5.  **Run the Application:**
    *   **Development:**
        ```bash
        npm run dev
        ```
    *   **Docker:**
        ```bash
        docker-compose up --build
        ```

## Architecture

*   **Frontend:** React + TypeScript + Tailwind CSS.
*   **Backend:** Node.js (Express) with SQLite database.
*   **RAG:** Python/Node.js orchestration using FAISS for vector search and local LLM for generation.
*   **Database:** SQLite for structured data (Quran text, metadata), FAISS for vector embeddings.

## License

See `LICENSE` file. Content licenses are managed via `LICENSE_NOTICE.md`.
