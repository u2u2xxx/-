const STORAGE_KEY = "sayhi-custom-phrases-v3";
const CAT_ASSET_KEY = "sayhi-character-assets-v3";
const SELECTED_CAT_ASSET_KEY = "sayhi-selected-character-asset-v1";
const VOICE_KEY = "sayhi-voice-selection-v4";

const voicePresets = [
  { id: "loli", label: "萝莉音", hint: "轻甜元气，适合软萌开场。", rate: 0.96, pitch: 1.44, volume: 1 },
  { id: "boss", label: "霸总音", hint: "低稳直给，适合强势一点的出场。", rate: 0.92, pitch: 0.84, volume: 1 },
  { id: "wukong", label: "猴哥音", hint: "灵动冲劲，适合带点玩笑感。", rate: 1.06, pitch: 1.16, volume: 1 },
  { id: "host", label: "主持音", hint: "大方清楚，像有人替你稳稳开场。", rate: 0.98, pitch: 1.03, volume: 1 },
  { id: "yujie", label: "御姐音", hint: "成熟利落，适合松弛自信的问候。", rate: 0.95, pitch: 1.08, volume: 1 },
  { id: "dongbei", label: "东北音", hint: "热闹外放，适合幽默打招呼。", rate: 1.03, pitch: 1.02, volume: 1 },
  { id: "guangxi", label: "广西老表音", hint: "亲切带梗，适合轻松破冰。", rate: 0.99, pitch: 1.05, volume: 1 },
  { id: "gangpu", label: "港普音", hint: "俏皮又有辨识度，适合趣味开场。", rate: 1, pitch: 1.12, volume: 1 }
];

const builtinCharacterAssets = [
  { id: "builtin-labubu-01", name: "Labubu 橘子兔", src: "./assets/labubu-01.gif" },
  { id: "builtin-labubu-02", name: "Labubu 草莓兔", src: "./assets/labubu-02.gif" },
  { id: "builtin-minion-01", name: "小黄人惊讶", src: "./assets/minion-01.gif" },
  { id: "builtin-minion-02", name: "小黄人酷脸", src: "./assets/minion-02.webp" },
  { id: "builtin-cinnamoroll-01", name: "玉桂狗爱心", src: "./assets/cinnamoroll-01.gif" },
  { id: "builtin-cinnamoroll-02", name: "玉桂狗星星", src: "./assets/cinnamoroll-02.gif" },
  { id: "builtin-kuromi-01", name: "库洛米闪亮", src: "./assets/kuromi-01.gif" },
  { id: "builtin-kuromi-02", name: "库洛米心动", src: "./assets/kuromi-02.gif" },
  { id: "builtin-mickey-01", name: "米老鼠墨镜", src: "./assets/mickey-01.gif" },
  { id: "builtin-mickey-02", name: "米老鼠大笑", src: "./assets/mickey-02.webp" },
  { id: "builtin-dayanji-01", name: "大湾鸡双人舞", src: "./assets/dayanji-01.gif" },
  { id: "builtin-dayanji-02", name: "大湾鸡巡场", src: "./assets/dayanji-02.webp" }
];

const moodMeta = {
  soft: { stageLabel: "当前状态：温柔打招呼", image: "./assets/labubu-01.gif" },
  playful: { stageLabel: "当前状态：轻松破冰中", image: "./assets/minion-01.gif" },
  bold: { stageLabel: "当前状态：主动出击中", image: "./assets/kuromi-02.gif" }
};

