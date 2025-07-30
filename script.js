
function calculateReadiness() {
  const form = document.forms['readinessForm'];
  const phases = {
    "التصميم": ['design1', 'design2'],
    "البناء": ['build1', 'build2'],
    "التشغيل": ['operate1', 'operate2'],
    "التفكيك/نهاية العمر": ['end1', 'end2']
  };

  let totalScore = 0;
  let totalMax = 0;
  let resultText = "نتائج التقييم حسب المراحل:\n\n";

  for (let phase in phases) {
    let phaseScore = 0;
    phases[phase].forEach(id => {
      phaseScore += parseInt(form[id].value);
    });
    const max = phases[phase].length * 5;
    const percentage = (phaseScore / max) * 100;
    totalScore += phaseScore;
    totalMax += max;
    const status = percentage >= 70 ? "✔️" : "⚠️";
    resultText += `- ${phase}: ${percentage.toFixed(1)}% ${status}\n`;
  }

  const overall = (totalScore / totalMax) * 100;
  let level = "";
  let advice = "";

  if (overall >= 75) {
    level = "عالية";
    advice = "جاهزية ممتازة، يمكنك البدء بالتطبيق الكامل.";
  } else if (overall >= 50) {
    level = "متوسطة";
    advice = "يوصى بتطوير بعض الجوانب قبل التطبيق الكامل.";
  } else {
    level = "منخفضة";
    advice = "يُنصح بإعادة بناء القدرات والتخطيط التدريجي قبل التبني.";
  }

  resultText += `\nمستوى الجاهزية الكلي: ${overall.toFixed(1)}% (${level})\n\nالتوصية: ${advice}`;

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerText = resultText;
}
