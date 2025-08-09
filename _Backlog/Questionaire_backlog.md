# EU AI Act compliance questionnaire: important angles that are still missing


## 1) Explicit open‑source scope test (material scope, early)
- Add a direct “FOSS scope” gate after the AI definition and territorial/market questions: confirm the system is released under a free and open‑source license and not monetized, and then route to checks for prohibited uses (Art.5), high‑risk classification, and transparency duties (Art.50), which still apply even if FOSS.[1][2][3]
- Make clear that APIs/cloud access “for free” still counts as making available/placing on the market; the FOSS exclusion is narrow and does not cover prohibited, high‑risk, or transparency‑triggering systems.[2][3][1]

## 2) Monetization and license-terms test for FOSS
- Insert a monetization screen specific to the open‑source branch: any price, ad‑supported distribution, compelled cross‑sell, or data‑for‑access can disqualify the exemption per EC guidance; non‑commercial or research‑only license clauses also break the “free/open” condition.[4][5][2]
- Require public availability of weights/parameters, architecture, and usage information; otherwise no FOSS GPAI exemptions.[5][4]

## 3) GPAI open‑source obligations vs exemptions
- In the GPAI section, distinguish baseline GPAI duties from the FOSS carve‑outs: FOSS GPAI providers are still required to publish a sufficiently detailed training data summary and to implement a copyright‑compliance policy; they are exempt from the technical documentation to authorities and downstream documentation, and from appointing an EU representative, unless systemic risk applies.[6][7][2]
- Add a “systemic risk” override: if systemic risk criteria or designation apply, all GPAI obligations attach regardless of open source.[8][9][10]

## 4) Systemic‑risk GPAI designation paths
- Build a dedicated branch that captures all routes to “GPAI model with systemic risk”:  
  - Compute threshold (e.g., ≥10^25 FLOPs),  
  - Demonstrated high‑impact capabilities or scale, or  
  - Formal designation/notification by the Commission/AI Office.[9][10][8][6]
- Tie these paths to the extra Article 55 obligations (evaluations, risk assessment/mitigation, incident reporting), removing any FOSS exemptions once triggered.[10][9][6]

## 5) Timing and transitional application
- Add timing questions that map to the staged application dates for:  
  - Prohibitions and AI literacy (from 2 Feb 2025),  
  - GPAI/oversight/penalties governance (from 2 Aug 2025),  
  - Broader obligations (from 2 Aug 2026), and specific transitional relief for GPAI models placed before 2 Aug 2025 (compliance by 2 Aug 2027).[11][12][13][10]
- Your legacy questions already reference 2 Aug 2025; extend logic so GPAI providers placed before that date see the 2 Aug 2027 deadline where applicable.[13][11][10]

## 6) Clarify “placing on the market” and “making available”
- Add a scoping item that explains that making available in the EU—paid or free; via download, API, cloud, embedded—counts as placing/making available, relevant for territorial scope and for invalidating broad “FOSS takes you out of scope” assumptions.[3][1]

## 7) Transparency duties for “limited‑risk” systems
- Ensure Art.50 triggers are explicit and independent of FOSS status: user‑facing AI interactions and deepfakes/synthetic content require disclosure even if the system is open source.[1][2]
- Tighten your existing “limited‑risk” questions to always route to these duties when yes.[2][1]

## 8) Third‑party components and upstream roles
- Add a branch for third‑party tools/components used in high‑risk systems: if released FOSS, certain third‑party reporting duties are exempt (tools/services/components other than GPAI), but the system provider remains responsible for the high‑risk obligations overall.[2]
- Clarify supply‑chain roles (provider, importer, distributor, authorized representative) with emphasis that GPAI Chapters V obligations directly bind GPAI providers, including non‑EU providers targeting the EU.[12][13]

## 9) Governance, enforcement, penalties readiness
- Add questions to assess readiness for: national authority designations, notified bodies, and penalties becoming applicable on 2 Aug 2025; this affects conformity assessments and post‑market oversight planning.[8][11][12]
- Include an item on whether the user expects to use standards, codes of practice, or implementing acts for GPAI compliance from Aug 2025 onward.[11][12][10]

## 10) Copyright compliance policy and training data summary
- For every GPAI branch (including FOSS), ask:  
  - Has a written copyright policy been adopted and implemented?  
  - Has the training data summary been published per the AI Office template?  
  Both are mandatory for GPAI and remain mandatory for FOSS GPAI.[7][9][2]

## 11) Research‑only vs commercial use
- Insert a use‑mode fork: purely scientific research activities may be excluded from scope, but once the system is placed on the market or used beyond research, full obligations can apply; keep this separate from the FOSS angle to avoid conflation.[3][1]

## 12) Hybrid/combined systems
- Add a check for hybrid setups where a non‑high‑risk system integrates or orchestrates high‑risk components, or where user‑facing shells wrap GPAI backends; ensure obligations flow correctly to the responsible actor(s) and that transparency duties are not missed.[14][15][13]

