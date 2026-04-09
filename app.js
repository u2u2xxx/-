const STORAGE_KEY = "sayhi-custom-phrases-v2";
const CAT_ASSET_KEY = "sayhi-cat-assets-v1";
const VOICE_KEY = "sayhi-voice-selection-v2";
const RECORDING_KEY = "sayhi-recording-v1";

const voicePresets = [
  {
    id: "xiaoxin",
    label: "蜡笔小新腔",
    hint: "更顽皮、更拖一点的语气，适合轻松整活。",
    rate: 0.9,
    pitch: 1.32,
    volume: 1
  },
  {
    id: "wukong",
    label: "西游悟空腔",
    hint: "更灵动、更有冲劲的出场感，适合直球一点。",
    rate: 1.06,
    pitch: 1.18,
    volume: 1
  },
  {
    id: "host",
    label: "主持播音腔",
    hint: "更稳、更清楚，像主持人帮你把开场端住。",
    rate: 0.98,
    pitch: 1.02,
    volume: 1
  },
  {
    id: "loli",
    label: "软萌萝莉腔",
    hint: "更轻、更甜，适合温柔型破冰。",
    rate: 0.95,
    pitch: 1.45,
    volume: 1
  },
  {
    id: "boss",
    label: "霸道总裁腔",
    hint: "更低、更稳、更有掌控感，适合直给式开场。",
    rate: 0.92,
    pitch: 0.86,
    volume: 1
  },
  {
    id: "documentary",
    label: "纪录解说腔",
    hint: "更像旁白，适合一本正经地说土味情话。",
    rate: 0.9,
    pitch: 0.98,
    volume: 1
  },
  {
    id: "custom-recording",
    label: "我的录音腔",
    hint: "播放你自己录下的一段示范音。",
    rate: 1,
    pitch: 1,
    volume: 1
  }
];

const moodMeta = {
  soft: {
    label: "温柔甜一点",
    stageLabel: "当前状态：软萌贴贴猫",
    image: "./assets/cat-soft.gif"
  },
  playful: {
    label: "搞笑轻松一点",
    stageLabel: "当前状态：淡定整活猫",
    image: "./assets/cat-neutral.gif"
  },
  bold: {
    label: "直球上头一点",
    stageLabel: "当前状态：冲锋出击猫",
    image: "./assets/cat-bold.gif"
  }
};

const builtinPhrases = [
  { text: "你好，刚见面我就觉得今天的好心情像是你带来的。", mood: "soft" },
  { text: "我本来只打算礼貌地打个招呼，结果一见你就想顺便心动一下。", mood: "soft" },
  { text: "如果今天的相遇有个主题，那大概叫做刚好看见你。", mood: "soft" },
  { text: "你一出现，我连开场白都想说得认真一点。", mood: "soft" },
  { text: "你好呀，希望我们今天这句开场，能变成以后很多句聊天。", mood: "soft" },
  { text: "刚见到你，我就觉得今天适合多聊一会儿。", mood: "soft" },
  { text: "我刚刚还在想怎么不尴尬地开口，现在看到你，好像笑一下就够了。", mood: "soft" },
  { text: "你看起来有种很特别的本事，能把初次见面的紧张变成期待。", mood: "soft" },
  { text: "见到你之后，我突然理解了什么叫做氛围感本人。", mood: "soft" },
  { text: "我原本只是路过一下，现在有点想认真认识你一下。", mood: "soft" },

  { text: "你是不是偷偷改了我的天气预报，不然我怎么一见你就晴了。", mood: "playful" },
  { text: "你好，我想确认一件事，你是不是负责让人第一眼就想聊天的。", mood: "playful" },
  { text: "你知道我为什么突然站直了吗，因为礼貌和心动同时上线了。", mood: "playful" },
  { text: "本来我想正常打招呼，结果脑子里先弹出一句你好可爱。", mood: "playful" },
  { text: "你今天是不是带了什么隐藏技能，怎么一出现就把气氛救活了。", mood: "playful" },
  { text: "我刚才路过的时候还挺淡定，看到你之后就想申请多停留几分钟。", mood: "playful" },
  { text: "见到你之前，我还挺会聊天的，见到你之后只剩一句你好厉害。", mood: "playful" },
  { text: "如果今天破冰要选代言人，我觉得你已经赢了。", mood: "playful" },
  { text: "你好，我怀疑你有点过分，因为你过分让人想认识。", mood: "playful" },
  { text: "你一来，我连社交电量都突然恢复到满格了。", mood: "playful" },

  { text: "你知道我今天为什么状态这么好吗，因为刚好遇见了你。", mood: "bold" },
  { text: "别的招呼都太普通了，我想直接说一句，你让我挺想继续认识的。", mood: "bold" },
  { text: "我刚才只看了你一眼，心里已经自动把下一句聊天想好了。", mood: "bold" },
  { text: "如果心动有提醒音，我刚刚应该已经连响好几下了。", mood: "bold" },
  { text: "我发现一件事，第一次见面也可以有一点点偏爱。", mood: "bold" },
  { text: "今天本来是普通的一天，直到我看见你，剧情才像刚开始。", mood: "bold" },
  { text: "如果我现在夸你很让人心动，算不算一种坦白从宽。", mood: "bold" },
  { text: "我觉得我们这次见面挺不简单的，至少我的注意力已经被你拿走了。", mood: "bold" },
  { text: "你好，我想先打个招呼，再问问你愿不愿意把我列入熟人范围。", mood: "bold" },
  { text: "我知道这样说有点直球，但你真的很适合被认真认识。", mood: "bold" }
];

