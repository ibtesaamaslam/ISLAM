# Content Licensing & Requirements

NoorLocal is a platform for displaying religious texts. The application code is open source, but the **content** (Qur’an text, translations, tafsīr, hadiths) must be supplied by the user or explicitly licensed.

**Do NOT commit copyrighted content to this repository.**

## Required Content Files

The following files must be placed in the `ingest/manifests/` directory before running the ingestion scripts:

1.  **`quran_uthmani.zip`**
    *   **Description:** A canonical Uthmāni Arabic text dataset.
    *   **Source:** Tanzil.net (e.g., `quran-uthmani.txt`) or other licensed corpus.
    *   **License:** Must be compatible with offline distribution (e.g., Creative Commons, Public Domain).
    *   **Format:** Text file or JSON.

2.  **`urdu_translations.zip`**
    *   **Description:** Per-aya Urdu translations.
    *   **Format:** One file per sura or a single structured JSON.
    *   **Metadata:** Must include translator name and license.

3.  **`tafsir_urdu.zip`**
    *   **Description:** Per-aya tafsīr files.
    *   **Format:** Markdown or structured HTML.
    *   **Review Status:** Must be scholar-reviewed or marked for review.

4.  **`hadiths_bukhari.json` & `hadiths_muslim.json`**
    *   **Description:** Licensed datasets for Sahih Bukhari and Sahih Muslim.
    *   **Format:** JSON with fields: `book`, `hadith_no`, `arabic_text`, `translation`, `grade`.

## Ingestion Process

The ingestion scripts (`ingest/scripts/*.py`) will validate the presence of license metadata in the provided files. Content without valid license information will be rejected.

## Scholar Review

All ingested tafsīr and translations are initially marked as `pending` (or `draft`) in the database. A user with `scholar` role must approve them via the Admin CMS before they are visible in the main application.