const builtinPhrases = [
  { text: "你好！我正在做一个小调查：你觉得在地铁站搭讪奇怪吗？", mood: "playful" },
  { text: "你好，我正要去做一件疯狂的事，和陌生人聊天。", mood: "playful" },
  { text: "请问你知道现在几点了吗？没错，是适合认识一下的时刻。", mood: "soft" },
  { text: "嘿，我觉得你看起来很面善，我们是不是见过？", mood: "playful" },
  { text: "嗨，你的气质很特别，忍不住想认识一下。", mood: "soft" },
  { text: "嘿，你的穿搭很有风格，忍不住想过来夸一下。", mood: "soft" },
  { text: "嗨，我刚在那边看到你笑，觉得整个世界都亮了。", mood: "soft" },
  { text: "你好！我正在收集城市里最有趣的人的故事。", mood: "playful" },
  { text: "你好，我和朋友打赌说我敢来和你聊天，能帮我赢吗？", mood: "playful" },
  { text: "嗨，我刚才在那边看到你，觉得如果不过来打个招呼可能会后悔一整天。", mood: "bold" },
  { text: "你好，我路过的时候看到你，突然觉得今天值得认真一点。", mood: "soft" },
  { text: "嗨，冒昧打扰一下，我只是想说你给人的感觉很舒服。", mood: "soft" },
  { text: "你好，我本来准备直接走过去，但还是觉得应该来打个招呼。", mood: "soft" },
  { text: "嘿，你看起来像会把无聊聊天也变得有意思的人。", mood: "playful" },
  { text: "嗨，如果今天适合认识一个新朋友，我觉得应该就是现在。", mood: "soft" },
  { text: "你好，我想了半天开场白，最后还是觉得直接打招呼最真诚。", mood: "soft" },
  { text: "嘿，我刚刚经过的时候就在想，不打招呼是不是有点可惜。", mood: "bold" },
  { text: "你好，你的状态看起来特别好，连我都被感染到了。", mood: "soft" },
  { text: "嗨，我通常没这么主动，但你让我想破个例。", mood: "bold" },
  { text: "你好，想认识你这件事，我刚刚已经在心里排练两遍了。", mood: "playful" },
  { text: "嘿，我感觉你应该是那种很会聊天的人，要不要验证一下？", mood: "playful" },
  { text: "你好，我想先和你打个招呼，再决定今天是不是幸运的一天。", mood: "soft" },
  { text: "嗨，你给人的第一感觉很加分，所以我决定过来认识一下。", mood: "bold" },
  { text: "你好，如果我的出现有点突然，那就当我在认真执行社交计划。", mood: "playful" },
  { text: "嘿，我刚给自己下了个任务：遇到想认识的人就别犹豫。", mood: "bold" },
  { text: "你好，我想借一个开场机会，换一个认识你的可能。", mood: "soft" },
  { text: "嗨，我发现你很容易让人注意到，所以我决定不装作没看见。", mood: "bold" },
  { text: "你好，我本来只想安静路过，但你的存在感实在太强了。", mood: "playful" },
  { text: "嘿，先别紧张，我只是想和今天最有眼缘的人打个招呼。", mood: "playful" },
  { text: "嗨，如果我现在来认识你，算不算今天一个不错的决定？", mood: "bold" }
];

const state = {
  customPhrases: loadCustomPhrases(),
  characterAssets: loadCharacterAssets(),
  selectedCharacterAssetId: loadSelectedCharacterAssetId(),
  currentCandidates: [],
  activePhraseId: "",
  voice: null,
  selectedVoiceKey: loadVoiceSelection()
};

const catButton = document.querySelector("#catButton");
const catImage = document.querySelector("#catImage");
const drawButton = document.querySelector("#drawButton");
const candidateList = document.querySelector("#candidateList");
const speechText = document.querySelector("#speechText");
const speechBubble = document.querySelector("#speechBubble");
const readingText = document.querySelector("#readingText");
const phraseForm = document.querySelector("#phraseForm");
const catForm = document.querySelector("#catForm");
const customPhraseInput = document.querySelector("#customPhrase");
const customMoodInput = document.querySelector("#customMood");
const catFileInput = document.querySelector("#catFile");
const characterAssetList = document.querySelector("#catAssetList");
const characterAssetCount = document.querySelector("#catAssetCount");
const voicePresetSelect = document.querySelector("#voicePresetSelect");
const voicePresetHint = document.querySelector("#voicePresetHint");
const voiceStatus = document.querySelector("#voiceStatus");
const settingsDrawer = document.querySelector("#settingsDrawer");
const drawerToggle = document.querySelector("#drawerToggle");
const drawerCloseButton = document.querySelector("#drawerCloseButton");
const drawerScrim = document.querySelector("#drawerScrim");
const candidateTemplate = document.querySelector("#candidateTemplate");
const characterAssetTemplate = document.querySelector("#catAssetTemplate");
const floatingActions = document.querySelector(".floating-actions");

let readingTimer = null;

init();