const state = {
  customPhrases: loadCustomPhrases(),
  catAssets: loadCatAssets(),
  currentCandidates: [],
  activePhraseId: "",
  voice: null,
  selectedVoiceKey: loadVoiceSelection(),
  recordingDataUrl: loadRecording(),
  mediaRecorder: null,
  recordingChunks: []
};

const catButton = document.querySelector("#catButton");
const catImage = document.querySelector("#catImage");
const moodPill = document.querySelector("#moodPill");
const drawButton = document.querySelector("#drawButton");
const stopVoiceButton = document.querySelector("#stopVoiceButton");
const candidateList = document.querySelector("#candidateList");
const speechText = document.querySelector("#speechText");
const speechBubble = document.querySelector("#speechBubble");
const phraseForm = document.querySelector("#phraseForm");
const catForm = document.querySelector("#catForm");
const customPhraseInput = document.querySelector("#customPhrase");
const customMoodInput = document.querySelector("#customMood");
const catMoodInput = document.querySelector("#catMood");
const catFileInput = document.querySelector("#catFile");
const savedList = document.querySelector("#savedList");
const catAssetList = document.querySelector("#catAssetList");
const catAssetCount = document.querySelector("#catAssetCount");
const voicePresetSelect = document.querySelector("#voicePresetSelect");
const voicePresetHint = document.querySelector("#voicePresetHint");
const voiceStatus = document.querySelector("#voiceStatus");
const recordingStatus = document.querySelector("#recordingStatus");
const recordingPreview = document.querySelector("#recordingPreview");
const startRecordingButton = document.querySelector("#startRecordingButton");
const stopRecordingButton = document.querySelector("#stopRecordingButton");
const clearRecordingButton = document.querySelector("#clearRecordingButton");
const customCount = document.querySelector("#customCount");
const candidateTemplate = document.querySelector("#candidateTemplate");
const savedPhraseTemplate = document.querySelector("#savedPhraseTemplate");
const catAssetTemplate = document.querySelector("#catAssetTemplate");

init();

function init() {
  renderSavedPhrases();
  renderCatAssets();
  renderVoicePresetOptions();
  renderRecordingState();
  drawCandidates();
  bindEvents();
  prepareVoice();
}

