# Design: Test Listings Added To Report (DOCX)

## Goal
Append a comprehensive test listings section to the end of `LR7_Anisimova_KA.docx` that includes all test-related files, each labeled with a filename header and followed by a monospaced listing.

## Scope
Include all test-related artifacts:
- `tests/specs/*`
- `tests/pages/*`
- `tdd/*`
- `playwright.config.ts`

## Format
- Insert at the end of the document.
- For each file:
  - Header line: `Файл <path>` in Times New Roman 14 pt (same as body text).
  - Listing: monospaced `Courier New` 12 pt, left-aligned, with left indent.
  - A blank line between file blocks.

## Ordering
1. `tests/specs/*`
2. `tests/pages/*`
3. `tdd/*`
4. `playwright.config.ts`

## Constraints
- Preserve existing document formatting and content.
- Do not add narrative text; only labeled listings.

## Success Criteria
- The report ends with a complete test listings section.
- Each file is clearly labeled with `Файл <path>` and its contents displayed verbatim in monospaced text.
- No changes elsewhere in the document.