function init() {
  renderCharacterAssets();
  renderVoicePresetOptions();
  drawCandidates();
  bindEvents();
  prepareVoice();
  if (!state.selectedCharacterAssetId) {
    state.selectedCharacterAssetId = builtinCharacterAssets[0].id;
    persistSelectedCharacterAssetId();
  }
  setCharacterMood("playful");
}

function bindEvents() {
  catButton.addEventListener("click", () => {
    drawCandidates();
    animateExcited();
    setCharacterMood("playful");
    updateSpeech("我给你换了 3 句新的开场白。");
  });

  drawButton.addEventListener("click", () => {
    drawCandidates();
    animateExcited();
    setCharacterMood("playful");
    updateSpeech("这组不够喜欢的话，我们再换一组。");
  });

  phraseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = customPhraseInput.value.trim();
    const mood = customMoodInput.value;

    if (!text) {
      updateSpeech("先写一句你自己的打招呼方式吧。");
      return;
    }

    if (allPhrases().some((item) => item.text === text)) {
      updateSpeech("这句已经在打招呼库里啦。");
      return;
    }

    state.customPhrases.unshift({ id: createId(), text, mood });
    persistCustomPhrases();
    customPhraseInput.value = "";
    customMoodInput.value = "soft";
    drawCandidates();
    setCharacterMood(mood);
    updateSpeech("这句已经加入你的打招呼库。");
  });

  catForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = catFileInput.files?.[0];

    if (!file) {
      updateSpeech("先选一张形象图，我再帮你存进去。");
      return;
    }

    if (!file.type.startsWith("image/") && !file.name.toLowerCase().endsWith(".gif")) {
      updateSpeech("这次上传的不是图片格式，换一张试试。");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const id = createAssetId();
      state.characterAssets.unshift({ id, name: file.name.replace(/\.[^.]+$/, ""), dataUrl });
      state.selectedCharacterAssetId = id;
      persistCharacterAssets();
      persistSelectedCharacterAssetId();
      renderCharacterAssets();
      applySelectedCharacterImage();
      catFileInput.value = "";
      updateSpeech("新的形象素材已经保存好了。");
    } catch {
      updateSpeech("这张图片暂时没读进来，换一张再试试。");
    }
  });

  voicePresetSelect.addEventListener("change", () => {
    state.selectedVoiceKey = voicePresetSelect.value;
    persistVoiceSelection();
    applyVoiceSelection();
    updateSpeech("音色已经切换好了。");
  });

  drawerToggle.addEventListener("click", openDrawer);
  drawerCloseButton.addEventListener("click", closeDrawer);
  drawerScrim.addEventListener("click", closeDrawer);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });

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

function renderCharacterAssets() {
  characterAssetList.innerHTML = "";
  const assets = allCharacterAssets();
  characterAssetCount.textContent = `${assets.length} 个`;

  if (!assets.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "还没有新的形象素材，上传一张你喜欢的图吧。";
    characterAssetList.appendChild(empty);
    return;
  }

  assets.forEach((asset) => {
    const fragment = characterAssetTemplate.content.cloneNode(true);
    const previewNode = fragment.querySelector(".asset-preview");
    const nameNode = fragment.querySelector(".asset-name");
    const deleteButton = fragment.querySelector(".delete-btn");
    const wrapper = fragment.querySelector(".saved-item");

    previewNode.src = asset.dataUrl || asset.src;
    nameNode.textContent = asset.name;
    if (asset.id === state.selectedCharacterAssetId) {
      wrapper.classList.add("is-selected");
    }

    wrapper.addEventListener("click", () => {
      state.selectedCharacterAssetId = asset.id;
      persistSelectedCharacterAssetId();
      applySelectedCharacterImage();
      renderCharacterAssets();
      updateSpeech("这套形象已经切换好了。");
    });

    if (asset.builtin) {
      deleteButton.hidden = true;
    } else {
      deleteButton.hidden = false;
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        state.characterAssets = state.characterAssets.filter((item) => item.id !== asset.id);
        if (state.selectedCharacterAssetId === asset.id) {
          state.selectedCharacterAssetId = builtinCharacterAssets[0]?.id || "";
        }
        persistCharacterAssets();
        persistSelectedCharacterAssetId();
        renderCharacterAssets();
        applySelectedCharacterImage();
        updateSpeech("这套形象已经删除。");
      });
    }

    characterAssetList.appendChild(fragment);
  });
}