function bindEvents() {
  catButton.addEventListener("click", () => {
    drawCandidates();
    animateExcited();
    setCatMood("playful");
    updateSpeech("我已经帮你抽好 3 句啦，挑一句最适合现在气氛的吧。");
  });

  drawButton.addEventListener("click", () => {
    drawCandidates();
    animateExcited();
    setCatMood("playful");
    updateSpeech("换一组新灵感，看看哪句最适合你今天的出场方式。");
  });

  stopVoiceButton.addEventListener("click", stopSpeaking);

  phraseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = customPhraseInput.value.trim();
    const mood = customMoodInput.value;

    if (!text) {
      updateSpeech("先写一句你自己的风格，我再帮你存起来。");
      return;
    }

    if (allPhrases().some((item) => item.text === text)) {
      updateSpeech("这句已经在你的情话库里啦，换一句新的吧。");
      return;
    }

    state.customPhrases.unshift({
      id: createId(),
      text,
      mood
    });

    persistCustomPhrases();
    customPhraseInput.value = "";
    customMoodInput.value = "soft";
    renderSavedPhrases();
    drawCandidates();
    setCatMood(mood);
    updateSpeech("已加入你的专属情话库，下次抽选时就会带着对应猫猫状态一起出现。");
  });

  catForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const mood = catMoodInput.value;
    const file = catFileInput.files?.[0];
    if (!file) {
      updateSpeech("先选一张图片，我再帮你放进对应的猫猫槽位。");
      return;
    }

    if (!file.type.startsWith("image/") && !file.name.toLowerCase().endsWith(".gif")) {
      updateSpeech("这次上传的不是图片格式，换一张猫猫图试试。");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      state.catAssets[mood] = dataUrl;
      persistCatAssets();
      renderCatAssets();
      setCatMood(mood);
      catFileInput.value = "";
      updateSpeech("新的猫猫素材已经接管这个语境啦，接下来它会按这个风格出场。");
    } catch {
      updateSpeech("这张图片暂时没有读进来，换一张再试试。");
    }
  });

  voicePresetSelect.addEventListener("change", () => {
    state.selectedVoiceKey = voicePresetSelect.value;
    persistVoiceSelection();
    applyVoiceSelection();
    updateSpeech("猫猫的声音已经切换好了，你可以点一句情话试试听感。");
  });

  startRecordingButton.addEventListener("click", startRecording);
  stopRecordingButton.addEventListener("click", stopRecording);
  clearRecordingButton.addEventListener("click", clearRecording);

  window.speechSynthesis?.addEventListener?.("voiceschanged", prepareVoice);
}

function drawCandidates() {
  const grouped = groupByMood(allPhrases());
  const picks = [];
  const moods = shuffle(["soft", "playful", "bold"]);

  moods.forEach((mood) => {
    const bucket = grouped[mood] ?? [];
    if (bucket.length) {
      picks.push(randomOne(bucket));
    }
  });

  if (picks.length < 3) {
    const usedIds = new Set(picks.map((item) => item.id));
    const leftovers = shuffle(allPhrases().filter((item) => !usedIds.has(item.id)));
    leftovers.forEach((item) => {
      if (picks.length < 3) {
        picks.push(item);
      }
    });
  }

  state.currentCandidates = shuffle(picks).slice(0, 3);
  renderCandidates();
}

function renderCandidates() {
  candidateList.innerHTML = "";

  state.currentCandidates.forEach((phrase, index) => {
    const fragment = candidateTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".candidate-card");
    const indexNode = fragment.querySelector(".candidate-index");
    const moodNode = fragment.querySelector(".candidate-mood");
    const textNode = fragment.querySelector(".candidate-text");

    indexNode.textContent = String(index + 1);
    moodNode.textContent = moodMeta[phrase.mood].label;
    moodNode.classList.add(tagClass(phrase.mood));
    textNode.textContent = phrase.text;

    if (phrase.id === state.activePhraseId) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => {
      state.activePhraseId = phrase.id;
      renderCandidates();
      speakPhrase(phrase);
    });

    candidateList.appendChild(fragment);
  });
}

function renderSavedPhrases() {
  savedList.innerHTML = "";
  customCount.textContent = `${state.customPhrases.length} 条`;

  if (!state.customPhrases.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "你还没有自定义情话，先写一句属于自己的开场白吧。";
    savedList.appendChild(empty);
    return;
  }

  state.customPhrases.forEach((phrase) => {
    const fragment = savedPhraseTemplate.content.cloneNode(true);
    const moodNode = fragment.querySelector(".saved-mood");
    const textNode = fragment.querySelector(".saved-text");
    const deleteButton = fragment.querySelector(".delete-btn");

    moodNode.textContent = moodMeta[phrase.mood].label;
    moodNode.classList.add(tagClass(phrase.mood));
    textNode.textContent = phrase.text;

    deleteButton.addEventListener("click", () => {
      state.customPhrases = state.customPhrases.filter((item) => item.id !== phrase.id);
      persistCustomPhrases();
      renderSavedPhrases();
      drawCandidates();
      updateSpeech("这句已经从你的自定义情话库里移除了。");
    });

    savedList.appendChild(fragment);
  });
}

