const STORAGE_KEY = "sayhi-custom-phrases-v2";
const CAT_ASSET_KEY = "sayhi-cat-assets-v2";
const SELECTED_CAT_ASSET_KEY = "sayhi-selected-cat-asset-v1";
const VOICE_KEY = "sayhi-voice-selection-v3";

const voicePresets = [
  { id: "xiaoxin", label: "蜡笔小新腔", hint: "顽皮松弛，适合轻松整活。", rate: 0.9, pitch: 1.32, volume: 1 },
  { id: "wukong", label: "西游悟空腔", hint: "灵动有冲劲，适合热闹直球。", rate: 1.06, pitch: 1.18, volume: 1 },
  { id: "host", label: "主持播音腔", hint: "稳一点，像有人替你把开场端住。", rate: 0.98, pitch: 1.02, volume: 1 },
  { id: "loli", label: "软萌萝莉腔", hint: "更轻更甜，适合温柔破冰。", rate: 0.95, pitch: 1.45, volume: 1 },
  { id: "boss", label: "霸道总裁腔", hint: "更低更稳，适合强势一点的出场。", rate: 0.92, pitch: 0.86, volume: 1 },
  { id: "documentary", label: "纪录解说腔", hint: "一本正经地说土味情话，反差感更强。", rate: 0.9, pitch: 0.98, volume: 1 }
];

const moodMeta = {
  soft: { stageLabel: "当前状态：软萌贴贴猫", image: "./assets/cat-soft.gif" },
  playful: { stageLabel: "当前状态：淡定整活猫", image: "./assets/cat-neutral.gif" },
  bold: { stageLabel: "当前状态：冲锋出击猫", image: "./assets/cat-bold.gif" }
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
  selectedCatAssetId: loadSelectedCatAssetId(),
  currentCandidates: [],
  activePhraseId: "",
  voice: null,
  selectedVoiceKey: loadVoiceSelection()
};

const catButton = document.querySelector("#catButton");
const catImage = document.querySelector("#catImage");
const moodPill = document.querySelector("#moodPill");
const drawButton = document.querySelector("#drawButton");
const candidateList = document.querySelector("#candidateList");
const speechText = document.querySelector("#speechText");
const speechBubble = document.querySelector("#speechBubble");
const phraseForm = document.querySelector("#phraseForm");
const catForm = document.querySelector("#catForm");
const customPhraseInput = document.querySelector("#customPhrase");
const customMoodInput = document.querySelector("#customMood");
const catFileInput = document.querySelector("#catFile");
const catAssetList = document.querySelector("#catAssetList");
const catAssetCount = document.querySelector("#catAssetCount");
const voicePresetSelect = document.querySelector("#voicePresetSelect");
const voicePresetHint = document.querySelector("#voicePresetHint");
const voiceStatus = document.querySelector("#voiceStatus");
const settingsDrawer = document.querySelector("#settingsDrawer");
const drawerToggle = document.querySelector("#drawerToggle");
const drawerCloseButton = document.querySelector("#drawerCloseButton");
const candidateTemplate = document.querySelector("#candidateTemplate");
const catAssetTemplate = document.querySelector("#catAssetTemplate");

init();

function init() {
  renderCatAssets();
  renderVoicePresetOptions();
  drawCandidates();
  bindEvents();
  prepareVoice();
  setCatMood("playful");
}

function bindEvents() {
  catButton.addEventListener("click", () => {
    drawCandidates();
    animateExcited();
    setCatMood("playful");
    updateSpeech("我已经帮你抽好 3 句啦，挑一句最顺口的吧。");
  });

  drawButton.addEventListener("click", () => {
    drawCandidates();
    animateExcited();
    setCatMood("playful");
    updateSpeech("换一组新的看看。");
  });

  phraseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = customPhraseInput.value.trim();
    const mood = customMoodInput.value;

    if (!text) {
      updateSpeech("先写一句你自己的开场白吧。");
      return;
    }

    if (allPhrases().some((item) => item.text === text)) {
      updateSpeech("这句已经在情话库里啦。");
      return;
    }

    state.customPhrases.unshift({ id: createId(), text, mood });
    persistCustomPhrases();
    customPhraseInput.value = "";
    customMoodInput.value = "soft";
    drawCandidates();
    setCatMood(mood);
    updateSpeech("这句已经存进情话库里啦。");
  });

  catForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = catFileInput.files?.[0];

    if (!file) {
      updateSpeech("先选一张图片，我再帮你存成新的形象。");
      return;
    }

    if (!file.type.startsWith("image/") && !file.name.toLowerCase().endsWith(".gif")) {
      updateSpeech("这次上传的不是图片格式，换一张试试。");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const id = createAssetId();
      state.catAssets.unshift({ id, dataUrl });
      state.selectedCatAssetId = id;
      persistCatAssets();
      persistSelectedCatAssetId();
      renderCatAssets();
      applySelectedCatImage();
      catFileInput.value = "";
      updateSpeech("新的形象素材已经保存好啦。");
    } catch {
      updateSpeech("这张图片暂时没有读进来，换一张再试试。");
    }
  });

  voicePresetSelect.addEventListener("change", () => {
    state.selectedVoiceKey = voicePresetSelect.value;
    persistVoiceSelection();
    applyVoiceSelection();
    updateSpeech("猫猫的声音已经切换好了。");
  });

  drawerToggle.addEventListener("click", toggleDrawer);
  drawerCloseButton.addEventListener("click", closeDrawer);

  window.speechSynthesis?.addEventListener?.("voiceschanged", prepareVoice);
}

