# NNeX is a tool to get all medical articles for given terms

This part of the project is a wrapper for the pubmed API, to make it more friendly.

# Endpoints

To get all articles with terms:

**POST:** `/articles`

Awaited body :

```json
{
  "terms": ["term1", "term2", "term3"]
}
```

To get an article:

**GET:** `/article/id`

Response type:

```json
{
  "pmid": "31505466",
  "title": "Tales from Topographic Oceans: Topologically associated domains and cancer.",
  "abstract": "The three-dimensional organization of the genome within the cell nucleus has come into sharp focus over the last decade. This has largely arisen because of the application of genomic approaches that have revealed numerous levels of genomic and chromatin interactions, including topologically associated domains (TADs). The current review examines how these domains were identified, are organized, how their boundaries arise and are regulated, and how genes within TADs are coordinately regulated. There are many examples of the disruption to TAD structure in cancer and the altered regulation, structure and function of TADs are discussed in the context of hormone responsive cancers, including breast, prostate and ovarian cancer. Finally, some aspects of the statistical insight and computational skills required to interrogate TAD organization are considered and future directions discussed."
}
```