function speakPhrase(phrase) {
  stopSpeaking();
  updateSpeech(phrase.text);
  animateExcited();
  setCharacterMood(phrase.mood);
  setReadingMode(true);
  startReadingTextEffect(phrase.text);

  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    window.setTimeout(() => {
      stopReadingTextEffect();
      setReadingMode(false);
    }, 1800);
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
    stopReadingTextEffect();
    setReadingMode(false);
  };

  utterance.onerror = () => {
    catButton.classList.remove("is-speaking");
    stopReadingTextEffect();
    setReadingMode(false);
    updateSpeech(`${phrase.text}（语音这次没有成功播出来。）`);
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  catButton.classList.remove("is-speaking");
  stopReadingTextEffect();
  setReadingMode(false);
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

function setCharacterMood(mood) {
  const meta = moodMeta[mood] ?? moodMeta.playful;
  applySelectedCharacterImage(meta.image);
}

function applySelectedCharacterImage(fallbackImage = moodMeta.playful.image) {
  const selectedAsset = allCharacterAssets().find((item) => item.id === state.selectedCharacterAssetId);
  catImage.src = selectedAsset?.dataUrl || selectedAsset?.src || fallbackImage;
}

function animateExcited() {
  catButton.classList.remove("is-excited");
  void catButton.offsetWidth;
  catButton.classList.add("is-excited");
  window.setTimeout(() => catButton.classList.remove("is-excited"), 1400);
}

function setReadingMode(isReading) {
  candidateList.classList.toggle("is-hidden", isReading);
  floatingActions.classList.toggle("is-hidden", isReading);
  speechBubble.classList.toggle("is-hidden", isReading);
}

function startReadingTextEffect(text) {
  stopReadingTextEffect();
  const chars = Array.from(text.replace(/\s+/g, ""));
  readingText.innerHTML = "";
  readingText.classList.add("is-visible");

  chars.forEach((char) => {
    const span = document.createElement("span");
    span.className = "reading-char";
    span.textContent = char;
    readingText.appendChild(span);
  });

  const nodes = Array.from(readingText.children);
  let index = 0;
  readingTimer = window.setInterval(() => {
    if (index >= nodes.length) {
      window.clearInterval(readingTimer);
      readingTimer = null;
      return;
    }
    nodes[index].classList.add("is-on");
    index += 1;
  }, 90);
}

function stopReadingTextEffect() {
  if (readingTimer) {
    window.clearInterval(readingTimer);
    readingTimer = null;
  }
  readingText.classList.remove("is-visible");
  readingText.innerHTML = "";
}

function openDrawer() {
  settingsDrawer.classList.add("is-open");
  drawerScrim.hidden = false;
  drawerScrim.classList.add("is-visible");
  drawerToggle.setAttribute("aria-expanded", "true");
}

function closeDrawer() {
  settingsDrawer.classList.remove("is-open");
  drawerScrim.classList.remove("is-visible");
  drawerScrim.hidden = true;
  drawerToggle.setAttribute("aria-expanded", "false");
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
    pool.find((voice) => /xiaoxiao|xiaoyi|huihui|female|woman|girl|xiaomei|xiaoqi/i.test(voice.name)) ||
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

function allCharacterAssets() {
  return [
    ...builtinCharacterAssets.map((item) => ({ ...item, builtin: true })),
    ...state.characterAssets
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
  return voicePresets.find((preset) => preset.id === state.selectedVoiceKey) || voicePresets[3];
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

function loadCharacterAssets() {
  try {
    const raw = window.localStorage.getItem(CAT_ASSET_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .filter((item) => item && typeof item.dataUrl === "string")
          .map((item) => ({
            id: item.id || createAssetId(),
            name: item.name || "我的形象",
            dataUrl: item.dataUrl
          }))
      : [];
  } catch {
    return [];
  }
}

function persistCharacterAssets() {
  window.localStorage.setItem(CAT_ASSET_KEY, JSON.stringify(state.characterAssets));
}

function loadSelectedCharacterAssetId() {
  return window.localStorage.getItem(SELECTED_CAT_ASSET_KEY) || "";
}

function persistSelectedCharacterAssetId() {
  window.localStorage.setItem(SELECTED_CAT_ASSET_KEY, state.selectedCharacterAssetId || "");
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