function drawCandidates() {
  const grouped = groupByMood(allPhrases());
  const picks = [];

  ["soft", "playful", "bold"].forEach((mood) => {
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

  state.currentCandidates.forEach((phrase) => {
    const fragment = candidateTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".candidate-bubble");
    const textNode = fragment.querySelector(".candidate-text");

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

function renderCatAssets() {
  catAssetList.innerHTML = "";
  catAssetCount.textContent = `${state.catAssets.length} 个`;

  if (!state.catAssets.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "还没有新增形象，上传一张你喜欢的图片吧。";
    catAssetList.appendChild(empty);
    return;
  }

  state.catAssets.forEach((asset) => {
    const fragment = catAssetTemplate.content.cloneNode(true);
    const previewNode = fragment.querySelector(".asset-preview");
    const deleteButton = fragment.querySelector(".delete-btn");
    const wrapper = fragment.querySelector(".saved-item");

    previewNode.src = asset.dataUrl;
    if (asset.id === state.selectedCatAssetId) {
      wrapper.classList.add("is-selected");
    }

    wrapper.addEventListener("click", () => {
      state.selectedCatAssetId = asset.id;
      persistSelectedCatAssetId();
      applySelectedCatImage();
      renderCatAssets();
      updateSpeech("这套形象已经切换好了。");
    });

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      state.catAssets = state.catAssets.filter((item) => item.id !== asset.id);
      if (state.selectedCatAssetId === asset.id) {
        state.selectedCatAssetId = state.catAssets[0]?.id || "";
      }
      persistCatAssets();
      persistSelectedCatAssetId();
      renderCatAssets();
      applySelectedCatImage();
      updateSpeech("这套形象已经删除。");
    });

    catAssetList.appendChild(fragment);
  });
}

function speakPhrase(phrase) {
  stopSpeaking();
  updateSpeech(phrase.text);
  animateExcited();
  setCatMood(phrase.mood);

  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    updateSpeech(`${phrase.text}（当前浏览器不支持语音播放。）`);
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
    updateSpeech(`${phrase.text}（语音这次没有成功播出来。）`);
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  catButton.classList.remove("is-speaking");
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function updateSpeech(text) {
  speechText.textContent = text;
  speechBubble.classList.remove("is-speaking");
  void speechBubble.offsetWidth;
  speechBubble.classList.add("is-speaking");
}

function setCatMood(mood) {
  const meta = moodMeta[mood] ?? moodMeta.playful;
  moodPill.textContent = meta.stageLabel;
  applySelectedCatImage(meta.image);
}

function applySelectedCatImage(fallbackImage = moodMeta.playful.image) {
  const selectedAsset = state.catAssets.find((item) => item.id === state.selectedCatAssetId);
  catImage.src = selectedAsset?.dataUrl || fallbackImage;
}

function animateExcited() {
  catButton.classList.remove("is-excited");
  void catButton.offsetWidth;
  catButton.classList.add("is-excited");
  window.setTimeout(() => catButton.classList.remove("is-excited"), 1400);
}

function toggleDrawer() {
  const isOpen = settingsDrawer.classList.toggle("is-open");
  drawerToggle.setAttribute("aria-expanded", String(isOpen));
  drawerToggle.textContent = isOpen ? "收起设置" : "打开设置";
}

function closeDrawer() {
  settingsDrawer.classList.remove("is-open");
  drawerToggle.setAttribute("aria-expanded", "false");
  drawerToggle.textContent = "打开设置";
}

function prepareVoice() {
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "当前浏览器不支持 TTS";
    return;
  }

  applyVoiceSelection(window.speechSynthesis.getVoices());
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
    voiceStatus.textContent = "未检测到系统语音";
    return;
  }

  state.voice =
    pool.find((voice) => /xiaoxiao|xiaoyi|huihui|female|woman|girl/i.test(voice.name)) ||
    pool.find((voice) => voice.lang.toLowerCase().includes("zh") && !/male|man/i.test(voice.name)) ||
    pool[0];

  voicePresetSelect.value = state.selectedVoiceKey;
  voicePresetHint.textContent = currentVoicePreset().hint;
  voiceStatus.textContent = `当前基底语音：${state.voice.name}`;
  persistVoiceSelection();
}

function allPhrases() {
  return [
    ...builtinPhrases.map((item, index) => ({ ...item, id: `builtin-${index}` })),
    ...state.customPhrases
  ];
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

function createAssetId() {
  return `asset-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function currentVoicePreset() {
  return voicePresets.find((preset) => preset.id === state.selectedVoiceKey) || voicePresets[2];
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
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.dataUrl === "string") : [];
  } catch {
    return [];
  }
}

function persistCatAssets() {
  window.localStorage.setItem(CAT_ASSET_KEY, JSON.stringify(state.catAssets));
}

function loadSelectedCatAssetId() {
  return window.localStorage.getItem(SELECTED_CAT_ASSET_KEY) || "";
}

function persistSelectedCatAssetId() {
  window.localStorage.setItem(SELECTED_CAT_ASSET_KEY, state.selectedCatAssetId || "");
}

function loadVoiceSelection() {
  return window.localStorage.getItem(VOICE_KEY) || "host";
}

function persistVoiceSelection() {
  window.localStorage.setItem(VOICE_KEY, state.selectedVoiceKey || "");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