function renderCatAssets() {
  catAssetList.innerHTML = "";
  const customAssetCount = Object.values(state.catAssets).filter(Boolean).length;
  catAssetCount.textContent = `${customAssetCount} 个自定义槽位`;

  Object.keys(moodMeta).forEach((mood) => {
    const fragment = catAssetTemplate.content.cloneNode(true);
    const moodNode = fragment.querySelector(".saved-mood");
    const previewNode = fragment.querySelector(".asset-preview");
    const deleteButton = fragment.querySelector(".delete-btn");

    moodNode.textContent = moodMeta[mood].label;
    moodNode.classList.add(tagClass(mood));
    previewNode.src = state.catAssets[mood] || moodMeta[mood].image;

    deleteButton.addEventListener("click", () => {
      delete state.catAssets[mood];
      persistCatAssets();
      renderCatAssets();
      setCatMood(mood);
      updateSpeech("这个语境已经恢复为默认猫猫素材。");
    });

    catAssetList.appendChild(fragment);
  });
}

function speakPhrase(phrase) {
  stopSpeaking();
  updateSpeech(phrase.text);
  animateExcited();
  setCatMood(phrase.mood);

  if (state.selectedVoiceKey === "custom-recording" && state.recordingDataUrl) {
    playCustomRecording();
    return;
  }

  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    updateSpeech(`${phrase.text}（当前浏览器不支持语音播放，但这句已经帮你选好了。）`);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(phrase.text);
  const preset = currentVoicePreset();
  utterance.lang = "zh-CN";
  utterance.rate = preset.rate;
  utterance.pitch = preset.pitch;
  utterance.volume = preset.volume;

  if (state.voice) {
    utterance.voice = state.voice;
  }

  utterance.onstart = () => {
    catButton.classList.add("is-speaking");
  };

  utterance.onend = () => {
    catButton.classList.remove("is-speaking");
  };

  utterance.onerror = () => {
    catButton.classList.remove("is-speaking");
    updateSpeech(`${phrase.text}（语音这次没有成功播出来，但猫猫已经替你选好语境了。）`);
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  catButton.classList.remove("is-speaking");
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  recordingPreview.pause();
  recordingPreview.currentTime = 0;
}

function updateSpeech(text) {
  speechText.textContent = text;
  speechBubble.classList.remove("is-speaking");
  void speechBubble.offsetWidth;
  speechBubble.classList.add("is-speaking");
}

function setCatMood(mood) {
  const meta = moodMeta[mood] ?? moodMeta.playful;
  catImage.src = state.catAssets[mood] || meta.image;
  moodPill.textContent = meta.stageLabel;
}

function animateExcited() {
  catButton.classList.remove("is-excited");
  void catButton.offsetWidth;
  catButton.classList.add("is-excited");
  window.setTimeout(() => catButton.classList.remove("is-excited"), 1400);
}

function prepareVoice() {
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "当前浏览器不支持 TTS";
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  applyVoiceSelection(voices);
}

function renderVoicePresetOptions() {
  voicePresetSelect.innerHTML = "";

  voicePresets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.label;
    voicePresetSelect.appendChild(option);
  });
}

function applyVoiceSelection(voices = window.speechSynthesis?.getVoices?.() ?? []) {
  const zhVoices = voices.filter((voice) => voice.lang.toLowerCase().includes("zh"));
  const pool = zhVoices.length ? zhVoices : voices;

  if (!voicePresets.some((preset) => preset.id === state.selectedVoiceKey)) {
    state.selectedVoiceKey = "host";
  }

  if (!pool.length) {
    state.voice = null;
    voicePresetSelect.value = state.selectedVoiceKey;
    voicePresetHint.textContent = currentVoicePreset().hint;
    voiceStatus.textContent = state.selectedVoiceKey === "custom-recording" ? "使用录音样本" : "未检测到系统语音";
    return;
  }

  const selected =
    pool.find((voice) => /xiaoxiao|xiaoyi|huihui|female/i.test(voice.name)) ||
    pool[0];

  state.voice = selected;
  voicePresetSelect.value = state.selectedVoiceKey;
  voicePresetHint.textContent = currentVoicePreset().hint;
  voiceStatus.textContent = state.selectedVoiceKey === "custom-recording"
    ? "使用录音样本"
    : `当前基底语音：${selected.name}`;
  persistVoiceSelection();
}

