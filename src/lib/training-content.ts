export type Lang = "en" | "vi";

export type TrainingSession = {
  tag: string;
  title: string;
  desc: string;
  duration: string;
  videoUrl: string;
  videoDriveFileId?: string;
  keyPoints: string[];
  scenario: { sit: string; ans: string };
};

export type QuizQuestion = {
  tag: string;
  text: string;
  opts: string[];
  c: number;
  exp: string;
};

export const PASSING_SCORE = 16;
export const VIDEO_COMPLETION_THRESHOLD = 90;

export const SESSIONS: Record<Lang, TrainingSession[]> = {
  "en": [
    {
      "tag": "Session 1 · Overview",
      "title": "Introduction to the Code of Conduct",
      "desc": "Why the COC matters, its scope, and every employee's obligations.",
      "duration": "~15 min",
      "videoUrl": "",
      "keyPoints": [
        "The COC applies to all employees, contractors, and partners in every country MediGroup operates.",
        "When the COC conflicts with local law, apply whichever standard is more stringent.",
        "Reporting a violation is an obligation, not just a right — all good-faith reports are fully protected.",
        "Reporting channels: your direct manager, or report@medigroupasia.com if your manager is involved."
      ],
      "scenario": {
        "sit": "A new colleague tells Minh: \"The Code of Conduct only applies to senior management — regular employees don't need to worry about it.\" What should Minh do?",
        "ans": "This is incorrect. The COC applies to ALL employees regardless of seniority. Minh should politely correct this and refer the colleague to Section 1.1 of the COC."
      }
    },
    {
      "tag": "Session 2 · Integrity",
      "title": "Anti-Bribery, Gifts & Hospitality",
      "desc": "Identifying and correctly handling bribery, gifts, and facilitation payments.",
      "duration": "~20 min",
      "videoUrl": "",
      "keyPoints": [
        "Strictly prohibited: any gift of any value to government officials or public servants — no exceptions, no holidays.",
        "Gifts to private-sector partners: max VND 500,000 per occasion; max VND 1,000,000 per year from the same source.",
        "Facilitation payments are fully prohibited under Vietnamese law and the UK Bribery Act (UKBA).",
        "Sponsorships tied to a business condition (\"sponsor us and we'll award you the contract\") = indirect bribery."
      ],
      "scenario": {
        "sit": "For Tết, a supplier sends Lan a personal gift basket worth VND 800,000. What should she do?",
        "ans": "Lan must immediately report the gift to her manager and the Compliance department. Even below the annual threshold, full transparency is mandatory. If cumulative gifts from this supplier exceed VND 1,000,000 in the year, a formal conflict-of-interest disclosure is required."
      }
    },
    {
      "tag": "Session 3 · Honesty",
      "title": "Identifying & Managing Conflicts of Interest",
      "desc": "Recognising conflict-of-interest situations and fulfilling your disclosure obligation.",
      "duration": "~18 min",
      "videoUrl": "",
      "keyPoints": [
        "A conflict of interest does not require actual wrongdoing — the mere potential for undue influence triggers the disclosure duty.",
        "Disclose in writing within 07 working days of a conflict arising.",
        "Immediate family members working for a supplier or competitor must be disclosed.",
        "Insider trading: never trade securities — or tip others — based on material non-public information."
      ],
      "scenario": {
        "sit": "Hung suspects he may have a conflict of interest but is not 100% certain. Should he disclose anyway?",
        "ans": "Yes — disclose. The COC encourages disclosure even under uncertainty. Being confirmed as a non-issue is always better than non-disclosure. It also protects Hung personally and demonstrates a strong compliance culture."
      }
    },
    {
      "tag": "Session 4 · Confidentiality",
      "title": "Confidential Information & Protection of Assets",
      "desc": "Obligations to protect company data, correct use of company assets, and partner data security.",
      "duration": "~15 min",
      "videoUrl": "",
      "keyPoints": [
        "Confidential information (customer lists, contracts, strategy) must never be shared or used for personal benefit.",
        "The confidentiality obligation survives employment — it continues after you leave MediGroup.",
        "Company assets (vehicles, equipment, software, working time) must only be used for business purposes.",
        "Circumventing access controls — e.g. asking a colleague to export data on your behalf — is a violation."
      ],
      "scenario": {
        "sit": "Lan prints a customer contract and emails it to her personal address to work from home. Is there a problem?",
        "ans": "Potentially yes. Sending confidential documents to a personal email may breach data policy. The correct approach is to use the company VPN or request explicit manager approval following the secure data handling procedures."
      }
    },
    {
      "tag": "Session 5 · Responsibility",
      "title": "Environment, Workplace Safety & Diversity",
      "desc": "Environmental commitments, safety obligations, and building an inclusive workplace.",
      "duration": "~12 min",
      "videoUrl": "",
      "keyPoints": [
        "Zero-tolerance for safety violations — witnessing a violation and not reporting it makes you complicit.",
        "Dispose of medical device waste through the correct process — schedule pressure is not a valid excuse.",
        "All forms of discrimination (gender, age, ethnicity, religion, disability) are strictly prohibited.",
        "Embracing diversity of personality and working style is a requirement, not merely an aspiration."
      ],
      "scenario": {
        "sit": "A manager repeatedly dismisses a foreign colleague's ideas while accepting identical suggestions from local colleagues. What should witnesses do?",
        "ans": "Speak up in the meeting by actively supporting the colleague's ideas. If the pattern continues, report it to HR or Compliance. This behaviour constitutes discrimination and violates Section 2.1 of the COC."
      }
    },
    {
      "tag": "Session 6 · Transparency",
      "title": "Reporting Violations & Whistleblower Protection",
      "desc": "How to report correctly, who to contact, and your protections as a reporter.",
      "duration": "~15 min",
      "videoUrl": "",
      "keyPoints": [
        "Every employee has both the right and the obligation to report suspected violations of the COC.",
        "If your direct manager is implicated, report directly to Compliance: report@medigroupasia.com.",
        "All good-faith reports are protected — even if the facts later prove different from those reported.",
        "Retaliation against anyone who makes a good-faith report is itself a serious COC violation."
      ],
      "scenario": {
        "sit": "Dung discovers his manager is receiving kickbacks from a supplier. He fears retaliation and is reluctant to report. What does the COC provide to protect him?",
        "ans": "Dung can report directly to report@medigroupasia.com, bypassing his manager entirely. He is fully protected against any form of retaliation, even if the report cannot ultimately be substantiated. No good-faith reporter will ever be disciplined. The identity of reporters is kept confidential to the maximum extent possible."
      }
    }
  ],
  "vi": [
    {
      "tag": "Session 1 · Tổng quan",
      "title": "Giới thiệu về Bộ Quy tắc Ứng xử",
      "desc": "Tại sao COC quan trọng, phạm vi áp dụng và nghĩa vụ của mỗi nhân viên.",
      "duration": "~15 phút",
      "videoUrl": "",
      "keyPoints": [
        "Bộ Quy tắc áp dụng cho toàn bộ nhân viên, nhà thầu và đối tác tại mọi quốc gia MediGroup hoạt động.",
        "Khi COC mâu thuẫn với luật địa phương, áp dụng quy định nghiêm khắc hơn.",
        "Báo cáo vi phạm là nghĩa vụ, không chỉ là quyền — mọi báo cáo thiện chí đều được bảo vệ hoàn toàn.",
        "Kênh báo cáo: quản lý trực tiếp hoặc report@medigroupasia.com nếu quản lý có liên quan."
      ],
      "scenario": {
        "sit": "Đồng nghiệp mới nói với Minh: \"Bộ Quy tắc chỉ áp dụng với quản lý cấp cao, nhân viên bình thường không cần lo.\" Minh nên làm gì?",
        "ans": "Thông tin này sai. Bộ Quy tắc áp dụng cho TẤT CẢ nhân viên, bất kể cấp bậc. Minh nên lịch sự đính chính và dẫn chiếu Phần 1.1 của COC."
      }
    },
    {
      "tag": "Session 2 · Tính toàn vẹn",
      "title": "Chống Hối lộ, Quà tặng & Khoản chi",
      "desc": "Nhận biết và xử lý đúng các tình huống hối lộ, quà tặng và khoản bôi trơn.",
      "duration": "~20 phút",
      "videoUrl": "",
      "keyPoints": [
        "Nghiêm cấm mọi quà tặng có giá trị bất kỳ cho quan chức/cán bộ nhà nước — không có ngoại lệ, kể cả dịp lễ Tết.",
        "Quà tặng cho đối tác tư nhân: tối đa 500.000 VNĐ/lần, không vượt 1.000.000 VNĐ/năm từ cùng nguồn.",
        "Khoản bôi trơn bị cấm hoàn toàn theo Luật Việt Nam và Đạo luật UKBA của Anh.",
        "Tài trợ có điều kiện kinh doanh gắn kèm = hối lộ gián tiếp, bất kể giá trị hay hình thức."
      ],
      "scenario": {
        "sit": "Nhân Tết, nhà cung cấp gửi giỏ quà 800.000 VNĐ cho chị Lan cá nhân. Chị nên xử lý thế nào?",
        "ans": "Chị Lan phải báo cáo ngay cho quản lý và Bộ phận Tuân thủ. Dù giá trị dưới ngưỡng hàng năm, minh bạch là bắt buộc. Nếu tổng quà từ nhà cung cấp này trong năm vượt 1.000.000 VNĐ, đây là xung đột lợi ích phải khai báo chính thức."
      }
    },
    {
      "tag": "Session 3 · Tính trung thực",
      "title": "Nhận biết và Quản lý Xung đột Lợi ích",
      "desc": "Xác định đúng các tình huống xung đột lợi ích và thực hiện nghĩa vụ khai báo.",
      "duration": "~18 phút",
      "videoUrl": "",
      "keyPoints": [
        "Xung đột lợi ích không cần có hành vi sai trái — chỉ cần có tiềm năng ảnh hưởng là phải khai báo.",
        "Khai báo bằng văn bản trong vòng 07 ngày làm việc kể từ khi tình huống phát sinh.",
        "Người thân (vợ/chồng, con, anh chị em) làm tại nhà cung cấp hoặc đối thủ phải được khai báo.",
        "Giao dịch nội gián: không mua bán chứng khoán — hoặc mách nước — dựa trên thông tin chưa công bố."
      ],
      "scenario": {
        "sit": "Anh Hùng không chắc chắn mình có xung đột lợi ích hay không. Có nên khai báo không?",
        "ans": "Có — nên khai báo. COC khuyến khích khai báo ngay cả khi không chắc. Được xác nhận là không có xung đột vẫn tốt hơn không khai báo, đồng thời bảo vệ bản thân anh Hùng và thể hiện văn hóa tuân thủ tốt."
      }
    },
    {
      "tag": "Session 4 · Bảo mật",
      "title": "Thông tin Mật & Bảo vệ Tài sản",
      "desc": "Nghĩa vụ bảo mật dữ liệu, sử dụng đúng tài sản công ty và bảo mật dữ liệu đối tác.",
      "duration": "~15 phút",
      "videoUrl": "",
      "keyPoints": [
        "Thông tin mật (danh sách khách hàng, hợp đồng, chiến lược) không được chia sẻ hay dùng cho mục đích cá nhân.",
        "Nghĩa vụ bảo mật tiếp tục hiệu lực sau khi nghỉ việc — không có ngoại lệ.",
        "Tài sản công ty (xe, thiết bị, phần mềm, giờ làm việc) chỉ được dùng cho mục đích công việc.",
        "Nhờ người khác xuất dữ liệu thay mình để lách phân quyền là vi phạm — bất kể mục đích sử dụng."
      ],
      "scenario": {
        "sit": "Chị Lan in hợp đồng khách hàng và gửi về email cá nhân để làm việc ở nhà. Có vấn đề gì không?",
        "ans": "Có tiềm năng vi phạm. Gửi tài liệu mật về email cá nhân có thể vi phạm chính sách bảo mật dữ liệu. Cách đúng là dùng VPN công ty hoặc xin phép quản lý theo đúng quy trình bảo mật."
      }
    },
    {
      "tag": "Session 5 · Trách nhiệm",
      "title": "Môi trường, An toàn Lao động & Đa dạng",
      "desc": "Cam kết bảo vệ môi trường, nghĩa vụ an toàn và xây dựng môi trường làm việc tôn trọng.",
      "duration": "~12 phút",
      "videoUrl": "",
      "keyPoints": [
        "Zero-tolerance với vi phạm an toàn — chứng kiến vi phạm mà không báo cáo là đồng lõa thụ động.",
        "Xử lý chất thải y tế theo đúng quy trình — áp lực tiến độ không phải lý do hợp lệ để bỏ qua.",
        "Mọi hình thức phân biệt đối xử (giới tính, tuổi, dân tộc, tôn giáo, khuyết tật) bị nghiêm cấm tuyệt đối.",
        "Chấp nhận sự đa dạng về tính cách và phong cách làm việc là yêu cầu, không phải khuyến khích."
      ],
      "scenario": {
        "sit": "Trong họp, quản lý liên tục bác bỏ ý kiến của đồng nghiệp nước ngoài nhưng chấp nhận ý kiến tương tự từ đồng nghiệp khác. Nhân viên chứng kiến nên làm gì?",
        "ans": "Lên tiếng hỗ trợ ý kiến của đồng nghiệp ngay trong cuộc họp. Nếu tình trạng lặp lại, báo cáo lên HR hoặc Tuân thủ. Đây là hành vi phân biệt đối xử vi phạm Phần 2.1 của COC."
      }
    },
    {
      "tag": "Session 6 · Minh bạch",
      "title": "Báo cáo Vi phạm & Bảo vệ Người tố giác",
      "desc": "Cách báo cáo đúng, ai cần liên hệ và quyền bảo vệ dành cho người báo cáo.",
      "duration": "~15 phút",
      "videoUrl": "",
      "keyPoints": [
        "Mỗi nhân viên có cả quyền lẫn nghĩa vụ báo cáo khi nghi ngờ có vi phạm COC.",
        "Nếu quản lý trực tiếp có liên quan, báo cáo thẳng đến Tuân thủ: report@medigroupasia.com.",
        "Mọi báo cáo thiện chí đều được bảo vệ — kể cả khi sự thật sau đó không như báo cáo.",
        "Trả thù người báo cáo thiện chí là vi phạm COC nghiêm trọng và có thể là căn cứ sa thải."
      ],
      "scenario": {
        "sit": "Anh Dũng phát hiện quản lý nhận hoa hồng từ nhà cung cấp. Anh sợ bị trả thù nên không muốn báo cáo. COC bảo vệ anh như thế nào?",
        "ans": "Anh Dũng có thể báo thẳng lên report@medigroupasia.com, bỏ qua quản lý hoàn toàn. Anh được bảo vệ toàn diện khỏi mọi hình thức trả thù, kể cả khi sự việc sau đó không xác nhận được. Không người báo cáo thiện chí nào bị kỷ luật. Danh tính người báo cáo được giữ bí mật tối đa."
      }
    }
  ]
};