## 13) Clarify “no significant risk” derogation for Annex III
- You already include the Article 6(3) derogation test; add explicit routing so that, if the derogation fails, the full high‑risk obligations apply, and if it passes, document the rationale and controls maintained despite the derogation.[13]

## 14) API distribution and geo‑fencing
- Add an item on whether technical and contractual controls restrict EU availability and EU use of outputs; this matters for territorial scope and for whether obligations are triggered despite a non‑EU establishment.[1][3]

## 15) Codes of practice vs implementing acts for GPAI
- Ask whether the organization is aligning to the GPAI codes of practice and tracking potential implementing acts if codes prove insufficient, both relevant from 2 Aug 2025 onward.[6][10][11]

Where to insert:
- Applicability: add the FOSS scope/monetization/licensing checks, “making available” clarification, research‑only fork, and API/geo‑fencing question.[3][1][2]
- Risk: ensure Art.50 transparency triggers are independent of FOSS; keep prohibited uses first.[1][2]
- Roles/Supply chain: reinforce importer/distributor/authorized representative logic and third‑party component exemptions scope.[13][2]
- GPAI: expand with FOSS vs baseline obligations, systemic‑risk paths, and the copyright/training‑summary must‑haves.[9][10][7][6][2]
- Timing: add staged applicability and transitional relief mapping into your legacy/timeline branch.[12][10][11][13]

[1] https://artificialintelligenceact.eu/article/2/
[2] https://linuxfoundation.eu/newsroom/ai-act-explainer
[3] https://www.orrick.com/en/Insights/2025/04/EU-Commission-Publishes-Guidelines-on-the-Prohibited-AI-Practices-under-the-AI-Act
[4] https://technologyquotient.freshfields.com/post/102kxqo/eu-ai-act-unpacked-27-guidelines-on-the-scope-of-obligations-for-general-purpos
[5] https://huggingface.co/blog/yjernite/eu-act-os-guideai
[6] https://artificialintelligenceact.eu/gpai-guidelines-overview/
[7] https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers
[8] https://www.noerr.com/en/insights/2-august-2025-another-milestone-towards-the-full-applicability-of-the-ai-act
[9] https://www.steptoe.com/en/news-publications/eu-ai-act-obligations-for-gpai-models-now-applicable.html
[10] https://digital-strategy.ec.europa.eu/en/news/eu-rules-general-purpose-ai-models-start-apply-bringing-more-transparency-safety-and-accountability
[11] https://artificialintelligenceact.eu/implementation-timeline/
[12] https://www.artificial-intelligence-act.com
[13] https://www.twobirds.com/-/media/new-website-content/pdfs/capabilities/artificial-intelligence/european-union-artificial-intelligence-act-guide.pdf
[14] https://ajee-journal.com/transparency-in-the-labyrinths-of-the-eu-ai-act-smart-or-disbalanced
[15] https://arxiv.org/pdf/2409.00264.pdf
[16] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/22027641/7a327f6a-0bfc-4093-80ec-1229740a9fcc/questions.json
[17] https://www.ssrn.com/abstract=3149363
[18] https://arxiv.org/pdf/2410.07959.pdf
[19] https://arxiv.org/pdf/2310.04072.pdf
[20] https://onlinelibrary.wiley.com/doi/pdfdirect/10.1111/jwip.12285
[21] https://arxiv.org/pdf/2404.11476.pdf
[22] https://arxiv.org/pdf/2410.01036.pdf
[23] https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/
[24] https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
[25] https://nfdixcs.org/meldung/navigating-open-source-ai-a-foundation-for-research
[26] https://www.mdpi.com/2571-8800/4/4/43/pdf?version=1633664227
[27] https://arxiv.org/pdf/2408.01449.pdf
[28] https://www.tandfonline.com/doi/pdf/10.1080/17579961.2023.2245683?needAccess=true&role=button
[29] http://arxiv.org/pdf/2503.05787.pdf
[30] https://arxiv.org/ftp/arxiv/papers/2402/2402.16869.pdf
[31] http://arxiv.org/pdf/2501.10391.pdf
[32] https://policyreview.info/pdf/policyreview-2024-3-1790.pdf
[33] http://arxiv.org/pdf/2406.18211.pdf
[34] https://arxiv.org/ftp/arxiv/papers/2107/2107.03721.pdf
[35] https://arxiv.org/pdf/2302.02337.pdf
[36] https://arxiv.org/pdf/2408.12289.pdf
[37] https://arxiv.org/pdf/2212.03109.pdf
[38] https://ec.europa.eu/commission/presscorner/detail/en/qanda_21_1683
[39] https://artificialintelligenceact.eu
[40] https://artificialintelligenceact.eu/high-level-summary/
[41] https://securiti.ai/eu-ai-act/article-2/