function groupByMood(list) {
  return list.reduce((result, item) => {
    if (!result[item.mood]) {
      result[item.mood] = [];
    }
    result[item.mood].push(item);
    return result;
  }, {});
}

function allPhrases() {
  return [
    ...builtinPhrases.map((item, index) => ({ ...item, id: `builtin-${index}` })),
    ...state.customPhrases
  ];
}

function tagClass(mood) {
  return `tag-${mood}`;
}

function randomOne(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  const clone = [...list];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[nextIndex]] = [clone[nextIndex], clone[index]];
  }
  return clone;
}

function createId() {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadCustomPhrases() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && typeof item.text === "string")
      .map((item) => ({
        id: typeof item.id === "string" ? item.id : createId(),
        text: item.text,
        mood: moodMeta[item.mood] ? item.mood : "soft"
      }));
  } catch {
    return [];
  }
}

function persistCustomPhrases() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.customPhrases));
}

function loadCatAssets() {
  try {
    const raw = window.localStorage.getItem(CAT_ASSET_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function persistCatAssets() {
  window.localStorage.setItem(CAT_ASSET_KEY, JSON.stringify(state.catAssets));
}

function loadVoiceSelection() {
  return window.localStorage.getItem(VOICE_KEY) || "host";
}

function persistVoiceSelection() {
  window.localStorage.setItem(VOICE_KEY, state.selectedVoiceKey || "");
}

function currentVoicePreset() {
  return voicePresets.find((preset) => preset.id === state.selectedVoiceKey) || voicePresets[2];
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    updateSpeech("当前浏览器不支持录音功能，可以先继续使用预设声线。");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    state.recordingChunks = [];
    state.mediaRecorder = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        state.recordingChunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(state.recordingChunks, { type: recorder.mimeType || "audio/webm" });
      state.recordingDataUrl = await readBlobAsDataUrl(blob);
      persistRecording();
      renderRecordingState();
      stream.getTracks().forEach((track) => track.stop());
      updateSpeech("你的录音腔已经存好了，切到“我的录音腔”就能播放这段示范音。");
    };

    recorder.start();
    recordingStatus.textContent = "录音中";
    updateSpeech("开始录音啦，录一小段你想要的声线示范就可以。");
  } catch {
    updateSpeech("没有拿到麦克风权限，暂时没法录音。");
  }
}

function stopRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
    state.mediaRecorder.stop();
  }
}

function clearRecording() {
  state.recordingDataUrl = "";
  persistRecording();
  renderRecordingState();
  if (state.selectedVoiceKey === "custom-recording") {
    state.selectedVoiceKey = "host";
    persistVoiceSelection();
    applyVoiceSelection();
  }
  updateSpeech("录音样本已经清空，现在会继续使用预设声线。");
}

function renderRecordingState() {
  if (state.recordingDataUrl) {
    recordingPreview.src = state.recordingDataUrl;
    recordingStatus.textContent = "已录制";
  } else {
    recordingPreview.removeAttribute("src");
    recordingPreview.load();
    recordingStatus.textContent = "未录制";
  }
}

function playCustomRecording() {
  if (!state.recordingDataUrl) {
    updateSpeech("你还没有录音样本，先录一段自己的声线吧。");
    return;
  }

  catButton.classList.add("is-speaking");
  recordingPreview.src = state.recordingDataUrl;
  recordingPreview.currentTime = 0;
  recordingPreview.play().catch(() => {
    catButton.classList.remove("is-speaking");
    updateSpeech("录音样本这次没有成功播放出来。");
  });
  recordingPreview.onended = () => {
    catButton.classList.remove("is-speaking");
  };
}

function loadRecording() {
  return window.localStorage.getItem(RECORDING_KEY) || "";
}

function persistRecording() {
  window.localStorage.setItem(RECORDING_KEY, state.recordingDataUrl || "");
}

function readBlobAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