export const QUESTIONS: Record<Lang, QuizQuestion[]> = {
  "en": [
    {
      "tag": "Confidentiality",
      "text": "Tuan resigned and joined a competitor. Before leaving, he exported MediGroup's customer list to a personal USB, claiming \"personal reference only.\" How should this be assessed?",
      "opts": [
        "A. No violation — he has not shared the list with anyone.",
        "B. Violation of the confidentiality obligation — unauthorised extraction of company data, potentially grounds for dismissal.",
        "C. Only a violation if he actually contacts those customers.",
        "D. Acceptable — he had contact with those customers during employment."
      ],
      "c": 1,
      "exp": "Sections 2.4 & 5.2: Unauthorised extraction of confidential information is a violation regardless of whether it is subsequently shared or used. The act of exporting alone is sufficient."
    },
    {
      "tag": "Anti-Bribery",
      "text": "A doctor tells Lan: \"If your company sponsors our department's team trip, I'll add MediGroup's devices to our priority procurement list.\" What should Lan do?",
      "opts": [
        "A. Agree — it's a legitimate sponsorship, not bribery.",
        "B. Review the budget and escalate to management for approval.",
        "C. Refuse immediately and report to management/Compliance — sponsorship tied to a business outcome is indirect bribery.",
        "D. Sponsor a small amount below VND 500,000 to stay within the gift threshold."
      ],
      "c": 2,
      "exp": "Section 4.4: Any sponsorship or contribution made on the condition — explicit or implied — that it will secure business is prohibited, regardless of amount."
    },
    {
      "tag": "Conflict of Interest",
      "text": "Minh — Head of Procurement — learns his wife has become Director at a logistics company bidding for MediGroup. He does not disclose this and continues evaluating the bid. What are the potential consequences?",
      "opts": [
        "A. No consequences if his final decision is fair and transparent.",
        "B. Only a verbal warning — first offence.",
        "C. Written warning → salary freeze/demotion → dismissal; possible reassignment during investigation.",
        "D. Only disciplinary action if his wife's company wins and is later shown to be unqualified."
      ],
      "c": 2,
      "exp": "Section 5.2: A family member employed by a supplier is a mandatory disclosure within 07 working days. Failing to disclose and continuing to participate is explicitly prohibited."
    },
    {
      "tag": "Insider Trading",
      "text": "Hoa knows MediGroup is about to sign a major contract — not yet public. She tells her husband: \"Buy shares in that company — they're about to go up.\" He places the order. Who has violated the COC?",
      "opts": [
        "A. Only the husband — he executed the trade.",
        "B. Both — Hoa violated the \"tipping\" prohibition; her husband violated insider trading rules.",
        "C. Neither — Hoa did not personally buy any shares.",
        "D. Only a violation if they actually profited."
      ],
      "c": 1,
      "exp": "Section 4.5: Sharing material non-public information (\"tipping\") with someone who may trade on it is equally unlawful. Both the tipper and trader are in violation."
    },
    {
      "tag": "Product Communication",
      "text": "A sales rep presents only favourable data from an inconclusive study, omitting all limitations, to persuade a doctor to use a new device. Which rule is violated?",
      "opts": [
        "A. No violation — the information comes from a real study.",
        "B. Violation of Section 3.1 — product information must be honest, objective, and scientifically substantiated; it must not mislead.",
        "C. Only a violation if the doctor formally complains.",
        "D. Acceptable — standard sales practice in the medical device industry."
      ],
      "c": 1,
      "exp": "Section 3.1: Selective presentation of data to create a misleading impression is a violation, even when the underlying data is factually accurate."
    },
    {
      "tag": "Workplace Safety",
      "text": "Binh notices a colleague routinely skipping the mandatory pre-operation safety checklist, arguing \"I've done this a thousand times.\" What should Binh do?",
      "opts": [
        "A. Do nothing — it's the colleague's personal choice.",
        "B. Remind the colleague directly; if the behaviour continues, report to management/Compliance — MediGroup has a zero-tolerance safety policy.",
        "C. Wait to see whether an incident occurs before reporting.",
        "D. Quietly document the behaviour but take no immediate action."
      ],
      "c": 1,
      "exp": "Section 2.3: Witnessing a safety violation requires immediate reporting. Familiarity does not justify bypassing procedures."
    },
    {
      "tag": "Social Media",
      "text": "Mai posts on her personal Facebook: \"Company X uses fake data — their products are clearly inferior to ours.\" Many colleagues like and share the post. How should this be assessed?",
      "opts": [
        "A. Acceptable — it's a personal account, not a company account.",
        "B. A violation — even from a personal account, criticising competitors damages MediGroup's image and breaches the social media policy.",
        "C. Only a violation if the claims are factually incorrect.",
        "D. Permitted — the information is being validated by the market."
      ],
      "c": 1,
      "exp": "Section 5.3: Employees must not publicly criticise competitors, including on personal social media. Even accurate statements can harm MediGroup's reputation."
    },
    {
      "tag": "Gifts — Threshold",
      "text": "For Tết, a supplier sends a VND 1,200,000 gift basket to the procurement team. The Head of Department keeps it without reporting, reasoning \"Tết gifts are cultural.\" What does the COC say?",
      "opts": [
        "A. Acceptable — Tết gifts are standard business practice in Vietnam.",
        "B. A violation — cumulative gifts exceeding VND 1,000,000 per year from the same partner require disclosure; not reporting is itself a breach.",
        "C. Only a violation if the gift is personal rather than for the whole team.",
        "D. Only a violation if the department subsequently favours that supplier."
      ],
      "c": 1,
      "exp": "Sections 5.2 & 4.3: Gifts exceeding VND 1,000,000 per year from the same partner trigger a conflict-of-interest disclosure. Full transparency is mandatory regardless of cultural context."
    },
    {
      "tag": "Data Security",
      "text": "Quang asks a colleague with system access to export a partner's purchase history on his behalf, without manager approval, because \"it's for internal use.\" Is this acceptable?",
      "opts": [
        "A. Acceptable — internal purpose, benefits the company.",
        "B. Not acceptable — asking someone to export data to bypass access controls is unauthorised access, violating Section 3.3.",
        "C. Acceptable if the colleague has legitimate system access.",
        "D. Only a violation if the data is subsequently leaked externally."
      ],
      "c": 1,
      "exp": "Section 3.3: Using a colleague's access to circumvent your own authorisation level is unauthorised access and a breach of partner data confidentiality."
    },
    {
      "tag": "Facilitation Payments",
      "text": "A delivery employee is asked by a customs official for an informal \"fast-track fee\" to clear devices quickly. The employee considers it a small facilitation payment. What is the correct course of action?",
      "opts": [
        "A. Pay the small amount to expedite clearance, then report to management.",
        "B. Refuse — Vietnamese law and the UK Bribery Act prohibit facilitation payments; report to management or Compliance.",
        "C. Pay — the US FCPA permits facilitation payments in some circumstances.",
        "D. Pay but do not record it in the accounts."
      ],
      "c": 1,
      "exp": "Section 4.2: Neither Vietnamese law nor the UKBA recognises a lawful facilitation payment. MediGroup applies the most stringent standard available."
    },
    {
      "tag": "Discrimination",
      "text": "In a meeting, a manager repeatedly interrupts a female colleague's ideas while readily accepting identical suggestions from male colleagues. A witness is present. What should the witness do?",
      "opts": [
        "A. Nothing — this is an individual management style and doesn't break any law.",
        "B. Speak to the manager privately after the meeting.",
        "C. Report the behaviour to senior management or Compliance — this is gender-based discrimination, violating Sections 2.1 and 2.2.",
        "D. Wait to see whether the female colleague raises a formal complaint herself."
      ],
      "c": 2,
      "exp": "Sections 2.1 & 2.2: Every employee has an obligation to report observed discrimination. Section 1.4 guarantees full protection for good-faith reporters."
    },
    {
      "tag": "Company Assets",
      "text": "An employee regularly uses a company vehicle for ride-sharing on weekends, arguing \"the car is idle anyway — both sides benefit.\" How should this be assessed?",
      "opts": [
        "A. Acceptable — the vehicle isn't in use and no harm is done.",
        "B. A violation of Sections 5.1 & 5.2 — using company assets for personal or commercial purposes is strictly prohibited.",
        "C. Only a violation if the vehicle is damaged during personal use.",
        "D. Acceptable if the employee remits part of the earnings to the company."
      ],
      "c": 1,
      "exp": "Sections 5.1 & 5.2: Using a company vehicle for personal commercial activity is cited as a direct example of prohibited conduct in the COC. Intent and profit do not alter the nature of the violation."
    },
    {
      "tag": "Conflict — Hiring",
      "text": "Ngoc — Head of Finance — hires her sister as a cashier and personally approves a salary increase for her after three months. She does not disclose either action, reasoning \"this is family, not personal financial gain.\" How should this be assessed?",
      "opts": [
        "A. No violation — Ngoc gains no money from these decisions.",
        "B. Violation of Section 5.2: arranging employment for a family member and approving their compensation without proper process and disclosure are both explicitly prohibited.",
        "C. Only a violation at the hiring stage; the salary approval is separate.",
        "D. A minor violation — a retrospective disclosure and process correction is sufficient."
      ],
      "c": 1,
      "exp": "Section 5.2: Using a position of authority to place family members in roles and determine their compensation without due process and disclosure is explicitly prohibited, regardless of personal financial gain."
    },
    {
      "tag": "Scientific Events",
      "text": "A sales team books flights and a five-star resort for doctors, describing it as a \"scientific symposium.\" The actual schedule is 2 hours of product presentation with the rest being leisure and dining. Is this appropriate?",
      "opts": [
        "A. Appropriate — there is an official symposium programme.",
        "B. Not appropriate — a resort venue with primarily leisure content is not a genuine scientific meeting; violates Section 3.6 and risks treatment as indirect bribery.",
        "C. Appropriate if the doctors sign an attendance confirmation.",
        "D. Only a violation if the cost exceeds the gift threshold."
      ],
      "c": 1,
      "exp": "Section 3.6: Meetings must not be held at resort or luxury venues unless the schedule constitutes a genuine, substantive programme. An event that is predominantly leisure does not qualify."
    },
    {
      "tag": "Whistleblowing",
      "text": "Dung discovers his manager is receiving kickbacks from a supplier. He fears retaliation. What does the COC provide to protect him?",
      "opts": [
        "A. He should investigate himself first and be 100% certain before reporting.",
        "B. He can report directly to report@medigroupasia.com, bypassing his manager, and is fully protected even if the report cannot later be substantiated.",
        "C. He should gather supporting evidence from colleagues first.",
        "D. He should only report once there is clear evidence of financial loss to the company."
      ],
      "c": 1,
      "exp": "Section 1.4: Good-faith reporters are always protected — including when the facts later prove different from those reported. No employee will ever be disciplined for a good-faith report."
    },
    {
      "tag": "Gifts — Government",
      "text": "At a branch opening, the team wants to give VND 500,000 cash envelopes to attending healthcare officials as a \"thank you.\" Does this violate the COC?",
      "opts": [
        "A. No violation — the amount is at or below the VND 500,000 per-occasion threshold.",
        "B. A violation — Vietnamese law prohibits gifts of any value to government officials or public servants.",
        "C. Acceptable if fully disclosed to Compliance in advance.",
        "D. No violation if gift cards are used instead of cash."
      ],
      "c": 1,
      "exp": "Section 4.3: Vietnamese law imposes an absolute prohibition on gifts to public officials of any value. The VND 500,000 threshold applies only to private-sector partners."
    },
    {
      "tag": "Product Safety",
      "text": "A customer reports a device behaving abnormally. The sales employee, worried about quarterly targets, delays logging and forwarding the complaint, waiting for a second complaint before acting. What rule is violated?",
      "opts": [
        "A. No violation — the employee has not refused to act, merely delayed.",
        "B. Violation of Section 3.1 — employees must receive and forward device complaints promptly and objectively, regardless of commercial pressure.",
        "C. Only a violation if the device actually causes an injury.",
        "D. A normal business judgement call, not an ethical issue."
      ],
      "c": 1,
      "exp": "Section 3.1: Timely and objective escalation of device complaints to the manufacturer is a mandatory obligation. Delaying for commercial reasons violates the duty to protect end-user safety."
    },
    {
      "tag": "Conflict — Investment",
      "text": "Hung quietly invests a 30% stake in a startup that supplies MediGroup with print services, without disclosing it — \"I'm just a minor shareholder.\" How should this be assessed?",
      "opts": [
        "A. No violation — he doesn't hold a controlling stake or management role.",
        "B. Violation of the disclosure obligation — a material financial interest in a MediGroup supplier must be disclosed in writing within 07 working days.",
        "C. Only a violation if Hung personally signs contracts with that startup.",
        "D. No violation — 30% is not a controlling interest."
      ],
      "c": 1,
      "exp": "Section 5.2: Holding a material financial interest in a MediGroup supplier triggers mandatory disclosure. There is no minimum percentage threshold — the existence of the financial interest is determinative."
    },
    {
      "tag": "Fair Hiring",
      "text": "A recruitment panel rejects a highly qualified candidate on the grounds that \"she seems too introverted for our dynamic culture.\" No objective competency evaluation supports this judgement. Is this consistent with the COC?",
      "opts": [
        "A. Consistent — \"cultural fit\" is a legitimate hiring criterion.",
        "B. Not consistent — hiring must be based on professional skills and merit; rejecting a candidate on subjective personality grounds without objective criteria violates the diversity and non-discrimination principles.",
        "C. Consistent if the full panel is in agreement.",
        "D. Only a violation if the candidate belongs to a legally protected category."
      ],
      "c": 1,
      "exp": "Section 2.2: Recruitment must be based on professional qualifications and merit. The COC explicitly requires acceptance of diverse working styles and personalities. Subjective personality rejection is hidden discrimination."
    },
    {
      "tag": "Environment & Safety",
      "text": "Under schedule pressure, an employee disposes of device batteries and waste in the general rubbish bin instead of the designated medical waste process, reasoning \"it's just this once.\" How should this be assessed?",
      "opts": [
        "A. Not serious — a minor, one-off incident.",
        "B. A violation of the environmental commitment (Section 6.1) and safety obligation (Section 2.3); schedule pressure does not create an exemption.",
        "C. Only a violation if the waste is formally classified as \"hazardous.\"",
        "D. Not a COC violation — Section 6 is aspirational, not mandatory."
      ],
      "c": 1,
      "exp": "Sections 6.1 & 2.3: Environmental responsibility is a core commitment at MediGroup. Even familiar tasks can have serious consequences when safety procedures are bypassed. Schedule pressure is not a recognised exemption."
    }
  ],
  "vi": [
    {
      "tag": "Bảo mật thông tin",
      "text": "Anh Tuấn nghỉ việc và gia nhập đối thủ. Trước khi rời đi, anh xuất danh sách khách hàng MediGroup ra USB cá nhân, lý do \"chỉ để tham khảo\". Đánh giá theo COC?",
      "opts": [
        "A. Không vi phạm vì chưa chia sẻ danh sách cho ai.",
        "B. Vi phạm nghĩa vụ bảo mật — trích xuất trái phép dữ liệu công ty, có thể là căn cứ sa thải.",
        "C. Chỉ vi phạm nếu thực sự tiếp cận khách hàng đó.",
        "D. Chấp nhận được vì anh đã tiếp xúc những khách hàng này khi còn làm việc."
      ],
      "c": 1,
      "exp": "Phần 2.4 & 5.2: Trích xuất trái phép thông tin mật là vi phạm bất kể có chia sẻ hay sử dụng sau đó không. Chỉ cần hành vi xuất dữ liệu là đã đủ cấu thành vi phạm."
    },
    {
      "tag": "Chống Hối lộ",
      "text": "Bác sĩ nói với chị Lan: \"Nếu công ty tài trợ chuyến du lịch team của khoa tôi, tôi sẽ đưa thiết bị MediGroup vào danh mục ưu tiên.\" Chị Lan nên làm gì?",
      "opts": [
        "A. Đồng ý — đây là tài trợ hợp pháp, không phải hối lộ.",
        "B. Xem ngân sách rồi trình quản lý để được duyệt.",
        "C. Từ chối ngay và báo cáo lên quản lý/Tuân thủ — tài trợ gắn điều kiện kinh doanh là hối lộ trá hình.",
        "D. Tài trợ khoản nhỏ dưới 500.000 VNĐ để tránh vi phạm ngưỡng quà tặng."
      ],
      "c": 2,
      "exp": "Phần 4.4: Mọi khoản tài trợ hoặc đóng góp được thực hiện với điều kiện — rõ ràng hay ngầm định — đảm bảo hợp đồng kinh doanh đều bị cấm, bất kể giá trị."
    },
    {
      "tag": "Xung đột lợi ích",
      "text": "Anh Minh — trưởng mua hàng — biết vợ vừa làm Giám đốc tại công ty logistics đang dự thầu cho MediGroup. Anh không khai báo và tiếp tục thẩm định. Hậu quả có thể xảy ra?",
      "opts": [
        "A. Không có hậu quả nếu quyết định cuối cùng công bằng và minh bạch.",
        "B. Chỉ bị nhắc nhở vì là lần đầu vi phạm.",
        "C. Khiển trách văn bản → kéo dài nâng lương/cách chức → sa thải; có thể bị tạm chuyển trong quá trình điều tra.",
        "D. Chỉ bị kỷ luật nếu công ty vợ thắng thầu và không đủ điều kiện."
      ],
      "c": 2,
      "exp": "Phần 5.2: Người thân làm tại nhà cung cấp phải khai báo trong 07 ngày làm việc. Không khai báo và tiếp tục tham gia quy trình là hành vi bị nghiêm cấm."
    },
    {
      "tag": "Giao dịch nội gián",
      "text": "Chị Hoa biết MediGroup sắp ký hợp đồng lớn — thông tin chưa công bố. Chị nói với chồng: \"Anh mua cổ phiếu công ty đó đi.\" Anh chồng đặt lệnh mua. Ai vi phạm?",
      "opts": [
        "A. Chỉ anh chồng vì anh là người thực hiện giao dịch.",
        "B. Cả hai — chị Hoa vi phạm lệnh cấm \"tipping\"; anh chồng vi phạm giao dịch nội gián.",
        "C. Không ai vi phạm vì chị Hoa không trực tiếp mua cổ phiếu.",
        "D. Chỉ vi phạm nếu họ thu lợi từ giao dịch đó."
      ],
      "c": 1,
      "exp": "Phần 4.5: Chia sẻ thông tin nội bộ chưa công bố để người khác giao dịch (\"mách nước\") cũng là hành vi bất hợp pháp. Cả người mách và người giao dịch đều vi phạm."
    },
    {
      "tag": "Truyền thông sản phẩm",
      "text": "Nhân viên chỉ trình bày số liệu có lợi từ một nghiên cứu chưa được đồng thuận, bỏ qua các hạn chế, để thuyết phục bác sĩ dùng thiết bị mới. Vi phạm gì?",
      "opts": [
        "A. Không vi phạm vì thông tin đến từ nghiên cứu thực sự.",
        "B. Vi phạm Phần 3.1 — thông tin sản phẩm phải trung thực, khách quan và có giá trị khoa học; không được gây hiểu lầm.",
        "C. Chỉ vi phạm nếu bác sĩ phàn nàn chính thức.",
        "D. Chấp nhận được — đây là kỹ thuật bán hàng thông thường trong ngành."
      ],
      "c": 1,
      "exp": "Phần 3.1: Chọn lọc dữ liệu có lợi để tạo ấn tượng sai lệch là vi phạm, dù dữ liệu đó có thật."
    },
    {
      "tag": "An toàn lao động",
      "text": "Anh Bình thấy đồng nghiệp thường xuyên bỏ qua kiểm tra an toàn trước khi vận hành thiết bị vì \"quen rồi\". Anh Bình nên làm gì?",
      "opts": [
        "A. Không can thiệp vì là quyết định cá nhân của đồng nghiệp.",
        "B. Nhắc nhở trực tiếp; nếu tiếp tục, báo cáo quản lý/Tuân thủ — MediGroup có chính sách zero-tolerance với vi phạm an toàn.",
        "C. Chờ xem có sự cố không rồi mới báo cáo.",
        "D. Ghi chép lại nhưng chưa cần báo cáo ngay."
      ],
      "c": 1,
      "exp": "Phần 2.3: Chứng kiến vi phạm an toàn phải báo cáo ngay lập tức. Sự quen thuộc không biện hộ cho việc bỏ qua quy trình an toàn."
    },
    {
      "tag": "Mạng xã hội",
      "text": "Chị Mai đăng Facebook cá nhân: \"Công ty X dùng số liệu giả, sản phẩm kém hơn hẳn bên mình.\" Nhiều đồng nghiệp like và share. Đánh giá hành vi này?",
      "opts": [
        "A. Hợp lệ vì là tài khoản cá nhân, không phải tài khoản công ty.",
        "B. Vi phạm — ngay cả từ tài khoản cá nhân, chỉ trích đối thủ gây tổn hại hình ảnh MediGroup.",
        "C. Chỉ vi phạm nếu thông tin không chính xác.",
        "D. Được phép vì thông tin đang được kiểm chứng trên thị trường."
      ],
      "c": 1,
      "exp": "Phần 5.3: Nghiêm cấm chỉ trích đối thủ kể cả từ tài khoản cá nhân. Ngay cả thông tin đúng cũng có thể gây hại cho hình ảnh MediGroup."
    },
    {
      "tag": "Quà tặng — Ngưỡng",
      "text": "Nhân Tết, nhà cung cấp gửi giỏ quà 1.200.000 VNĐ cho bộ phận mua hàng. Trưởng bộ phận giữ lại không báo cáo vì \"quà Tết là văn hóa\". Bộ Quy tắc quy định gì?",
      "opts": [
        "A. Hợp lệ vì quà Tết là thông lệ kinh doanh tại Việt Nam.",
        "B. Vi phạm — quà vượt 1.000.000 VNĐ/năm từ cùng đối tác là xung đột lợi ích phải khai báo; không báo cáo là vi phạm.",
        "C. Chỉ vi phạm nếu nhận cá nhân; quà cho cả bộ phận thì không sao.",
        "D. Chỉ vi phạm nếu sau đó bộ phận ưu tiên nhà cung cấp đó."
      ],
      "c": 1,
      "exp": "Phần 5.2 & 4.3: Quà vượt 1.000.000 VNĐ/năm từ cùng đối tác = xung đột lợi ích phải khai báo. Minh bạch là bắt buộc bất kể bối cảnh văn hóa."
    },
    {
      "tag": "Bảo mật dữ liệu",
      "text": "Anh Quang nhờ đồng nghiệp có quyền truy cập xuất giúp dữ liệu đối tác mà không xin phép quản lý vì \"chỉ dùng nội bộ\". Có hợp lệ không?",
      "opts": [
        "A. Hợp lệ vì mục đích nội bộ và vì lợi ích công ty.",
        "B. Không hợp lệ — nhờ người khác xuất thay để lách phân quyền là truy cập trái phép, vi phạm Phần 3.3.",
        "C. Hợp lệ nếu đồng nghiệp đó có quyền truy cập hệ thống.",
        "D. Chỉ vi phạm nếu dữ liệu bị rò rỉ ra ngoài."
      ],
      "c": 1,
      "exp": "Phần 3.3: Dùng quyền truy cập của người khác để lách phân quyền của mình là truy cập trái phép và vi phạm nghĩa vụ bảo mật dữ liệu đối tác."
    },
    {
      "tag": "Chi bôi trơn",
      "text": "Nhân viên giao hàng bị cán bộ hải quan yêu cầu \"đóng phí nhanh\" ngoài luồng để thông quan nhanh hơn. Nhân viên cho rằng đây là \"phí bôi trơn nhỏ\". Cách xử lý đúng?",
      "opts": [
        "A. Chi khoản nhỏ để thông quan nhanh, sau đó báo cáo quản lý.",
        "B. Từ chối — Luật Việt Nam và UKBA cấm mọi khoản bôi trơn; báo cáo lên quản lý hoặc Tuân thủ.",
        "C. Chấp nhận chi vì FCPA của Mỹ cho phép facilitation payment trong một số trường hợp.",
        "D. Chi nhưng không khai vào sổ sách để tránh phức tạp."
      ],
      "c": 1,
      "exp": "Phần 4.2: Luật Việt Nam và UKBA không công nhận ngoại lệ nào cho khoản bôi trơn. MediGroup áp dụng tiêu chuẩn nghiêm khắc nhất."
    },
    {
      "tag": "Phân biệt đối xử",
      "text": "Trong họp, quản lý liên tục ngắt lời đồng nghiệp nữ nhưng chấp nhận ý kiến tương tự từ đồng nghiệp nam. Nhân viên chứng kiến nên làm gì?",
      "opts": [
        "A. Không can thiệp vì là phong cách quản lý cá nhân.",
        "B. Chỉ nói riêng với quản lý đó sau cuộc họp.",
        "C. Báo cáo lên cấp trên hoặc Tuân thủ — đây là phân biệt giới tính, vi phạm Phần 2.1 & 2.2.",
        "D. Chờ xem đồng nghiệp nữ có tự khiếu nại không."
      ],
      "c": 2,
      "exp": "Phần 2.1 & 2.2: Mọi nhân viên có nghĩa vụ báo cáo vi phạm phân biệt đối xử. Phần 1.4 bảo vệ toàn diện cho người báo cáo thiện chí."
    },
    {
      "tag": "Tài sản công ty",
      "text": "Nhân viên dùng xe công ty chạy grab cuối tuần khi không có lịch công tác, lý luận \"xe nhàn rỗi, cả hai bên cùng có lợi\". Đánh giá hành vi này?",
      "opts": [
        "A. Chấp nhận được vì xe không dùng đến và không gây thiệt hại.",
        "B. Vi phạm Phần 5.1 & 5.2 — dùng tài sản công ty cho mục đích cá nhân/kinh doanh riêng là bị nghiêm cấm.",
        "C. Chỉ vi phạm nếu xe hư hỏng trong quá trình dùng riêng.",
        "D. Chấp nhận được nếu nộp lại một phần thu nhập cho công ty."
      ],
      "c": 1,
      "exp": "Phần 5.1 & 5.2: Sử dụng xe công ty cho kinh doanh riêng là ví dụ minh họa trực tiếp trong Bộ Quy tắc. Ý định hay lợi nhuận không thay đổi bản chất vi phạm."
    },
    {
      "tag": "Xung đột — Tuyển dụng",
      "text": "Chị Ngọc — Trưởng phòng Kế toán — tuyển em gái vào vị trí thủ quỹ và tự ký duyệt tăng lương cho em gái sau 3 tháng. Không khai báo vì \"đây là gia đình, không phải lợi ích tài chính cá nhân\". Đánh giá?",
      "opts": [
        "A. Không vi phạm vì chị Ngọc không nhận tiền từ các quyết định này.",
        "B. Vi phạm Phần 5.2: bố trí người thân và phê duyệt lương cho người thân không qua quy trình chuẩn và không khai báo là hành vi bị nghiêm cấm.",
        "C. Chỉ vi phạm ở bước tuyển dụng, không vi phạm ở bước tăng lương.",
        "D. Vi phạm nhẹ — chỉ cần bổ sung khai báo sau và điều chỉnh quy trình."
      ],
      "c": 1,
      "exp": "Phần 5.2: Lợi dụng chức vụ bố trí người thân và quyết định lương thưởng cho người thân không qua quy trình chuẩn là hành vi nghiêm cấm, bất kể có lợi ích tài chính cá nhân hay không."
    },
    {
      "tag": "Hội thảo khoa học",
      "text": "Nhóm kinh doanh tổ chức \"hội thảo\" tại resort 5 sao Đà Nẵng cho bác sĩ với 2 tiếng thuyết trình sản phẩm và còn lại là tham quan, ăn uống. Điều này phù hợp không?",
      "opts": [
        "A. Phù hợp vì có chương trình hội thảo chính thức.",
        "B. Không phù hợp — địa điểm resort, nội dung chủ yếu giải trí; vi phạm Phần 3.6 và có nguy cơ cấu thành hối lộ gián tiếp.",
        "C. Phù hợp nếu các bác sĩ ký xác nhận tham dự.",
        "D. Chỉ vi phạm nếu chi phí vượt ngưỡng quà tặng quy định."
      ],
      "c": 1,
      "exp": "Phần 3.6: Không được tổ chức họp tại địa điểm resort cao cấp trừ khi có lịch trình hội thảo thực chất, hợp pháp. Sự kiện chủ yếu là giải trí không đáp ứng tiêu chuẩn này."
    },
    {
      "tag": "Báo cáo vi phạm",
      "text": "Anh Dũng phát hiện quản lý nhận hoa hồng từ nhà cung cấp. Anh sợ bị trả thù nên không muốn báo cáo. COC bảo vệ anh như thế nào?",
      "opts": [
        "A. Nên tự điều tra thêm để chắc chắn 100% trước khi báo cáo.",
        "B. Có thể báo thẳng lên report@medigroupasia.com, bỏ qua quản lý; được bảo vệ hoàn toàn kể cả nếu sự thật không như báo cáo.",
        "C. Nên trao đổi với đồng nghiệp để tập hợp bằng chứng trước.",
        "D. Chỉ báo cáo khi có bằng chứng thiệt hại tài chính rõ ràng."
      ],
      "c": 1,
      "exp": "Phần 1.4: Người báo cáo thiện chí luôn được bảo vệ — kể cả khi sự thật sau đó không như báo cáo. Không ai bị kỷ luật vì báo cáo thiện chí."
    },
    {
      "tag": "Quà tặng — Quan chức",
      "text": "Nhân khai trương chi nhánh, nhóm kinh doanh muốn tặng phong bì 500.000 VNĐ cho cán bộ y tế tham dự để \"cảm ơn\". Điều này vi phạm không?",
      "opts": [
        "A. Không vi phạm vì số tiền ở ngưỡng 500.000 VNĐ/lần.",
        "B. Vi phạm — Luật Việt Nam cấm mọi quà tặng có giá trị bất kỳ cho quan chức/cán bộ nhà nước.",
        "C. Chấp nhận được nếu khai báo đủ với Tuân thủ trước.",
        "D. Không vi phạm nếu tặng thẻ quà thay vì tiền mặt."
      ],
      "c": 1,
      "exp": "Phần 4.3: Luật Việt Nam cấm tuyệt đối mọi quà tặng bất kỳ giá trị nào cho quan chức nhà nước. Ngưỡng 500.000 VNĐ chỉ áp dụng cho đối tác tư nhân."
    },
    {
      "tag": "An toàn thiết bị",
      "text": "Khách hàng phản ánh thiết bị bất thường. Nhân viên lo ảnh hưởng doanh số nên trì hoãn ghi nhận và chuyển phản ánh lên nhà sản xuất. Vi phạm gì?",
      "opts": [
        "A. Không vi phạm vì nhân viên chưa từ chối xử lý, chỉ trì hoãn.",
        "B. Vi phạm Phần 3.1 — có nghĩa vụ tiếp nhận và chuyển phản ánh kịp thời, khách quan; không phụ thuộc áp lực doanh số.",
        "C. Chỉ vi phạm nếu thiết bị gây tai nạn thực sự.",
        "D. Là quyết định kinh doanh bình thường, không phải vấn đề đạo đức."
      ],
      "c": 1,
      "exp": "Phần 3.1: Chuyển phản ánh đến nhà sản xuất kịp thời và khách quan là nghĩa vụ bắt buộc. Trì hoãn vì doanh số vi phạm nghĩa vụ bảo vệ an toàn người dùng cuối."
    },
    {
      "tag": "Xung đột — Đầu tư",
      "text": "Anh Hùng âm thầm góp 30% vốn vào startup cung cấp dịch vụ in ấn cho MediGroup, không khai báo vì \"chỉ là cổ đông nhỏ\". Đánh giá?",
      "opts": [
        "A. Không vi phạm vì không nắm quyền điều hành startup đó.",
        "B. Vi phạm nghĩa vụ khai báo — lợi ích tài chính đáng kể tại nhà cung cấp phải khai báo bằng văn bản trong 07 ngày.",
        "C. Chỉ vi phạm nếu anh Hùng trực tiếp ký hợp đồng với startup đó.",
        "D. Không vi phạm vì 30% không phải cổ phần kiểm soát."
      ],
      "c": 1,
      "exp": "Phần 5.2: Có lợi ích tài chính đáng kể tại nhà cung cấp = xung đột lợi ích bắt buộc khai báo. Không có ngưỡng % cụ thể — bản chất lợi ích tài chính mới quan trọng."
    },
    {
      "tag": "Tuyển dụng công bằng",
      "text": "Hội đồng tuyển dụng loại ứng viên vượt trội vì \"có vẻ quá hướng nội, không hợp văn hóa năng động\". Không có đánh giá kỹ năng cụ thể nào. Phù hợp COC không?",
      "opts": [
        "A. Phù hợp vì văn hóa doanh nghiệp là tiêu chí tuyển dụng hợp lệ.",
        "B. Không phù hợp — tuyển dụng phải dựa trên phẩm chất và kỹ năng; loại bỏ vì tính cách mà không có cơ sở khách quan là phân biệt đối xử ẩn.",
        "C. Phù hợp nếu toàn bộ hội đồng đồng thuận.",
        "D. Chỉ vi phạm nếu ứng viên thuộc nhóm bảo vệ theo luật."
      ],
      "c": 1,
      "exp": "Phần 2.2: Tuyển dụng phải dựa trên phẩm chất và kỹ năng chuyên nghiệp. Chấp nhận sự đa dạng tính cách là yêu cầu của COC. Loại bỏ vì tính cách mà không có tiêu chí khách quan là phân biệt đối xử ẩn."
    },
    {
      "tag": "Môi trường & An toàn",
      "text": "Vì áp lực tiến độ, nhân viên vứt pin và vật liệu thải thiết bị y tế vào thùng rác thông thường thay vì quy trình chất thải y tế. \"Chỉ một lần, không đáng kể.\" Đánh giá?",
      "opts": [
        "A. Ít nghiêm trọng vì chỉ là một lần vi phạm nhỏ.",
        "B. Vi phạm cam kết môi trường (Phần 6.1) và an toàn (Phần 2.3); không có ngoại lệ vì tiến độ.",
        "C. Chỉ vi phạm nếu chất thải được phân loại \"nguy hại\" theo luật.",
        "D. Không vi phạm COC vì Phần 6 chỉ mang tính khuyến khích."
      ],
      "c": 1,
      "exp": "Phần 6.1 & 2.3: Môi trường là cam kết cốt lõi của MediGroup. Ngay cả công việc quen thuộc, thiếu tuân thủ có thể gây hậu quả nghiêm trọng. Áp lực tiến độ không phải lý do miễn trừ."
    }
  ]
};

export function getSessionVideoFileId(sessionId: number) {
  return process.env["TRAINING_VIDEO_" + (sessionId + 1) + "_DRIVE_FILE_ID"] || SESSIONS.en[sessionId]?.videoDriveFileId || "";
}
