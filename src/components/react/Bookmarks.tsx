import "./Bookmarks.css";

interface BookmarkLink {
  label: string;
  url: string;
  description?: string;
}

interface BookmarkGroup {
  category: string;
  links: BookmarkLink[];
}

// Add/edit your links here — grouped by category.
const BOOKMARK_GROUPS: BookmarkGroup[] = [
  {
    category: "News",
    links: [
      { label: "Wall Street Journal", url: "https://www.wsj.com/" },
      { label: "New York Times", url: "https://www.nytimes.com/" },
    ],
  },
  {
    category: "SCAI",
    links: [
      {
        label: "SCAI IT Support",
        url: "https://scai.engineering.asu.edu/support-services/resources-and-links/",
      },
      {
        label: "SCAI Proposal Intake Form",
        url: "https://fultonapps.asu.edu/rpi",
      },
      {
        label: "SCAI Faculty News Intake",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdACysLc136AA37gT33XJ3i_T0D5PTYdIvLgbhMo9ulhSfk1A/viewform",
      },
      { label: "SCAI Student News Intake", url: "http://bit.ly/phdnews" },
      { label: "SCAI Ph.D. Applications", url: "https://gradreview.rev.fish/" },
      {
        label: "Research Accounts",
        url: "https://ft.ke.asu.edu/reports/accountsummary/65861f1b-4cf2-44df-86d6-c675711b7951",
      },
      {
        label: "MPS Listserv",
        url: "https://lists.asu.edu/scripts/wa-ASU.exe?INDEX&X=8C1A7F0FCE3B13F3CA&Y=Aviral.Shrivastava%40asu.edu",
      },
      {
        label: "Send notice of defense to SCAI",
        url: "https://links.asu.edu/scaidefense",
      },
      {
        label: "SCAI Room Reservation",
        url: "https://app.smartsheet.com/b/form/26272367808d42d3a036da503f64f23a",
      },
      {
        label: "Kuali Manual",
        url: "https://docs.google.com/document/d/1q6QAB3Hpeei4mdr6vdzfGCrD8m2ZO5EXBDrcYToMASI/edit?tab=t.0#heading=h.xsp8d3hm640w",
      },
      { label: "Grade Change", url: "https://www.asu.edu/go/worklist/" },
    ],
  },
  {
    category: "ASU",
    links: [
      { label: "My ASU", url: "https://webapp4.asu.edu/myasu/" },
      {
        label: "ASU Academic Calendar",
        url: "http://students.asu.edu/academic-calendar",
      },
      { label: "ASU Course Catalog", url: "https://webapp4.asu.edu/catalog/" },
      {
        label: "ASU Email",
        url: "https://federation.asu.edu/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3Afederation%3AMicrosoftOnline",
      },
      { label: "ASU FAR", url: "https://far.asu.edu/" },
      {
        label: "ASU Graduate Applications",
        url: "https://webapp4.asu.edu/gradapprev/",
      },
      {
        label: "ASU Per diem rates",
        url: "https://cfo.asu.edu/fs-travel-perdiem",
      },
      {
        label: "ASU International Travel",
        url: "https://travel.asu.edu/ASUTravel/ssl/popups/paperform.jsp",
      },
      {
        label: "ASU Travel Guidelines",
        url: "https://cfo.asu.edu/domestic-travel-guidance",
      },
      { label: "ASU Library", url: "https://lib.asu.edu/" },
      {
        label: "ASU Libproxy",
        url: "http://login.ezproxy1.lib.asu.edu/login?url=$@",
      },
      {
        label: "ASU Proposals Sharepoint",
        url: "https://researchproposal.sharepoint.asu.edu/_layouts/viewlsts.aspx?ShowSites=1",
      },
      {
        label: "ASU Teaching Evaluations",
        url: "https://fultonapps.asu.edu/evalinstructor/",
      },
      {
        label: "ASU UGTA Request Form",
        url: "https://fultonapps.asu.edu/ugta/",
      },
      {
        label: "ASU Teaching Evaluation Completion Rate",
        url: "https://fultonapps.asu.edu/evalinstructor/",
      },
      {
        label: "ASU Research Admin Forms",
        url: "https://researchadmin.asu.edu/documents",
      },
      {
        label: "ASU Proposal Editing Service",
        url: "https://researchacademy.asu.edu/proposalediting",
      },
      {
        label: "ASU Sponsored Activity Report",
        url: "https://analyticsreporting.asu.edu/ReportServer/Pages/ReportViewer.aspx?/Analytics/Knowledge%20Enterprise%20Analytics/FacultySponsoredActivityReport",
      },
      {
        label: "ASU Service Catalog",
        url: "https://asu.service-now.com/catalog_home.do",
      },
      {
        label: "ASU Patent Applications",
        url: "https://skysong.inteum.com/skysong/inventorportal/default.aspx",
      },
      {
        label: "ASU RA Position Advertisement",
        url: "https://graduate.engineering.asu.edu/fellowships/assistantships/",
      },
      { label: "ASU CEN Forms", url: "https://cen.engineering.asu.edu/forms/" },
      {
        label: "ASU CS Forms",
        url: "https://cidse.engineering.asu.edu/grad-policies-forms-and-procedures/",
      },
      { label: "ASU ISAAC Requests", url: "https://fultonapps.asu.edu/isaac/" },
      {
        label: "ASU grade appeals process",
        url: "https://students.engineering.asu.edu/policies/grade-appeals/",
      },
      {
        label: "ASU Courtesy Affiliate",
        url: "https://docs.google.com/document/d/1fMwBZKMTccuoteXRrf9J3Ld1S6s_DgiQk4OFEhqkZmg/edit?tab=t.0",
      },
      {
        label: "ASU Business meals form",
        url: "https://docs.google.com/document/d/1_Y9I9RolW06k1R6W4dEvIw4YGKq_zl7xkYiQ6PT6Kco/edit?tab=t.0",
      },
      {
        label: "ASU Workday",
        url: "https://www.myworkday.com/asu/d/home.htmld",
      },
    ],
  },
  {
    category: "Funding",
    links: [
      {
        label: "Nvidia",
        url: "https://www.nvidia.com/en-us/industries/higher-education-research/academic-grant-program/",
        description: "submit anytime",
      },
      {
        label: "Samsung (SRA)",
        url: "https://sra.samsung.com/collaboration/start/apply/",
        description: "Feb",
      },
      {
        label: "Samsung (SAIT)",
        url: "https://www.sait.samsung.co.kr/saithome/about/collabo_process.do",
        description: "Aug",
      },
      {
        label: "Google",
        url: "https://research.google/programs-and-events/google-academic-research-awards/",
        description: "June",
      },
      {
        label: "IBM Ph.D Fellowship",
        url: "https://research.ibm.com/university/awards/fellowships.html",
        description: "July",
      },
    ],
  },
  {
    category: "Academic",
    links: [
      { label: "ESWEEK", url: "http://esweek.acm.org/" },
      {
        label: "NSF Fastlane",
        url: "https://www.fastlane.nsf.gov/jsp/homepage/proposals.jsp",
      },
      { label: "NSF CISE", url: "http://www.nsf.gov/dir/index.jsp?org=CISE" },
      { label: "Overleaf", url: "https://www.overleaf.com/dash" },
      {
        label: "Morgan Claypool",
        url: "http://www.morganclaypool.com/page/browseLbS.jsp",
      },
    ],
  },
  {
    category: "Banking",
    links: [
      { label: "American Express", url: "https://www.americanexpress.com/" },
      {
        label: "Amex Personal Savings",
        url: "https://www.personalsavings.americanexpress.com/index.html",
      },
      { label: "Chase", url: "https://chaseonline.chase.com/" },
      { label: "Citibank", url: "https://online.citi.com/US/login.do/" },
      {
        label: "Schools First FCU",
        url: "https://www.schoolsfirstfcu.org/gateway/schoolsfirstfcu/home#/",
      },
      {
        label: "TIAA",
        url: "https://auth.tiaa.org/public/authentication/securelogin",
      },
      { label: "SBI", url: "https://www.onlinesbi.com/retail/login.htm#" },
      { label: "Wells Fargo", url: "https://www.wellsfargo.com/" },
      { label: "PennyMac", url: "https://mypennymac.pennymac.com/" },
    ],
  },
  {
    category: "Reviews",
    links: [
      {
        label: "Easychair",
        url: "https://www.easychair.org/account/signin.cgi",
      },
      { label: "Softconf", url: "https://www.softconf.com/e/super/scmd.cgi" },
      { label: "IJPP Editor", url: "http://www.editorialmanager.com/ijpp/" },
      { label: "ACM TECS", url: "http://mc.manuscriptcentral.com/tecs" },
      { label: "ACM TACO", url: "http://mc.manuscriptcentral.com/taco" },
      { label: "ACM TODAES", url: "http://mc.manuscriptcentral.com/todaes" },
      {
        label: "IEEE TVLSI",
        url: "http://mc.manuscriptcentral.com/tvlsi-ieee",
      },
      { label: "IEEE TCAD", url: "http://mc.manuscriptcentral.com/tcad" },
      { label: "IEEE ESL", url: "https://mc.manuscriptcentral.com/les-ieee" },
    ],
  },
  {
    category: "Travel",
    links: [
      { label: "Indian Railways Reservation", url: "https://irctc.co.in/" },
      {
        label: "Indian Railways Status",
        url: "http://enquiry.indianrail.gov.in/ntes/",
      },
      { label: "Southwest Airlines", url: "http://www.southwest.com/" },
      {
        label: "US Airways",
        url: "https://membership.usairways.com/Manage/AccountSummary.aspx",
      },
    ],
  },
  {
    category: "Utilities",
    links: [
      {
        label: "ATT Wireless",
        url: "https://www.att.com/olam/loginAction.olamexecute?customerType=W",
      },
      { label: "Cox", url: "https://ww2.cox.com/resaccount/home.cox" },
      {
        label: "SRP",
        url: "https://myaccount.srpnet.com/SSO/Login?ReturnUrl=%2fsso%2f",
      },
      {
        label: "Phoenix Utilities",
        url: "https://payonline.phoenix.gov/OUCSSPortal/faces/oracle/ugbu/ss/custom/pages/secure/CmDashboard.jspx",
      },
      {
        label: "Phoenix Public Library",
        url: "https://catalog.phoenixpubliclibrary.org/patronaccount/default.aspx",
      },
      {
        label: "Phoenix Parks and Recreation",
        url: "https://online.activecommunities.com/phoenix/Start/Start.asp",
      },
      {
        label: "Rebtel",
        url: "https://my.rebtel.com/en/account/signin?returnUrl=%2fen%2fcontacts%2f",
      },
      {
        label: "AAA",
        url: "https://mypolicyclub.digital.csaa-insurance.aaa.com/dashboard",
      },
      { label: "AllState", url: "https://myaccountrwd.allstate.com/" },
    ],
  },
  {
    category: "Others",
    links: [
      { label: "Dictionary", url: "http://dictionary.com/" },
      { label: "Thesaurus", url: "http://thesaurus.com/" },
      { label: "India School Rankings", url: "https://www.nirfindia.org/engg" },
      {
        label: "Lekha Soccer",
        url: "https://go.teamsnap.com/4809982/schedule?mode=calendar",
      },
    ],
  },
  {
    category: "ML Learning",
    links: [
      {
        label: "TensorFlow Tutorials",
        url: "https://www.tensorflow.org/text/tutorials/transformer#setup",
      },
      {
        label: "Andrew Ng – AI",
        url: "https://www.youtube.com/channel/UC5zx8Owijmv-bbhAK6Z9apg",
      },
      { label: "Amit Sethi – ML course", url: "https://shala2020.github.io/" },
      {
        label: "Neural Network Book",
        url: "http://neuralnetworksanddeeplearning.com/",
      },
      { label: "Dive into Deep Learning", url: "https://d2l.ai/index.html" },
      {
        label: "UCSD Ismaelzadeh – Accelerator Design for Deep Learning",
        url: "https://hadiclass.github.io/cse240d-wi19/schedule.html",
      },
      {
        label: "Tony Nowatski – Learning Machines",
        url: "http://polyarch.github.io/cs259/02-schedule/",
      },
      {
        label: "Dimitri's RL Book",
        url: "http://www.mit.edu/~dimitrib/RLbook.html",
      },
      {
        label: "Recommendation systems collab",
        url: "https://colab.research.google.com/github/google/eng-edu/blob/main/ml/recommendation-systems/recommendation-systems.ipynb",
      },
      {
        label: "A Gentle Introduction to GNNs",
        url: "https://distill.pub/2021/gnn-intro/",
      },
      {
        label: "Hamilton's book on Graph Representation Learning",
        url: "https://www.cs.mcgill.ca/~wlh/grl_book/files/GRL_Book.pdf",
      },
      { label: "UVa Deep Learning Course", url: "https://uvadlc.github.io/" },
      {
        label: "Deep ML Practice Problems",
        url: "https://www.deep-ml.com/problems",
      },
      { label: "Data Blog", url: "https://xavierbourretsicotte.github.io/" },
      { label: "Probabilistic AI", url: "https://arxiv.org/abs/2502.05244" },
      {
        label: "The Illustrated Transformer",
        url: "https://jalammar.github.io/illustrated-transformer/",
      },
    ],
  },
  {
    category: "Other Learning Material",
    links: [
      {
        label: "Morgan Claypool (ASU proxy)",
        url: "https://www-morganclaypool-com.ezproxy1.lib.asu.edu/page/coll_eleven",
      },
      {
        label: "Jones and Bartlett",
        url: "http://navigate2.jblearning.com/course/view.php?id=54448",
      },
      { label: "Green River Publications", url: "https://usb.grtep.com/" },
      {
        label: "ARM University Github",
        url: "https://github.com/arm-university",
      },
      {
        label: "CS video courses",
        url: "https://github.com/Developer-Y/cs-video-courses#quantum-computing",
      },
      {
        label: "Programming Languages",
        url: "http://homepage.divms.uiowa.edu/~slonnegr/plf/Book/",
      },
      {
        label: "llvm getting started",
        url: "https://llvm.org/docs/GettingStarted.html",
      },
      {
        label: "Michelle Mills Strout – LLVM course (U. Arizona)",
        url: "http://cgi.cs.arizona.edu/~mstrout/teaching.html",
      },
      {
        label: "Louis-Noël Pouchet – LLVM course (Colorado State)",
        url: "http://www.cs.colostate.edu/~cs553/",
      },
      { label: "Erlang", url: "https://learnyousomeerlang.com/content" },
      { label: "Haskell", url: "http://learnyouahaskell.com/chapters" },
      {
        label: "Differential Equations",
        url: "https://simiode.org/resources/4842/download/Book_Kaabar_DQ.pdf",
      },
      {
        label: "StatQuest – Statistics and ML",
        url: "https://www.youtube.com/channel/UCtYLUTtgS3k1Fg4y5tAhLbw",
      },
      {
        label: "Kalman filter (pdf)",
        url: "https://drive.google.com/file/d/0By_SW19c1BfhSVFzNHc0SjduNzg/view",
      },
      {
        label: "Kalman filter (github)",
        url: "https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python",
      },
      {
        label: "Brian Douglas – Control Theory",
        url: "https://www.youtube.com/channel/UCq0imsn84ShAe9PBOFnoIrg",
      },
      {
        label: "Smruti Sarangi – Computer Architecture (basic)",
        url: "https://www.cse.iitd.ac.in/~srsarangi/archbooksoft.html",
      },
      {
        label: "Smruti Sarangi – Computer Architecture (advanced)",
        url: "https://www.cse.iitd.ac.in/~srsarangi/advbook/index.html",
      },
      { label: "MIMO Book", url: "https://massivemimobook.com/wp/" },
      { label: "Online Compiler", url: "https://godbolt.org/" },
      {
        label: "Physics with Eliott",
        url: "https://www.physicswithelliot.com/all-notes",
      },
    ],
  },
  {
    category: "Lekha",
    links: [
      {
        label: "DV ParentVue",
        url: "https://az-tuhsd-psv.edupoint.com/Home_PXP2.aspx",
      },
    ],
  },
];

export default function Bookmarks() {
  return (
    <div className="bookmarks-page">
      <header className="bookmarks-header">
        <h1>Bookmarks</h1>
        <p>Personal links &amp; resources.</p>
      </header>

      <main>
        {BOOKMARK_GROUPS.map((group) => (
          <section className="bookmarks-group" key={group.category}>
            <h2>{group.category}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={`${link.label}::${link.url}`}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                  {link.description && (
                    <span className="bookmarks-desc">
                      {" "}
                      — {link.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
