const chatLog = document.getElementById("chatLog");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const categoryMap = {
  discouraged: "Discouraged / Downcast / Hopeless",
  encouragement: "Encouragement / Praise / Victory",
  gratitude: "Gratitude / Thankfulness",
  fear: "Fear / Anxiety / Worry / Cowardice",
  peace: "Peace / Calm / Assurance / Rest",
  provision: "Provision / Finances / Need",
  tired: "Tired / Weary / Exhausted / Burnt Out",
  shame: "Shame / Guilt / Regret / Condemnation",
  forgiveness: "Forgiveness / Redemption / Grace / Mercy",
  identity: "Identity in Christ / Self-Worth",
  purpose: "Existential / Meaning / Purpose",
  grief: "Grief / Loss / Missing Someone",
  confusion: "Cognitive / Confusion / Doubt",
  seeking: "Spiritual Hunger / Seeking God",
  temptation: "Temptation / Struggle with Sin",
  loneliness: "Loneliness / Isolation",
  anger: "Anger / Bitterness / Resentment",
  love: "Love / God’s Love / Loving Others",
  heartbreak: "Heartbreak / Rejection / Abandonment",
  hope: "Hope / Waiting on God",
  faith: "Faith / Trust / Obedience",
  joy: "Praise / Testimony / Joy",
  conviction: "Conviction / Correction / God’s Discipline",
  deliverance: "Deliverance / Breakthrough / Chains Broken",
  worship: "Worship / Reverence / Awe of God",
  unbelief: "Unbelief / Cynicism / Apathy"
};
const localVerses = {
  discouraged: [
    "The Lord is near to the brokenhearted and saves the crushed in spirit. (Psalm 34:18)",
    "He heals the brokenhearted and binds up their wounds. (Psalm 147:3)",
    "The Spirit of the Sovereign Lord is on me, because the Lord has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted. (Isaiah 61:1)",
    "Come to me, all you who are weary and burdened, and I will give you rest. (Matthew 11:28)",
    "Blessed are those who mourn, for they will be comforted. (Matthew 5:4)"
  ],
  encouragement: [
    "For God did not give us a spirit of fear, but of power and love and self-discipline. (2 Timothy 1:7)",
    "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.” (Joshua 1:9)",
    "I can do all this through him who gives me strength. (Philippians 4:13)",
    "For God did not give us a spirit of fear, but of power and love and self-discipline. (2 Timothy 1:7)",
    "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.” (Joshua 1:9)",
    "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit. (Romans 15:13)",
    "And now these three remain: faith, hope and love. But the greatest of these is love. (1 Corinthians 13:13)"
  ],
gratitude: [
    "Give thanks to the Lord, for he is good; his love endures forever! (Psalm 107:1)",
    "Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus. (1 Thessalonians 5:16-18)",
    "Offer the sacrifice of praise to God, the fruit of lips that openly profess his name. (Hebrews 13:15)",
    "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him. (Colossians 3:17)",
    "Through Jesus, therefore, let us continually offer to God a sacrifice of praise—the fruit of lips that openly profess his name. (Hebrews 13:15)"
  ],
fear: [
    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. (Philippians 4:6)",
    "For God gave us a spirit not of fear but of power and love and self-control. (2 Timothy 1:7)",
    "You will not have to fight this battle. Take up your positions; stand firm and see the deliverance the Lord will give you. (2 Chronicles 20:17)",
    "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid. (John 14:27)",
    "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love. (1 John 4:18)"
  ],
peace: [
    "You will keep in perfect peace those whose minds are steadfast, because they trust in you. (Isaiah 26:3)",
    "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid. (John 14:27)",
    "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus. (Philippians 4:7)",
    "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit. (Romans 15:13)",
    "Blessed are the peacemakers, for they will be called children of God. (Matthew 5:9)"
  ],
function classifyInput(inputText) {
  const emotionLabels = Object.keys(categoryMap);
  const emotionRegex = new RegExp(emotionLabels.join("|"), 'gi');
  const matchedEmotion = inputText.match(emotionRegex);
  const emotionLabel = matchedEmotion ?  matchedEmotion[0].toLowerCase() : null;
  return categoryMap[emotionLabel] || "encouragement";
}
function fetchVerse(category) {
  const apiEndpoint = `https://api.biblia.com/v1/bible/content/ESV.json?passage=${category}&key=d95299f3d300cd16b34ab47dcce24b69`;
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      const verseText = data.text;
      const verseCitation = data.reference;
      displayVerse(verseText, verseCitation);
    })
    .catch(error => console.error(error));
} //
function displayVerse(verseText, verseCitation) {
  const chatLogElement = document.getElementById("chatLog");
  const verseElement = document.createElement("div");
  verseElement.innerHTML = `<p>${verseText}</p><p><em>${verseCitation}</em></p>`;
  chatLogElement.appendChild(verseElement);
}
document.getElementById("sendButton").addEventListener("click", function() {
  const userInput = document.getElementById("userInput").value;
  const category = classifyInput(userInput);
  fetchVerse(category);
  document.getElementById("userInput").value = "";
});






