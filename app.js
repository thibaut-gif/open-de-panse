const STORAGE_KEY = "open-de-panse-mvp-state-v3";
const AUTH_KEY = "open-de-panse-auth-v1";
const ROLE_KEY = "open-de-panse-role-v1";
const PLAYER_KEY = "open-de-panse-player-v1";
const PARTICIPANT_PASSWORD = "panse2026";
const ADMIN_PASSWORD = "panseadmin2026";
const CLIENT_ID_KEY = "open-de-panse-client-id-v1";
const SUPABASE_URL = "https://pvqzyysapstdozequtkw.supabase.co";
const SUPABASE_KEY = "sb_publishable_w7E0RSqEulwTpKLAwyjBow_J1wKlt2a";
const SUPABASE_STATE_ID = "open-de-panse-2026";
const SYNC_POLL_MS = 2500;
const LOGO_SRC = "open-de-panse-logo.png?v=5";
const LOGO_FALLBACK_SRC = "assets/open-de-panse-logo.png?v=5";

const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M5 5H3v2a4 4 0 0 0 4 4"/><path d="M19 5h2v2a4 4 0 0 1-4 4"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  groups: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/></svg>',
};

const playersSeed = [
  ["p1", "Juju", 13],
  ["p2", "Thib", 10],
  ["p3", "Goulu", 20],
  ["p4", "Gege", 20],
  ["p5", "Nanou", 21],
  ["p6", "Pierrot", 29],
  ["p7", "Lutcho", 24],
  ["p8", "Nonoz", 28],
  ["p9", "Ben", 23],
  ["p10", "Manu", 42],
  ["p11", "La Roquette", 32],
  ["p12", "Greg'z", 16],
].map(([id, name, handicap]) => ({ id, name, handicap, initialHandicap: handicap }));

const playerPasswords = {
  p1: "juju2026",
  p2: "thib2026",
  p3: "goulu2026",
  p4: "gege2026",
  p5: "nanou2026",
  p6: "pierrot2026",
  p7: "lutcho2026",
  p8: "nonoz2026",
  p9: "ben2026",
  p10: "manu2026",
  p11: "laroquette2026",
  p12: "gregz2026",
};

const previousSeedHandicaps = {
  p4: 38,
  p6: 47,
  p9: 26,
  p10: 41,
  p11: 33,
};

function normalizePlayers(players) {
  return (players || playersSeed).map((player) => {
    const seed = playersSeed.find((item) => item.id === player.id || item.name === player.name);
    const initialHandicap = seed?.initialHandicap ?? player.initialHandicap ?? player.handicap;
    const savedHandicap = Number(player.handicap);
    const previousSeed = previousSeedHandicaps[player.id];
    const handicap = previousSeed !== undefined && savedHandicap === previousSeed ? seed.handicap : savedHandicap;
    return {
      ...player,
      handicap: Number.isNaN(handicap) ? Number(initialHandicap) : handicap,
      initialHandicap: Number(initialHandicap),
    };
  });
}

function makeHoles(pars, sis) {
  return pars.map((par, index) => ({ number: index + 1, par, strokeIndex: sis[index] }));
}

const coursesSeed = [
  {
    id: "castelconturbia",
    club: "Golf Club Castelconturbia",
    name: "Yellow puis Blue Championship",
    location: "Agrate Conturbia, Piemonte",
    note: "Composition 18 trous : 1-9 Yellow Course - Pini puis 10-18 Blue Course - Castagni. Format championship par 72.",
    tees: [
      { id: "white", label: "Blanc", sourceLabel: "White", rating: 73.2, slope: 145, distance: 6230, par: 72 },
      { id: "yellow", label: "Jaune", sourceLabel: "Yellow", rating: 71.5, slope: 142, distance: 5885, par: 72 },
    ],
    holes: makeHoles(
      [5, 3, 5, 4, 5, 3, 4, 3, 4, 5, 3, 4, 3, 4, 4, 4, 5, 4],
      [17, 13, 11, 1, 7, 9, 3, 5, 15, 12, 18, 2, 16, 10, 6, 8, 14, 4],
    ),
  },
  {
    id: "bogogno-bonora",
    club: "Circolo Golf Bogogno",
    name: "Bonora",
    location: "Bogogno, Piemonte",
    note: "Données MVP issues de cartes publiques à revérifier avant usage officiel.",
    tees: [
      { id: "white", label: "Blanc", sourceLabel: "Blanco", rating: 74.4, slope: 140, distance: 6284, par: 72 },
      { id: "yellow", label: "Jaune", sourceLabel: "Giallo", rating: 72.5, slope: 136, distance: 5880, par: 72 },
    ],
    holes: makeHoles([5, 3, 5, 4, 3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 4, 3, 5, 4], [7, 17, 13, 1, 5, 11, 9, 3, 15, 4, 14, 6, 8, 16, 12, 18, 10, 2]),
  },
  {
    id: "bogogno-del-conte",
    club: "Circolo Golf Bogogno",
    name: "Del Conte",
    location: "Bogogno, Piemonte",
    note: "Données MVP issues de cartes publiques à revérifier avant usage officiel.",
    tees: [
      { id: "white", label: "Blanc", sourceLabel: "Blanco", rating: 73.1, slope: 131, distance: 6206, par: 72 },
      { id: "yellow", label: "Jaune", sourceLabel: "Giallo", rating: 71.0, slope: 127, distance: 5755, par: 72 },
    ],
    holes: makeHoles([4, 3, 5, 4, 3, 4, 4, 5, 4, 4, 3, 5, 3, 5, 5, 3, 4, 4], [13, 17, 11, 15, 7, 3, 5, 9, 1, 6, 14, 16, 10, 8, 12, 18, 4, 2]),
  },
  {
    id: "le-robinie",
    club: "Le Robinie Golf Club",
    name: "Le Robinie",
    location: "Solbiate Olona, Lombardia",
    note: "Données MVP issues de cartes publiques à revérifier avant usage officiel.",
    tees: [
      { id: "white", label: "Championship", sourceLabel: "Championship", rating: 73.7, slope: 130, distance: 6520, par: 72 },
      { id: "yellow", label: "Regular", sourceLabel: "Regular", rating: 71.7, slope: 125, distance: 6168, par: 72 },
    ],
    holes: makeHoles([4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 3, 4, 5, 4, 4, 3, 5, 4], [9, 13, 15, 3, 17, 7, 1, 11, 5, 16, 18, 2, 10, 8, 6, 14, 12, 4]),
  },
];

const roundsSeed = [
  { id: "r1", number: 1, date: "Mercredi 3 juin 2026", time: "", courseId: "castelconturbia", status: "à venir" },
  { id: "r2", number: 2, date: "Jeudi 4 juin 2026", time: "matin", courseId: "bogogno-del-conte", status: "à venir" },
  { id: "r3", number: 3, date: "Jeudi 4 juin 2026", time: "après-midi", courseId: "bogogno-bonora", status: "à venir" },
  { id: "r4", number: 4, date: "Vendredi 5 juin 2026", time: "", courseId: "le-robinie", status: "à venir" },
];

const palmaresSeed = [
  { year: 2009, greenJacket: "Lucho", woodenSpoon: "Gregzm" },
  { year: 2010, greenJacket: "Goulu", woodenSpoon: "Manioulz" },
  { year: 2011, greenJacket: "Gregzm", woodenSpoon: "Mitch" },
  { year: 2012, greenJacket: "Lucho", woodenSpoon: "Manioulz" },
  { year: 2013, greenJacket: "Nanouz", woodenSpoon: "Benouz" },
  { year: 2014, greenJacket: "Thibz", woodenSpoon: "Manioulz" },
  { year: 2015, greenJacket: "Nanouz", woodenSpoon: "Manioulz" },
  { year: 2016, greenJacket: "Gégé", woodenSpoon: "Mitch" },
  { year: 2017, greenJacket: "Goulu", woodenSpoon: "Benouz" },
  { year: 2018, greenJacket: "Juju", woodenSpoon: "La Roquette" },
  { year: 2019, greenJacket: "Nonoz", woodenSpoon: "Juju" },
  { year: 2020, greenJacket: "La Roquette", woodenSpoon: "Nonoz" },
  { year: 2021, greenJacket: "Nonoz", woodenSpoon: "Pierrot" },
  { year: 2022, greenJacket: "Pierrot", woodenSpoon: "Goulu" },
  { year: 2023, greenJacket: "Thib", woodenSpoon: "Manioulz" },
  { year: 2024, greenJacket: "Thib", woodenSpoon: "Greg'z" },
  { year: 2025, greenJacket: "Ben", woodenSpoon: "Thib" },
];

let state = loadState();
let isAuthenticated = localStorage.getItem(AUTH_KEY) === "ok";
let currentRole = localStorage.getItem(ROLE_KEY) || "participant";
let currentPlayerId = localStorage.getItem(PLAYER_KEY) || "";
let remoteReady = false;
let isApplyingRemote = false;
let syncTimer = null;
let remotePollTimer = null;
let remoteLastSeenAt = 0;
const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
const clientId = getClientId();

if (new URLSearchParams(window.location.search).has("reset")) {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(ROLE_KEY);
  window.location.replace(window.location.pathname);
}

function logoAttrs() {
  return `src="${LOGO_SRC}" onerror="this.onerror=null;this.src='${LOGO_FALLBACK_SRC}'"`;
}

function getClientId() {
  const saved = localStorage.getItem(CLIENT_ID_KEY);
  if (saved) return saved;
  const next = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  localStorage.setItem(CLIENT_ID_KEY, next);
  return next;
}

function renderPreservingPosition() {
  const y = window.scrollY;
  const grid = document.querySelector(".score-grid-wrap");
  const gridTop = grid?.scrollTop ?? 0;
  const gridLeft = grid?.scrollLeft ?? 0;
  render();
  requestAnimationFrame(() => {
    window.scrollTo(0, y);
    const nextGrid = document.querySelector(".score-grid-wrap");
    if (nextGrid) {
      nextGrid.scrollTop = gridTop;
      nextGrid.scrollLeft = gridLeft;
    }
  });
}

function createInitialState() {
  return {
    activeView: "home",
    selectedRoundId: "r1",
    selectedGroupId: "",
    selectedPlayerId: "p1",
    homePreviewRoundId: "",
    activeScoreCell: null,
    activeMobileHole: 1,
    seenNotificationCount: 0,
    showPositionRace: false,
    anonymizeParticipantLeaderboards: true,
    rounds: roundsSeed,
    courses: coursesSeed,
    players: normalizePlayers(playersSeed),
    groups: createInitialGroups(),
    scores: {},
    putts: {},
    validatedHoles: {},
    notifications: [],
    validatedRounds: {},
  };
}

function createInitialGroups() {
  return Object.fromEntries(roundsSeed.map((round) => [round.id, []]));
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createInitialState();
    const parsed = JSON.parse(saved);
    const nextState = { ...createInitialState(), ...parsed };
    nextState.rounds = roundsSeed;
    nextState.courses = coursesSeed;
    nextState.players = normalizePlayers(nextState.players);
    return nextState;
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleRemoteSave();
}

function saveLocalOnly() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function publicState() {
  return {
    syncUpdatedAt: Date.now(),
    syncClientId: clientId,
    rounds: state.rounds,
    courses: state.courses,
    players: state.players,
    groups: state.groups,
    scores: state.scores,
    putts: state.putts,
    validatedHoles: state.validatedHoles,
    notifications: state.notifications,
    validatedRounds: state.validatedRounds,
    anonymizeParticipantLeaderboards: state.anonymizeParticipantLeaderboards,
  };
}

function applyRemoteState(data) {
  if (!data || typeof data !== "object") return;
  const incomingUpdatedAt = Number(data.syncUpdatedAt || 0);
  if (incomingUpdatedAt && incomingUpdatedAt <= remoteLastSeenAt) return;
  if (incomingUpdatedAt) remoteLastSeenAt = incomingUpdatedAt;
  isApplyingRemote = true;
  state = {
    ...state,
    ...data,
    activeView: state.activeView,
    selectedRoundId: state.selectedRoundId,
    selectedGroupId: state.selectedGroupId,
    selectedPlayerId: state.selectedPlayerId,
    homePreviewRoundId: state.homePreviewRoundId,
    activeScoreCell: state.activeScoreCell,
    activeMobileHole: state.activeMobileHole,
    showPositionRace: state.showPositionRace,
    seenNotificationCount: state.seenNotificationCount,
  };
  state.rounds = roundsSeed;
  state.courses = coursesSeed;
  state.players = normalizePlayers(state.players);
  remoteReady = true;
  saveLocalOnly();
  isApplyingRemote = false;
  render();
}

function scheduleRemoteSave() {
  if (!supabaseClient || isApplyingRemote || !isAuthenticated) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(saveRemoteState, 450);
}

async function saveRemoteState() {
  if (!supabaseClient || isApplyingRemote || !isAuthenticated) return;
  const payload = publicState();
  remoteLastSeenAt = payload.syncUpdatedAt;
  const { error } = await supabaseClient
    .from("app_state")
    .upsert({ id: SUPABASE_STATE_ID, data: payload });
  if (error) {
    const wasRemoteReady = remoteReady;
    remoteReady = false;
    console.warn("Supabase save failed", error);
    if (wasRemoteReady) render();
    return;
  }
  const wasRemoteReady = remoteReady;
  remoteReady = true;
  if (!wasRemoteReady) render();
}

async function loadRemoteState() {
  if (!supabaseClient || !isAuthenticated) return;
  const { data, error } = await supabaseClient
    .from("app_state")
    .select("data")
    .eq("id", SUPABASE_STATE_ID)
    .single();
  if (error) {
    const wasRemoteReady = remoteReady;
    remoteReady = false;
    console.warn("Supabase load failed", error);
    if (wasRemoteReady) render();
    return;
  }
  if (data?.data && Object.keys(data.data).length) {
    applyRemoteState(data.data);
  } else {
    await saveRemoteState();
  }
  remoteReady = true;
}

function subscribeRemoteState() {
  if (!supabaseClient || !isAuthenticated) return;
  supabaseClient
    .channel("open-de-panse-state")
    .on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "app_state",
      filter: `id=eq.${SUPABASE_STATE_ID}`,
    }, (payload) => {
      if (payload.new?.data) applyRemoteState(payload.new.data);
    })
    .subscribe();
}

function startRemotePolling() {
  if (!supabaseClient || !isAuthenticated) return;
  clearInterval(remotePollTimer);
  remotePollTimer = setInterval(loadRemoteState, SYNC_POLL_MS);
}

function courseForRound(roundId) {
  const round = state.rounds.find((item) => item.id === roundId);
  return state.courses.find((course) => course.id === round.courseId);
}

function selectedRound() {
  return state.rounds.find((round) => round.id === state.selectedRoundId);
}

function roundOrdinalLabel(roundNumber) {
  const labels = ["Premier", "Deuxième", "Troisième", "Quatrième"];
  return labels[roundNumber - 1] || `Tour ${roundNumber}`;
}

function selectedRoundTitle() {
  const round = selectedRound() || state.rounds[0];
  return `${roundOrdinalLabel(round.number)} tour`;
}

function augustaRounds() {
  const round = selectedRound() || state.rounds[0];
  return state.rounds.filter((item) => item.number <= round.number);
}

function selectedPlayer() {
  return state.players.find((player) => player.id === state.selectedPlayerId);
}

function roundScoreKey(roundId, playerId, holeNumber) {
  return `${roundId}:${playerId}:${holeNumber}`;
}

function puttKey(roundId, playerId, holeNumber) {
  return `${roundId}:${playerId}:${holeNumber}`;
}

function roundHalfUp(value) {
  return Math.floor(value + 0.5);
}

function recommendTee(player, course) {
  const white = course.tees.find((tee) => tee.id === "white") || course.tees[0];
  if (player.handicap <= 10 && white.slope <= 136) return "white";
  if (player.handicap <= 8) return "white";
  return "yellow";
}

function teeForPlayer(player, course) {
  const teeId = recommendTee(player, course);
  return course.tees.find((tee) => tee.id === teeId) || course.tees[0];
}

function courseHandicap(player, course) {
  const tee = teeForPlayer(player, course);
  return roundHalfUp(player.handicap * tee.slope / 113 + tee.rating - tee.par);
}

function handicapBeforeRound(player, roundId) {
  let current = player.initialHandicap ?? player.handicap;
  for (const round of state.rounds) {
    if (round.id === roundId) return current;
    const stats = playerRoundStatsFromHandicap(player, round.id, current);
    if (state.validatedRounds[round.id] && stats.handicapAfter !== null) current = stats.handicapAfter;
  }
  return current;
}

function strokesOnHole(courseHandicapValue, strokeIndex) {
  if (courseHandicapValue === 0) return 0;
  if (courseHandicapValue > 0) {
    const base = Math.floor(courseHandicapValue / 18);
    const extra = courseHandicapValue % 18;
    return base + (strokeIndex <= extra ? 1 : 0);
  }
  const abs = Math.abs(courseHandicapValue);
  const base = Math.floor(abs / 18);
  const extra = abs % 18;
  const hardestFromBack = 19 - strokeIndex;
  return -(base + (hardestFromBack <= extra ? 1 : 0));
}

function stablefordPoints(par, gross, strokes) {
  if (!gross || gross < 1) return null;
  const net = gross - strokes;
  return Math.max(0, 2 + par - net);
}

function roundHandicapDown(value) {
  return Math.floor(value * 10) / 10;
}

function handicapAfterStableford(handicap, points) {
  if (points > 36) return handicap - ((points - 36) * 0.5);
  if (points < 36) return handicap + ((36 - points) * 0.25);
  return handicap;
}

function underParType(par, gross) {
  if (!gross || gross >= par) return null;
  const diff = par - gross;
  if (diff === 1) return "birdie";
  if (diff === 2) return "eagle";
  if (diff === 3) return "albatros";
  return "exceptionnel";
}

function getGross(roundId, playerId, holeNumber) {
  return state.scores[roundScoreKey(roundId, playerId, holeNumber)] || "";
}

function getPutts(roundId, playerId, holeNumber) {
  return state.putts?.[puttKey(roundId, playerId, holeNumber)] || "";
}

function setPutts(roundId, playerId, holeNumber, value) {
  if (!state.putts) state.putts = {};
  const key = puttKey(roundId, playerId, holeNumber);
  const nextValue = Number(value);
  if (!value || Number.isNaN(nextValue) || nextValue < 0) {
    delete state.putts[key];
  } else {
    state.putts[key] = nextValue;
  }
}

function holeValidationKey(roundId, groupId, holeNumber) {
  return `${roundId}:${groupId || "all"}:${holeNumber}`;
}

function isHoleValidated(roundId, groupId, holeNumber) {
  if (!state.validatedHoles) state.validatedHoles = {};
  return Boolean(state.validatedHoles[holeValidationKey(roundId, groupId, holeNumber)]);
}

function setGross(roundId, playerId, holeNumber, value, options = {}) {
  const key = roundScoreKey(roundId, playerId, holeNumber);
  const nextValue = Number(value);
  if (!value || Number.isNaN(nextValue) || nextValue < 1) {
    delete state.scores[key];
  } else {
    state.scores[key] = nextValue;
  }
  if (options.localOnly) {
    saveLocalOnly();
    scheduleRemoteSave();
  } else {
    saveState();
    if (!options.keepFocus) render();
  }
}

function setActiveScoreCell(roundId, playerId, holeNumber, kind = "score") {
  state.activeScoreCell = { roundId, playerId, holeNumber, kind };
  saveLocalOnly();
  renderPreservingPosition();
}

function activeCellMatches(roundId, playerId, holeNumber, kind = "score") {
  const active = state.activeScoreCell;
  return active?.roundId === roundId && active?.playerId === playerId && active?.holeNumber === holeNumber && (active.kind || "score") === kind;
}

function activeGroupPlayers() {
  return state.selectedGroupId ? playersInSelectedGroup() : state.players;
}

function startGroupScoreEntry(roundId, groupId) {
  const group = groupsForRound(roundId).find((item) => item.id === groupId);
  const firstPlayerId = group?.playerIds.find(Boolean);
  const markerId = group?.markerId && group.playerIds.includes(group.markerId) ? group.markerId : firstPlayerId;
  if (group && !group.markerId && markerId) group.markerId = markerId;
  state.selectedGroupId = groupId;
  state.selectedPlayerId = markerId || state.selectedPlayerId;
  state.activeMobileHole = 1;
  state.activeScoreCell = firstPlayerId ? { roundId, playerId: firstPlayerId, holeNumber: 1, kind: "score" } : null;
  state.activeView = "score";
}

function advanceActiveScoreCell() {
  const active = state.activeScoreCell;
  if (!active) return;
  const players = activeGroupPlayers();
  const currentIndex = players.findIndex((player) => player.id === active.playerId);
  const course = courseForRound(active.roundId);
  const kind = active.kind || "score";
  if (currentIndex >= 0 && currentIndex < players.length - 1) {
    state.activeScoreCell = {
      roundId: active.roundId,
      playerId: players[currentIndex + 1].id,
      holeNumber: active.holeNumber,
      kind,
    };
    saveLocalOnly();
    renderPreservingPosition();
    return;
  }
  if (kind === "score" && players[0]) {
    state.activeScoreCell = {
      roundId: active.roundId,
      playerId: players[0].id,
      holeNumber: active.holeNumber,
      kind: "putt",
    };
    saveLocalOnly();
    renderPreservingPosition();
    return;
  }
  if (window.matchMedia("(max-width: 820px)").matches) {
    saveLocalOnly();
    renderPreservingPosition();
    return;
  }
  const validate = document.querySelector(`[data-grid-validate="${active.holeNumber}"]`);
  if (validate) validate.classList.add("pulse-validate");
  const nextHole = course.holes.find((hole) => hole.number > active.holeNumber);
  state.activeScoreCell = nextHole && players[0] ? {
    roundId: active.roundId,
    playerId: players[0].id,
    holeNumber: nextHole.number,
    kind: "score",
  } : null;
  saveLocalOnly();
  renderPreservingPosition();
}

function keypadScore(value) {
  const active = state.activeScoreCell;
  if (!active) return;
  if ((active.kind || "score") === "putt") {
    setPutts(active.roundId, active.playerId, active.holeNumber, value);
    saveLocalOnly();
    scheduleRemoteSave();
  } else {
    setGross(active.roundId, active.playerId, active.holeNumber, value, { localOnly: true });
  }
  advanceActiveScoreCell();
}

function clearActiveScore() {
  const active = state.activeScoreCell;
  if (!active) return;
  if ((active.kind || "score") === "putt") {
    setPutts(active.roundId, active.playerId, active.holeNumber, "");
    saveLocalOnly();
    scheduleRemoteSave();
  } else {
    setGross(active.roundId, active.playerId, active.holeNumber, "", { localOnly: true });
  }
  renderPreservingPosition();
}

function validateHole(roundId, groupId, holeNumber) {
  if (!state.validatedHoles) state.validatedHoles = {};
  state.validatedHoles[holeValidationKey(roundId, groupId, holeNumber)] = true;
  const players = groupId ? playersInGroup(roundId, groupId) : state.players;
  const playerIds = new Set(players.map((player) => player.id));
  state.notifications = state.notifications.filter((item) => !(item.roundId === roundId && item.holeNumber === holeNumber && playerIds.has(item.playerId)));
  players.forEach((player) => {
    const gross = getGross(roundId, player.id, holeNumber);
    if (gross) maybeNotifyUnderPar(roundId, player.id, holeNumber, gross);
  });
  saveState();
  render();
}

function maybeNotifyUnderPar(roundId, playerId, holeNumber, gross) {
  const course = courseForRound(roundId);
  const hole = course.holes.find((item) => item.number === holeNumber);
  const type = underParType(hole.par, gross);
  if (!type) return;
  const existing = state.notifications.some((item) => item.roundId === roundId && item.playerId === playerId && item.holeNumber === holeNumber);
  if (existing) return;
  const player = state.players.find((item) => item.id === playerId);
  const round = state.rounds.find((item) => item.id === roundId);
  const group = groupForPlayer(roundId, playerId);
  state.notifications.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    roundId,
    playerId,
    holeNumber,
    type,
    groupName: group?.name || "Partie non définie",
    message: `Shot pour ${player.name} · ${group?.name || "Partie non définie"} · trou ${holeNumber} · ${labelForUnderPar(type)} brut`,
    detail: `Tour ${round.number} - ${course.name}`,
    createdAt: new Date().toLocaleString("fr-FR"),
  });
}

function labelForUnderPar(type) {
  return {
    birdie: "Birdie",
    eagle: "Eagle",
    albatros: "Albatros",
    exceptionnel: "Score exceptionnel",
  }[type] || "Score";
}

function playerRoundStats(player, roundId) {
  return playerRoundStatsFromHandicap(player, roundId, handicapBeforeRound(player, roundId));
}

function playerRoundStatsFromHandicap(player, roundId, handicap) {
  const course = courseForRound(roundId);
  const playerForRound = { ...player, handicap };
  const handicapValue = courseHandicap(playerForRound, course);
  let points = 0;
  let grossTotal = 0;
  let holesPlayed = 0;
  let relative = 0;
  let underPar = 0;

  course.holes.forEach((hole) => {
    const gross = getGross(roundId, player.id, hole.number);
    if (!gross) return;
    const strokes = strokesOnHole(handicapValue, hole.strokeIndex);
    const holePoints = stablefordPoints(hole.par, gross, strokes);
    points += holePoints;
    grossTotal += gross;
    relative += gross - hole.par;
    holesPlayed += 1;
    if (underParType(hole.par, gross)) underPar += 1;
  });

  const handicapAfter = handicapAfterStableford(handicap, points);
  return {
    points,
    grossTotal,
    holesPlayed,
    relative,
    underPar,
    handicapValue,
    handicapAfter: holesPlayed === course.holes.length ? Math.max(0, roundHandicapDown(handicapAfter)) : null,
    tee: teeForPlayer(playerForRound, course),
  };
}

function cumulativeStats(player) {
  return state.rounds.reduce((acc, round) => {
    const stats = playerRoundStats(player, round.id);
    acc.points += stats.points;
    acc.grossTotal += stats.grossTotal;
    acc.holesPlayed += stats.holesPlayed;
    acc.relative += stats.relative;
    acc.underPar += stats.underPar;
    return acc;
  }, { points: 0, grossTotal: 0, holesPlayed: 0, relative: 0, underPar: 0 });
}

function sortedLeaderboard(mode = "round") {
  return [...state.players].map((player) => {
    const stats = mode === "round" ? playerRoundStats(player, state.selectedRoundId) : cumulativeStats(player);
    return { player, stats };
  }).sort((a, b) => b.stats.points - a.stats.points || b.stats.holesPlayed - a.stats.holesPlayed || a.stats.grossTotal - b.stats.grossTotal);
}

function grossSouterrainesStats(player) {
  const stats = {
    grossTotal: 0,
    relative: 0,
    holesPlayed: 0,
    birdies: 0,
    pars: 0,
    bogeys: 0,
    doubles: 0,
    triples: 0,
    quadruples: 0,
    puttsTotal: 0,
    puttHoles: 0,
    onePutts: 0,
    threePutts: 0,
  };
  state.rounds.forEach((round) => {
    const course = courseForRound(round.id);
    course.holes.forEach((hole) => {
      const gross = getGross(round.id, player.id, hole.number);
      const putts = Number(getPutts(round.id, player.id, hole.number));
      if (putts > 0) {
        stats.puttsTotal += putts;
        stats.puttHoles += 1;
        if (putts === 1) stats.onePutts += 1;
        if (putts >= 3) stats.threePutts += 1;
      }
      if (!gross) return;
      const diff = gross - hole.par;
      stats.grossTotal += gross;
      stats.relative += diff;
      stats.holesPlayed += 1;
      if (diff === -1) stats.birdies += 1;
      if (diff === 0) stats.pars += 1;
      if (diff === 1) stats.bogeys += 1;
      if (diff === 2) stats.doubles += 1;
      if (diff === 3) stats.triples += 1;
      if (diff === 4) stats.quadruples += 1;
    });
  });
  stats.puttsAverage = stats.puttHoles ? stats.puttsTotal / stats.puttHoles : null;
  return stats;
}

function souterrainesRows() {
  return state.players.map((player) => ({
    player,
    stats: grossSouterrainesStats(player),
  }));
}

function sortedGrossRows() {
  return souterrainesRows().sort((a, b) => (
    a.stats.relative - b.stats.relative ||
    b.stats.holesPlayed - a.stats.holesPlayed ||
    a.stats.grossTotal - b.stats.grossTotal
  ));
}

function topSouterrainesRows(key) {
  return souterrainesRows()
    .filter((row) => row.stats[key] > 0)
    .sort((a, b) => b.stats[key] - a.stats[key] || a.stats.relative - b.stats.relative)
    .slice(0, 3);
}

function formatRelative(value) {
  if (!value) return "E";
  return value > 0 ? `+${value}` : String(value);
}

function render() {
  if (!isAuthenticated) {
    document.getElementById("app").innerHTML = renderLogin();
    bindLogin();
    return;
  }
  if (state.activeView === "augusta") {
    document.getElementById("app").innerHTML = renderAugustaFullscreen();
    bindEvents();
    return;
  }
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      <main class="container">
        <section class="view active">${renderActiveView()}</section>
      </main>
      ${renderTabs()}
    </div>
  `;
  bindEvents();
}

function renderActiveView() {
  if (state.activeView === "augusta") return renderAugustaFullscreen();
  if (state.activeView === "leaderboard") return renderLeaderboard();
  if (state.activeView === "score") return renderScoreEntry();
  if (state.activeView === "groups") return renderGroups();
  if (state.activeView === "players") return renderPlayers();
  if (state.activeView === "underground") return renderUnderground();
  if (state.activeView === "notifications") return renderNotifications();
  return renderHome();
}

function renderLogin() {
  return `
    <div class="login-screen">
      <div class="login-panel">
        <img class="login-logo" ${logoAttrs()} alt="Logo Open de Panse" />
        <h1>Open de Panse</h1>
        <p>Accès réservé aux participants de l'édition 2026.</p>
        <form data-login-form>
          <div class="field">
            <label>Mot de passe</label>
            <input type="password" autocomplete="current-password" data-login-password autofocus />
          </div>
          <button class="btn primary login-btn" type="submit">Entrer</button>
          <p class="login-error" data-login-error hidden>Mot de passe incorrect.</p>
        </form>
      </div>
    </div>
  `;
}

function normalizePassword(value) {
  return String(value).toLowerCase().replace(/\s+/g, "");
}

function playerPassword(player) {
  if (playerPasswords[player.id]) return playerPasswords[player.id];
  return `${normalizePassword(player.name).replace(/[^a-z0-9]/g, "")}2026`;
}

function playerFromPassword(value) {
  return state.players.find((player) => normalizePassword(playerPassword(player)) === value);
}

function bindLogin() {
  const form = document.querySelector("[data-login-form]");
  const input = document.querySelector("[data-login-password]");
  const error = document.querySelector("[data-login-error]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = normalizePassword(input.value);
    if (value === ADMIN_PASSWORD || value === "adminpanse2026") {
      localStorage.setItem(AUTH_KEY, "ok");
      localStorage.setItem(ROLE_KEY, "admin");
      localStorage.removeItem(PLAYER_KEY);
      currentRole = "admin";
      currentPlayerId = "";
      isAuthenticated = true;
      startRemoteSync();
      render();
      return;
    }
    const player = playerFromPassword(value);
    if (player) {
      localStorage.setItem(AUTH_KEY, "ok");
      localStorage.setItem(ROLE_KEY, "player");
      localStorage.setItem(PLAYER_KEY, player.id);
      currentRole = "player";
      currentPlayerId = player.id;
      state.selectedPlayerId = player.id;
      state.activeView = "score";
      isAuthenticated = true;
      startRemoteSync();
      render();
      return;
    }
    if (value === PARTICIPANT_PASSWORD || value === "pense2026") {
      localStorage.setItem(AUTH_KEY, "ok");
      localStorage.setItem(ROLE_KEY, "participant");
      localStorage.removeItem(PLAYER_KEY);
      currentRole = "participant";
      currentPlayerId = "";
      isAuthenticated = true;
      startRemoteSync();
      render();
      return;
    }
    error.hidden = false;
    input.select();
  });
}

function isAdmin() {
  return currentRole === "admin";
}

function isPlayerLogin() {
  return currentRole === "player" && Boolean(currentPlayerId);
}

function currentPlayer() {
  return state.players.find((player) => player.id === currentPlayerId);
}

function shouldAnonymizeLeaderboards() {
  return !isAdmin() && state.anonymizeParticipantLeaderboards !== false;
}

function displayPlayerName(player, rank) {
  if (!shouldAnonymizeLeaderboards()) return player.name;
  if (isPlayerLogin() && player.id === currentPlayerId) return player.name;
  return `Joueur ${rank}`;
}

function canSeeAllPlayerProfiles() {
  return isAdmin() || state.anonymizeParticipantLeaderboards === false;
}

function visibleProfilePlayers() {
  if (canSeeAllPlayerProfiles()) return state.players;
  const player = currentPlayer();
  return player ? [player] : [];
}

function normalizePalmaresName(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function palmaresPlayerId(name) {
  const aliases = {
    juju: "p1",
    thib: "p2",
    thibz: "p2",
    tib: "p2",
    goulu: "p3",
    gulu: "p3",
    gege: "p4",
    gg: "p4",
    nanou: "p5",
    nanouz: "p5",
    pierrot: "p6",
    lucho: "p7",
    lutcho: "p7",
    nonoz: "p8",
    ben: "p9",
    benouz: "p9",
    manu: "p10",
    manioulz: "p10",
    laroquette: "p11",
    gregz: "p12",
    gregzm: "p12",
  };
  return aliases[normalizePalmaresName(name)] || "";
}

function playerPalmares(player) {
  return competitionPalmaresRows().reduce((acc, row) => {
    if (palmaresPlayerId(row.greenJacket) === player.id) acc.wins.push(row.year);
    if (palmaresPlayerId(row.woodenSpoon) === player.id) acc.spoons.push(row.year);
    return acc;
  }, { wins: [], spoons: [] });
}

function isCompetitionComplete() {
  return state.rounds.every((round) => state.validatedRounds?.[round.id]);
}

function palmares2026() {
  if (!isCompetitionComplete()) return null;
  const rows = sortedLeaderboard("cumulative");
  if (!rows.length) return null;
  return {
    year: 2026,
    greenJacket: rows[0].player.name,
    woodenSpoon: rows[rows.length - 1].player.name,
  };
}

function competitionPalmaresRows() {
  const current = palmares2026();
  return current ? [...palmaresSeed, current] : palmaresSeed;
}

function requireAdminMessage() {
  alert("Cette action est réservée à l'administrateur.");
}

async function startRemoteSync() {
  if (!supabaseClient || !isAuthenticated) return;
  await loadRemoteState();
  subscribeRemoteState();
  startRemotePolling();
  render();
}

function renderTopbar() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand-lockup">
          <img class="brand-logo" ${logoAttrs()} alt="Logo Open de Panse" />
          <div class="brand">
            <h1>Open de Panse</h1>
            <span>Stableford net - 4 tours - MVP</span>
          </div>
        </div>
        <div class="topbar-actions">
          <span class="status-pill">${isAdmin() ? "Admin" : isPlayerLogin() ? currentPlayer()?.name || "Joueur" : "Participant"} · ${remoteReady ? "Live" : "Local"}</span>
          <button class="btn logout-btn" data-action="logout">Sortir</button>
        </div>
      </div>
    </header>
  `;
}

function renderTabs() {
  const tabs = [
    ["home", "Accueil", icons.home],
    ["leaderboard", "Classement", icons.trophy],
    ["score", "Scores", icons.pencil],
    ["groups", "Parties", icons.groups],
    ["players", "Joueurs", icons.users],
    ["underground", "Souterraines", icons.trophy],
    ["notifications", "Alertes", icons.bell],
  ];
  const unreadAlerts = Math.max(0, state.notifications.length - (state.seenNotificationCount || 0));
  return `<nav class="tabs">${tabs.map(([id, label, icon]) => `
    <button class="tab ${state.activeView === id ? "active" : ""} ${id === "notifications" && unreadAlerts ? "has-alerts" : ""}" data-view="${id}" title="${label}">
      ${icon}
      ${id === "notifications" && unreadAlerts ? `<span class="tab-badge">${unreadAlerts}</span>` : ""}
      ${label}
    </button>
  `).join("")}</nav>`;
}

function renderHome() {
  const cumulative = sortedLeaderboard("cumulative");
  const latestAlert = state.notifications[0];
  return `
    ${latestAlert ? `
      <div class="alert-banner">
        <strong>${latestAlert.message}</strong>
        <span>${latestAlert.detail} · ${latestAlert.createdAt}</span>
      </div>
    ` : ""}
    <div class="hero">
      <div class="hero-main">
        <img class="hero-logo" ${logoAttrs()} alt="Logo Open de Panse" />
        <div>
          <h2>Le scoring live de l'Open de Panse est prêt à prendre le départ.</h2>
          <p>Quatre tours réels, calcul WHS, Stableford net, alertes birdie et handicap Open de Panse mis à jour après validation.</p>
        </div>
      </div>
      <div class="metric-row">
        <div class="metric"><strong>${state.players.length}</strong><span>joueurs</span></div>
        <div class="metric"><strong>${state.rounds.length}</strong><span>tours</span></div>
        ${renderPalmaresMetric("green")}
        ${renderPalmaresMetric("wooden")}
      </div>
    </div>
    <div class="grid two">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Tours préchargés</h3>
            <p class="panel-subtitle">Le calendrier réel du MVP</p>
          </div>
        </div>
        <div class="panel-body cards">
          ${state.rounds.map(renderRoundCard).join("")}
          ${state.homePreviewRoundId ? renderCourseScorecardPreview(state.homePreviewRoundId) : ""}
        </div>
      </div>
      <button class="panel panel-button" data-action="open-augusta">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Classement cumulé</h3>
            <p class="panel-subtitle">Toucher pour ouvrir le leaderboard Milano 2026</p>
          </div>
        </div>
        <div class="panel-body">${renderHomeRankingSnapshot(cumulative)}</div>
      </button>
    </div>
    ${renderAugustaLeaderboard()}
    <div class="panel" style="margin-top:14px">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Dernière alerte shot</h3>
          <p class="panel-subtitle">Birdie, eagle ou mieux : tournée générale</p>
        </div>
        <span class="tag gold">${state.notifications.length}</span>
      </div>
      <div class="panel-body cards">
        ${state.notifications.length ? state.notifications.slice(0, 4).map((item) => `
          <div class="notification highlight">
            <div class="card-top">
              <div>
                <strong>${item.message}</strong>
                <div class="small">${item.detail} · ${item.createdAt}</div>
              </div>
              <span class="tag gold">${labelForUnderPar(item.type)}</span>
            </div>
          </div>
        `).join("") : `<div class="empty">Les premiers shots apparaîtront ici.</div>`}
      </div>
    </div>
  `;
}

function augustaRows() {
  const rounds = augustaRounds();
  return state.players.map((player) => {
    const holes = Array.from({ length: 18 }, (_, index) => {
      const holeNumber = index + 1;
      return rounds.reduce((cell, round) => {
        const course = courseForRound(round.id);
        const hole = course.holes.find((item) => item.number === holeNumber);
        const gross = getGross(round.id, player.id, holeNumber);
        if (!hole || !gross) return cell;
        const stats = playerRoundStats(player, round.id);
        const strokes = strokesOnHole(stats.handicapValue, hole.strokeIndex);
        cell.points += stablefordPoints(hole.par, gross, strokes) || 0;
        cell.played += 1;
        return cell;
      }, { points: 0, played: 0 });
    });
    const total = holes.reduce((sum, value) => sum + value.points, 0);
    return { player, holes, total };
  }).sort((a, b) => b.total - a.total);
}

function augustaCellClass(cell) {
  if (!cell.played) return "";
  if (cell.points >= 4) return "augusta-excellent";
  if (cell.points === 3) return "augusta-good";
  if (cell.points === 2) return "augusta-par";
  if (cell.points === 1) return "augusta-low";
  return "augusta-zero";
}

function renderAugustaLeaderboard() {
  const rows = augustaRows();
  const round = selectedRound() || state.rounds[0];
  return `
    <div class="panel augusta-panel">
      <div class="panel-header">
        <div class="augusta-title-lockup">
          <img class="augusta-logo" ${logoAttrs()} alt="Logo Open de Panse" />
          <div>
            <h3 class="panel-title">Leaderboard Milano 2026</h3>
            <p class="panel-subtitle">${selectedRoundTitle()} · Points Stableford cumulés jusqu'au tour ${round.number}</p>
          </div>
        </div>
      </div>
      <div class="augusta-scroll">
        <table class="augusta-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Joueur</th>
              ${Array.from({ length: 18 }, (_, index) => `<th>${index + 1}</th>`).join("")}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${displayPlayerName(row.player, index + 1)}</td>
                ${row.holes.map((cell) => `<td class="${augustaCellClass(cell)}">${cell.played ? cell.points : ""}</td>`).join("")}
                <td><strong>${row.total}</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function leaderboardTimeline() {
  const sequence = state.rounds.flatMap((round) => {
    const course = courseForRound(round.id);
    return course.holes.map((hole) => ({ round, course, hole }));
  });
  const totals = new Map(state.players.map((player) => [player.id, 0]));
  const played = new Map(state.players.map((player) => [player.id, 0]));
  const lines = new Map(state.players.map((player) => [player.id, []]));

  sequence.forEach((step, stepIndex) => {
    state.players.forEach((player) => {
      const gross = getGross(step.round.id, player.id, step.hole.number);
      if (!gross) return;
      const stats = playerRoundStats(player, step.round.id);
      const strokes = strokesOnHole(stats.handicapValue, step.hole.strokeIndex);
      totals.set(player.id, totals.get(player.id) + (stablefordPoints(step.hole.par, gross, strokes) || 0));
      played.set(player.id, played.get(player.id) + 1);
    });

    const ranking = [...state.players].sort((a, b) => {
      const totalDiff = totals.get(b.id) - totals.get(a.id);
      if (totalDiff) return totalDiff;
      const playedDiff = played.get(b.id) - played.get(a.id);
      if (playedDiff) return playedDiff;
      return a.name.localeCompare(b.name);
    });
    ranking.forEach((player, rankIndex) => {
      if (played.get(player.id) <= lines.get(player.id).length) return;
      lines.get(player.id).push({
        step: stepIndex + 1,
        rank: rankIndex + 1,
        total: totals.get(player.id),
        played: played.get(player.id),
      });
    });
  });

  return { sequence, lines, totals, played };
}

function renderPositionRaceChart() {
  const { sequence, lines, totals } = leaderboardTimeline();
  const chartPlayers = state.players.filter((player) => lines.get(player.id).length);
  const width = 1040;
  const height = 420;
  const padding = { top: 34, right: 112, bottom: 42, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxRank = Math.max(1, state.players.length);
  const colors = ["#b51625", "#145db7", "#0b6b3a", "#d45b16", "#6f42c1", "#111827", "#0f766e", "#be185d", "#64748b", "#7c2d12", "#2563eb", "#15803d"];
  const xForStep = (step) => padding.left + ((step - 1) / Math.max(1, sequence.length - 1)) * chartWidth;
  const yForRank = (rank) => padding.top + ((rank - 1) / Math.max(1, maxRank - 1)) * chartHeight;
  const rankedPlayers = [...state.players].sort((a, b) => totals.get(b.id) - totals.get(a.id) || a.name.localeCompare(b.name));
  const playerRank = new Map(rankedPlayers.map((player, index) => [player.id, index + 1]));

  if (!chartPlayers.length) {
    return `
      <div class="panel position-race-panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Course des positions</h3>
            <p class="panel-subtitle">La courbe apparaîtra dès les premiers scores saisis.</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="panel position-race-panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Course des positions</h3>
          <p class="panel-subtitle">Évolution du classement Stableford cumulé sur les 72 trous</p>
        </div>
      </div>
      <div class="position-race-scroll">
        <svg class="position-race-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Évolution des positions sur 72 trous">
          <rect x="0" y="0" width="${width}" height="${height}" rx="10" class="race-bg"></rect>
          ${[1, 3, 6, 9, 12].map((rank) => rank <= maxRank ? `
            <line x1="${padding.left}" y1="${yForRank(rank)}" x2="${width - padding.right}" y2="${yForRank(rank)}" class="race-grid"></line>
            <text x="${padding.left - 10}" y="${yForRank(rank) + 4}" class="race-axis" text-anchor="end">#${rank}</text>
          ` : "").join("")}
          ${[1, 9, 18, 27, 36, 45, 54, 63, 72].map((step) => `
            <line x1="${xForStep(step)}" y1="${padding.top}" x2="${xForStep(step)}" y2="${height - padding.bottom}" class="race-grid vertical"></line>
            <text x="${xForStep(step)}" y="${height - 16}" class="race-axis" text-anchor="middle">${step}</text>
          `).join("")}
          ${chartPlayers.map((player, index) => {
            const points = lines.get(player.id).map((point) => `${xForStep(point.step)},${yForRank(point.rank)}`).join(" ");
            const last = lines.get(player.id).at(-1);
            const color = colors[index % colors.length];
            return `
              <polyline class="race-line" points="${points}" pathLength="100" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" style="animation-delay:${index * 0.12}s"></polyline>
              <circle class="race-dot" cx="${xForStep(last.step)}" cy="${yForRank(last.rank)}" r="4.5" fill="${color}" style="animation-delay:${7.2 + index * 0.12}s"></circle>
              <text x="${width - padding.right + 12}" y="${yForRank(playerRank.get(player.id)) + 4}" fill="${color}" class="race-label" style="animation-delay:${7.35 + index * 0.12}s">${displayPlayerName(player, playerRank.get(player.id))}</text>
            `;
          }).join("")}
          <text x="${padding.left}" y="20" class="race-title">Trou joué</text>
          <text x="${width - padding.right}" y="20" class="race-title" text-anchor="end">Position actuelle</text>
        </svg>
      </div>
    </div>
  `;
}

function renderAugustaFullscreen() {
  return `
    <div class="augusta-fullscreen" data-action="close-augusta">
      <div class="augusta-fullscreen-header">
        <div class="augusta-title-lockup">
          <img class="augusta-logo" ${logoAttrs()} alt="Logo Open de Panse" />
          <div>
            <h1>Leaderboard Milano 2026</h1>
            <p>${selectedRoundTitle()} · points Stableford cumulés en live</p>
          </div>
        </div>
        <button class="btn" data-action="close-augusta">Retour</button>
      </div>
      ${renderAugustaLeaderboard()}
    </div>
  `;
}

async function requestLandscapeMode() {
  try {
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
    if (screen.orientation?.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch {
    // Certains navigateurs mobiles refusent le verrouillage paysage, l'affichage reste utilisable.
  }
}

async function exitLandscapeMode() {
  try {
    if (screen.orientation?.unlock) screen.orientation.unlock();
    if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
  } catch {
    // Sortie plein écran non critique.
  }
}

async function closeAugustaMode() {
  state.activeView = "home";
  saveState();
  await exitLandscapeMode();
  render();
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
}

function renderPalmaresMetric(type) {
  const rows = competitionPalmaresRows();
  const latest = rows[rows.length - 1];
  const isGreen = type === "green";
  const title = isGreen ? `Veste verte ${latest.year}` : `Cuillère de bois ${latest.year}`;
  const name = isGreen ? latest.greenJacket : latest.woodenSpoon;
  return `
    <details class="metric heritage-metric ${isGreen ? "green" : "wood"}">
      <summary>
        <span>${title}</span>
        <strong>${name}</strong>
      </summary>
      <div class="heritage-list">
        ${[...rows].reverse().map((row) => `
          <div>
            <span>${row.year}</span>
            <strong>${isGreen ? row.greenJacket : row.woodenSpoon}</strong>
          </div>
        `).join("")}
      </div>
    </details>
  `;
}

function renderHomeRankingSnapshot(cumulative) {
  if (!cumulative.length) return `<div class="empty">Aucun score saisi.</div>`;
  const topThree = cumulative.slice(0, 3);
  const bottomThree = cumulative.slice(-3).reverse();
  return `
    <div class="home-ranking">
      <div class="home-ranking-column">
        <div class="home-ranking-heading positive">Top 3</div>
        ${topThree.map((row, index) => renderHomeRankingTile(row, index + 1, "positive")).join("")}
      </div>
      <div class="home-ranking-column">
        <div class="home-ranking-heading negative">Derniers</div>
        ${bottomThree.map((row, index) => renderHomeRankingTile(row, cumulative.length - index, "negative")).join("")}
      </div>
    </div>
  `;
}

function renderHomeRankingTile(row, rank, tone) {
  const displayName = displayPlayerName(row.player, rank);
  return `
    <div class="home-ranking-tile ${tone}">
      <span class="home-rank">#${rank}</span>
      <strong>${displayName}</strong>
      <div>${row.stats.points} pts</div>
      <small>${row.stats.holesPlayed} trous</small>
    </div>
  `;
}

function renderRoundCard(round) {
  const course = state.courses.find((item) => item.id === round.courseId);
  return `
    <button class="round-card ${state.homePreviewRoundId === round.id ? "active" : ""}" data-home-round="${round.id}">
      <div class="card-top">
        <div>
          <strong>Tour ${round.number} · ${course.name}</strong>
          <div class="small">${round.date}${round.time ? ` · ${round.time}` : ""}</div>
          <div class="small">${course.club} · ${course.location}</div>
        </div>
        <span class="tag green">Par ${course.tees[0].par}</span>
      </div>
    </button>
  `;
}

function renderCourseScorecardPreview(roundId) {
  const round = state.rounds.find((item) => item.id === roundId);
  const course = courseForRound(roundId);
  const cells = course.holes.map((hole) => ({ hole, gross: "", points: null }));
  return `
    <div class="course-preview">
      <div class="card-top">
        <div>
          <strong>Carte du parcours · Tour ${round.number}</strong>
          <div class="small">${course.club} · ${course.name}</div>
        </div>
        <span class="tag green">Par ${course.tees[0].par}</span>
      </div>
      ${renderCourseNine("Aller", cells.slice(0, 9))}
      ${renderCourseNine("Retour", cells.slice(9, 18))}
    </div>
  `;
}

function renderCourseNine(label, cells) {
  return `
    <div class="scorecard-nine">
      <div class="scorecard-nine-title">${label}</div>
      <table class="scorecard-table compact">
        <tbody>
          <tr>
            <th>Trou</th>
            ${cells.map((cell) => `<th>${cell.hole.number}</th>`).join("")}
          </tr>
          <tr>
            <td>Par</td>
            ${cells.map((cell) => `<td>${cell.hole.par}</td>`).join("")}
          </tr>
          <tr>
            <td>HCP</td>
            ${cells.map((cell) => `<td>${cell.hole.strokeIndex}</td>`).join("")}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderLeaderboard() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Classement live</h3>
          <p class="panel-subtitle">Tour ${round.number} · ${course.name}</p>
        </div>
        <select data-action="select-round">${state.rounds.map((item) => `<option value="${item.id}" ${item.id === round.id ? "selected" : ""}>Tour ${item.number}</option>`).join("")}</select>
      </div>
      <div class="panel-body">
        ${renderLeaderboardTable(sortedLeaderboard("round"))}
      </div>
    </div>
    <div class="panel cumulative-panel" style="margin-top:14px" data-action="toggle-position-race" role="button" tabindex="0">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Classement cumulé</h3>
          <p class="panel-subtitle">Total Stableford net sur tous les tours · cliquer pour voir la course des positions</p>
        </div>
        <span class="tag">${state.showPositionRace ? "Masquer" : "Voir la courbe"}</span>
      </div>
      <div class="panel-body">
        ${renderLeaderboardTable(sortedLeaderboard("cumulative"))}
      </div>
    </div>
    ${state.showPositionRace ? renderPositionRaceChart() : ""}
  `;
}

function renderLeaderboardTable(rows) {
  if (shouldAnonymizeLeaderboards()) {
    return `
      <table class="leaderboard">
        <thead><tr><th>#</th><th>Classement</th><th>Pts</th><th>Trous</th></tr></thead>
        <tbody>
          ${rows.map((row, index) => `
            <tr>
              <td class="rank">${index + 1}</td>
              <td><div class="player-name">${displayPlayerName(row.player, index + 1)}</div></td>
              <td><span class="score-big">${row.stats.points}</span></td>
              <td>${row.stats.holesPlayed}/${courseForRound(state.selectedRoundId).holes.length}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
  return `
    <table class="leaderboard">
      <thead><tr><th>#</th><th>Joueur</th><th>Pts</th><th>Trous</th><th>Brut</th><th>Par</th></tr></thead>
      <tbody>
        ${rows.map((row, index) => `
          <tr>
            <td class="rank">${index + 1}</td>
            <td><div class="player-name">${row.player.name}</div><div class="small">HCP ${row.player.handicap.toFixed(1)}</div></td>
            <td><span class="score-big">${row.stats.points}</span></td>
            <td>${row.stats.holesPlayed}/${courseForRound(state.selectedRoundId).holes.length}</td>
            <td>${row.stats.grossTotal || "-"}</td>
            <td class="${row.stats.relative <= 0 ? "positive" : "negative"}">${formatRelative(row.stats.relative)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderUnderground() {
  const topBlocks = [
    ["birdies", "Birdies"],
    ["pars", "Pars"],
    ["bogeys", "Bogeys"],
    ["doubles", "Doubles bogeys"],
    ["triples", "Triples bogeys"],
    ["quadruples", "Quadruples bogeys"],
  ];
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Souterraines</h3>
          <p class="panel-subtitle">Classements bruts et statistiques de coups sur tous les tours</p>
        </div>
      </div>
      <div class="panel-body">
        ${renderGrossLeaderboard()}
      </div>
    </div>
    <div class="underground-grid">
      ${topBlocks.map(([key, label]) => renderUndergroundTop(key, label)).join("")}
      ${renderPuttingUnderground()}
    </div>
  `;
}

function renderPuttingUnderground() {
  const rows = state.players
    .map((player) => ({ player, stats: grossSouterrainesStats(player) }))
    .filter((row) => row.stats.puttHoles > 0)
    .sort((a, b) => a.stats.puttsAverage - b.stats.puttsAverage || b.stats.onePutts - a.stats.onePutts)
    .slice(0, 3);

  return `
    <div class="panel underground-card">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Putting</h3>
          <p class="panel-subtitle">Top 3 moyenne de putts</p>
        </div>
      </div>
      <div class="panel-body cards">
        ${rows.length ? rows.map((row, index) => `
          <div class="underground-rank">
            <span class="rank">#${index + 1}</span>
            <strong>${displayPlayerName(row.player, index + 1)}</strong>
            <span class="score-big">${row.stats.puttsAverage.toFixed(1)}</span>
            <span class="small">${row.stats.puttsTotal} putts · ${row.stats.threePutts} fois 3+</span>
          </div>
        `).join("") : `<div class="empty">Les stats putting apparaîtront dès que les putts seront saisis.</div>`}
      </div>
    </div>
  `;
}

function renderGrossLeaderboard() {
  const rows = sortedGrossRows();
  return `
    <table class="leaderboard underground-table">
      <thead><tr><th>#</th><th>Joueur</th><th>Brut</th><th>Par</th><th>Trous</th></tr></thead>
      <tbody>
        ${rows.map((row, index) => `
          <tr>
            <td class="rank">${index + 1}</td>
            <td><div class="player-name">${displayPlayerName(row.player, index + 1)}</div></td>
            <td><span class="score-big">${row.stats.grossTotal || "-"}</span></td>
            <td class="${row.stats.relative <= 0 ? "positive" : "negative"}">${row.stats.holesPlayed ? formatRelative(row.stats.relative) : "-"}</td>
            <td>${row.stats.holesPlayed}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderUndergroundTop(key, label) {
  const rows = topSouterrainesRows(key);
  return `
    <div class="panel underground-card">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">${label}</h3>
          <p class="panel-subtitle">Top 3 cumulé</p>
        </div>
      </div>
      <div class="panel-body cards">
        ${rows.length ? rows.map((row, index) => `
          <div class="underground-rank">
            <span class="rank">#${index + 1}</span>
            <strong>${displayPlayerName(row.player, index + 1)}</strong>
            <span class="score-big">${row.stats[key]}</span>
          </div>
        `).join("") : `<div class="empty">Aucun score pour l'instant.</div>`}
      </div>
    </div>
  `;
}

function renderScoreEntry() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  const groups = visibleGroupsForRound(round.id);
  if (!groups.length) {
    return `
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Saisie des scores</h3>
            <p class="panel-subtitle">Tour ${round.number} · ${course.name}</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="empty">${isPlayerLogin() ? "Tu n'es pas encore affecté à une partie sur ce tour." : "Crée d'abord les parties de ce tour pour démarrer la saisie."}</div>
          <div class="actions">
            ${renderRecipeImportButton()}
            ${isPlayerLogin() ? "" : `<button class="btn primary" data-view="groups">Créer ou modifier les parties</button>`}
          </div>
        </div>
      </div>
    `;
  }
  if (!state.selectedGroupId || !groups.some((group) => group.id === state.selectedGroupId)) {
    startGroupScoreEntry(round.id, groups[0].id);
  }
  const groupPlayers = playersInSelectedGroup();
  const selectedGroup = groups.find((group) => group.id === state.selectedGroupId);
  if (selectedGroup && (!selectedGroup.markerId || !selectedGroup.playerIds.includes(selectedGroup.markerId))) {
    selectedGroup.markerId = groupPlayers[0]?.id || "";
  }
  if (selectedGroup?.markerId && state.selectedPlayerId !== selectedGroup.markerId) {
    state.selectedPlayerId = selectedGroup.markerId;
  }
  const player = selectedPlayer() || groupPlayers[0] || state.players[0];
  const stats = playerRoundStats(player, round.id);
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Saisie des scores</h3>
          <p class="panel-subtitle">Tour ${round.number} · ${course.name}</p>
        </div>
        ${renderRecipeImportButton()}
      </div>
      <div class="panel-body">
        <div class="controls">
          <div class="field">
            <label>Tour</label>
            <select data-action="select-round">${state.rounds.map((item) => `<option value="${item.id}" ${item.id === round.id ? "selected" : ""}>Tour ${item.number} - ${courseName(item.courseId)}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label>Partie</label>
            <select data-action="select-group">
              ${groups.map((group) => `<option value="${group.id}" ${group.id === state.selectedGroupId ? "selected" : ""}>${group.name}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label>Marqueur</label>
            <select data-action="select-marker">${groupPlayers.map((item) => `<option value="${item.id}" ${item.id === selectedGroup?.markerId ? "selected" : ""}>${item.name}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label>Départ recommandé</label>
            <input value="${stats.tee.label} · CR ${stats.tee.rating} · slope ${stats.tee.slope}" readonly />
          </div>
        </div>
        <div class="metric-row" style="margin-bottom:14px">
          <div class="metric"><strong>${stats.points}</strong><span>points Stableford</span></div>
          <div class="metric"><strong>${stats.handicapValue}</strong><span>coups rendus WHS</span></div>
          <div class="metric"><strong>${stats.holesPlayed}/${course.holes.length}</strong><span>trous saisis</span></div>
          <div class="metric"><strong>${stats.handicapAfter ?? "-"}</strong><span>HCP après tour</span></div>
        </div>
        ${renderGroupScoreGrid(round.id, course, groupPlayers)}
        <div class="actions">
          <button class="btn primary" data-action="validate-round">Valider le tour et appliquer les handicaps</button>
          <button class="btn" data-view="groups">Créer ou modifier les parties</button>
          ${renderRecipeImportButton()}
          ${isAdmin() ? `<button class="btn danger" data-action="reset-scores">Effacer les scores du prototype</button>` : ""}
        </div>
      </div>
    </div>
  `;
}

function renderRecipeImportButton() {
  if (!isAdmin()) return "";
  return `
    <label class="btn import-recipe-btn">
      Importer fichier recette CSV
      <input class="file-input-hidden" type="file" accept=".csv,text/csv" data-import-scores />
    </label>
  `;
}

function parseCsvRows(text) {
  return text.trim().split(/\r?\n/).map((line) => {
    const cells = [];
    let cell = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      const next = line[index + 1];
      if (char === '"' && quoted && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ";" && !quoted) {
        cells.push(cell);
        cell = "";
      } else {
        cell += char;
      }
    }
    cells.push(cell);
    return cells;
  });
}

function playerByImportedName(name) {
  const normalized = normalizePalmaresName(name);
  return state.players.find((player) => normalizePalmaresName(player.name) === normalized || palmaresPlayerId(name) === player.id);
}

function clearImportedRound(roundId) {
  Object.keys(state.scores).forEach((key) => {
    if (key.startsWith(`${roundId}:`)) delete state.scores[key];
  });
  if (!state.putts) state.putts = {};
  Object.keys(state.putts).forEach((key) => {
    if (key.startsWith(`${roundId}:`)) delete state.putts[key];
  });
  if (!state.validatedHoles) state.validatedHoles = {};
  Object.keys(state.validatedHoles).forEach((key) => {
    if (key.startsWith(`${roundId}:`)) delete state.validatedHoles[key];
  });
  state.notifications = state.notifications.filter((item) => item.roundId !== roundId);
  if (state.validatedRounds) delete state.validatedRounds[roundId];
}

function validateImportedRound(roundId) {
  const course = courseForRound(roundId);
  const groups = groupsForRound(roundId);
  groups.forEach((group) => {
    course.holes.forEach((hole) => {
      const players = playersInGroup(roundId, group.id);
      const complete = players.length && players.every((player) => getGross(roundId, player.id, hole.number));
      if (!complete) return;
      state.validatedHoles[holeValidationKey(roundId, group.id, hole.number)] = true;
      players.forEach((player) => {
        maybeNotifyUnderPar(roundId, player.id, hole.number, getGross(roundId, player.id, hole.number));
      });
    });
  });
  const allComplete = state.players.every((player) => playerRoundStats(player, roundId).holesPlayed === course.holes.length);
  if (allComplete) state.validatedRounds[roundId] = true;
}

function recalculateHandicapsFromValidatedRounds() {
  state.players = state.players.map((player) => {
    let current = player.initialHandicap ?? player.handicap;
    for (const round of state.rounds) {
      if (!state.validatedRounds[round.id]) continue;
      const stats = playerRoundStatsFromHandicap(player, round.id, current);
      if (stats.handicapAfter !== null) current = stats.handicapAfter;
    }
    return { ...player, handicap: current };
  });
}

function importScoreCsv(text) {
  if (!isAdmin()) return requireAdminMessage();
  const rows = parseCsvRows(text);
  const header = rows.shift() || [];
  const indexOf = (label) => header.findIndex((item) => normalizePalmaresName(item) === normalizePalmaresName(label));
  const tourIndex = indexOf("Tour");
  const partieIndex = indexOf("Partie");
  const marqueurIndex = indexOf("Marqueur");
  const joueurIndex = indexOf("Joueur");
  if ([tourIndex, partieIndex, marqueurIndex, joueurIndex].some((index) => index < 0)) {
    alert("Fichier non reconnu : il faut les colonnes Tour, Partie, Marqueur et Joueur.");
    return;
  }

  const groupsByRound = new Map();
  const importedRoundIds = new Set();
  let importedScores = 0;
  rows.forEach((row) => {
    const round = state.rounds.find((item) => item.number === Number(row[tourIndex]));
    const player = playerByImportedName(row[joueurIndex]);
    if (!round || !player) return;
    if (!importedRoundIds.has(round.id)) {
      clearImportedRound(round.id);
      importedRoundIds.add(round.id);
    }
    if (!groupsByRound.has(round.id)) groupsByRound.set(round.id, new Map());
    const groupName = row[partieIndex] || "Partie";
    const groups = groupsByRound.get(round.id);
    if (!groups.has(groupName)) {
      groups.set(groupName, {
        id: `${round.id}-import-${groups.size + 1}`,
        name: groupName,
        markerName: row[marqueurIndex],
        playerIds: [],
      });
    }
    const group = groups.get(groupName);
    if (!group.playerIds.includes(player.id)) group.playerIds.push(player.id);

    for (let holeNumber = 1; holeNumber <= 18; holeNumber += 1) {
      const scoreIndex = indexOf(`Trou ${holeNumber}`);
      const value = Number(row[scoreIndex]);
      if (scoreIndex < 0 || Number.isNaN(value) || value < 1) continue;
      state.scores[roundScoreKey(round.id, player.id, holeNumber)] = value;
      importedScores += 1;
    }
    state.selectedRoundId = round.id;
  });

  groupsByRound.forEach((groups, roundId) => {
    state.groups[roundId] = [...groups.values()].map((group, index) => {
      const marker = playerByImportedName(group.markerName);
      const playerIds = group.playerIds.slice(0, 4);
      while (playerIds.length < 4) playerIds.push("");
      return {
        id: `${roundId}-g${index + 1}`,
        name: group.name,
        markerId: marker && playerIds.includes(marker.id) ? marker.id : playerIds.find(Boolean) || "",
        playerIds,
      };
    });
  });

  const notificationCountBeforeValidation = state.notifications.length;
  importedRoundIds.forEach(validateImportedRound);
  recalculateHandicapsFromValidatedRounds();
  const createdNotifications = Math.max(0, state.notifications.length - notificationCountBeforeValidation);
  if (createdNotifications) state.seenNotificationCount = 0;
  state.selectedGroupId = groupsForRound(state.selectedRoundId)[0]?.id || "";
  state.activeMobileHole = 1;
  state.activeScoreCell = null;
  saveState();
  render();
  alert(`${importedScores} scores importés. ${createdNotifications} alerte(s) shot générée(s). Tour validé si les 12 cartes sont complètes, handicaps recalculés.`);
}

function renderHoleInput(roundId, player, course, hole, handicapValue) {
  const gross = getGross(roundId, player.id, hole.number);
  const strokes = strokesOnHole(handicapValue, hole.strokeIndex);
  const points = stablefordPoints(hole.par, gross, strokes);
  const type = underParType(hole.par, gross);
  const validated = isHoleValidated(roundId, "", hole.number);
  return `
    <div class="hole-row single">
      <div class="hole-number">${hole.number}</div>
      <div>
        <strong>Par ${hole.par}</strong>
        <div class="hole-meta">
          <span class="tag">SI ${hole.strokeIndex}</span>
          <span class="tag blue">${strokes >= 0 ? "+" : ""}${strokes} rendu</span>
          <span class="tag green">${points ?? "-"} pt${points > 1 ? "s" : ""}</span>
          ${type ? `<span class="tag gold">${labelForUnderPar(type)}</span>` : ""}
          ${validated ? `<span class="tag green">Validé</span>` : ""}
        </div>
      </div>
      <div class="hole-actions">
        <input class="hole-input" type="tel" inputmode="numeric" pattern="[0-9]*" autocomplete="off" enterkeyhint="next" value="${gross}" data-score="${roundId}:${player.id}:${hole.number}" aria-label="Score trou ${hole.number}" />
        <button class="btn ${validated ? "" : "primary"}" data-validate-hole="${roundId}::${hole.number}">${validated ? "Revalider" : "Valider"}</button>
      </div>
    </div>
  `;
}

function renderGroupScoreGrid(roundId, course, players) {
  return `
    <div class="mobile-hole-entry">
      ${renderMobileHoleEntry(roundId, course, players)}
    </div>
    <div class="score-grid-wrap">
      <table class="score-grid">
        <thead>
          <tr>
            <th>Trou</th>
            <th>Par</th>
            <th>SI</th>
            ${players.map((player) => {
              const stats = playerRoundStats(player, roundId);
              return `<th colspan="2"><span>${player.name}</span><small>${stats.tee.label} · ${stats.handicapValue} CR</small></th>`;
            }).join("")}
            <th>Validation</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            ${players.map(() => `<th>Score</th><th>P</th>`).join("")}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${course.holes.map((hole) => `
            <tr class="${isHoleValidated(roundId, state.selectedGroupId, hole.number) ? "validated-row" : ""}">
              <td><strong>${hole.number}</strong></td>
              <td>${hole.par}</td>
              <td>${hole.strokeIndex}</td>
              ${players.map((player) => {
                const gross = getGross(roundId, player.id, hole.number);
                const putts = getPutts(roundId, player.id, hole.number);
                const stats = playerRoundStats(player, roundId);
                const strokes = strokesOnHole(stats.handicapValue, hole.strokeIndex);
                const points = stablefordPoints(hole.par, gross, strokes);
                const type = underParType(hole.par, gross);
                const activeScore = activeCellMatches(roundId, player.id, hole.number, "score");
                const activePutt = activeCellMatches(roundId, player.id, hole.number, "putt");
                return `
                  <td class="${type ? "under-par-cell" : ""} ${activeScore ? "active-score-cell" : ""}">
                    <button class="grid-score-button" data-score-cell="${roundId}:${player.id}:${hole.number}:score" aria-label="${player.name} score trou ${hole.number}">
                      ${gross || ""}
                    </button>
                    <small>${points ?? "-"} pt${points > 1 ? "s" : ""} · ${strokes >= 0 ? "+" : ""}${strokes}</small>
                  </td>
                  <td class="${activePutt ? "active-score-cell" : ""}">
                    <button class="grid-score-button putt-button" data-score-cell="${roundId}:${player.id}:${hole.number}:putt" aria-label="${player.name} putts trou ${hole.number}">
                      ${putts || ""}
                    </button>
                    <small>P</small>
                  </td>
                `;
              }).join("")}
              <td>
                <button class="btn ${isHoleValidated(roundId, state.selectedGroupId, hole.number) ? "" : "primary"}" data-validate-hole="${roundId}:${state.selectedGroupId}:${hole.number}" data-grid-validate="${hole.number}">
                  ${isHoleValidated(roundId, state.selectedGroupId, hole.number) ? "Validé" : "Valider"}
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      ${renderFloatingKeypad()}
    </div>
  `;
}

function renderMobileHoleEntry(roundId, course, players) {
  const hole = course.holes.find((item) => item.number === state.activeMobileHole) || course.holes[0];
  const complete = players.every((player) => getGross(roundId, player.id, hole.number));
  return `
    <div class="mobile-hole-card">
      <div class="mobile-hole-header">
        <button class="btn" data-mobile-hole-prev>Précédent</button>
        <div>
          <strong>Trou ${hole.number}</strong>
          <div class="small">Par ${hole.par} · HCP ${hole.strokeIndex}</div>
        </div>
        <button class="btn" data-mobile-hole-next>Suivant</button>
      </div>
      <div class="mobile-score-list">
        ${players.map((player) => {
          const gross = getGross(roundId, player.id, hole.number);
      const putts = getPutts(roundId, player.id, hole.number);
          const stats = playerRoundStats(player, roundId);
          const strokes = strokesOnHole(stats.handicapValue, hole.strokeIndex);
          const points = stablefordPoints(hole.par, gross, strokes);
          const activeScore = activeCellMatches(roundId, player.id, hole.number, "score");
          const activePutt = activeCellMatches(roundId, player.id, hole.number, "putt");
          return `
            <div class="mobile-player-score-row">
              <button class="mobile-player-name ${activeScore || activePutt ? "active" : ""}" data-score-cell="${roundId}:${player.id}:${hole.number}:score">
                <strong>${player.name}</strong>
                <small>${points ?? "-"} pt${points > 1 ? "s" : ""} · ${strokes >= 0 ? "+" : ""}${strokes} rendu</small>
              </button>
              <button class="mobile-player-value ${activeScore ? "active" : ""}" data-score-cell="${roundId}:${player.id}:${hole.number}:score">
                <span>Score</span>
                <b>${gross || ""}</b>
              </button>
              <button class="mobile-player-value ${activePutt ? "active" : ""}" data-score-cell="${roundId}:${player.id}:${hole.number}:putt">
                <span>P</span>
                <b>${putts || ""}</b>
              </button>
            </div>
          `;
        }).join("")}
      </div>
      ${renderMobileKeypad()}
      <button class="btn primary mobile-validate" data-validate-hole="${roundId}:${state.selectedGroupId}:${hole.number}" ${complete ? "" : "disabled"}>
        Valider le trou ${hole.number}
      </button>
    </div>
  `;
}

function renderMobileKeypad() {
  return `
    <div class="mobile-keypad">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => `
        <button class="keypad-key" data-keypad-score="${value}">${value}</button>
      `).join("")}
      <button class="keypad-key muted" data-keypad-clear>Effacer</button>
    </div>
  `;
}

function renderFloatingKeypad() {
  const active = state.activeScoreCell;
  const player = active ? state.players.find((item) => item.id === active.playerId) : null;
  if (!active || !player) return "";
  const label = `${player.name} · trou ${active.holeNumber} · ${(active.kind || "score") === "putt" ? "putts" : "score"}`;
  return `
    <div class="score-keypad floating-keypad">
      <div class="keypad-status">
        <span class="tag blue">${label}</span>
        <button class="btn" data-keypad-clear>Effacer</button>
      </div>
      <div class="keypad-grid">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => `
          <button class="keypad-key" data-keypad-score="${value}">${value}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function advanceToNextScoreCell() {
  const active = state.activeScoreCell;
  if (!active) return;
  const players = activeGroupPlayers();
  const currentIndex = players.findIndex((player) => player.id === active.playerId);
  if (currentIndex >= 0 && currentIndex < players.length - 1) {
    state.activeScoreCell = {
      roundId: active.roundId,
      playerId: players[currentIndex + 1].id,
      holeNumber: active.holeNumber,
      kind: "score",
    };
  } else {
    state.activeScoreCell = {
      roundId: active.roundId,
      playerId: players[0]?.id || active.playerId,
      holeNumber: active.holeNumber,
      kind: "putt",
    };
  }
  saveLocalOnly();
  renderPreservingPosition();
}

function renderPlayers() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  const players = visibleProfilePlayers();
  const restricted = !canSeeAllPlayerProfiles();
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Joueurs</h3>
          <p class="panel-subtitle">${restricted ? "Profil joueur personnel tant que les classements sont anonymes" : "Handicap, départ recommandé et coups rendus sur le tour sélectionné"}</p>
        </div>
      </div>
      <div class="panel-body">
        ${isAdmin() ? renderPlayerAdminTools() : ""}
        <div class="cards">
        ${players.length ? players.map((player) => {
          const stats = playerRoundStats(player, round.id);
          const initialHandicap = player.initialHandicap ?? player.handicap;
          return `
            <div class="player-card">
              <div class="card-top">
                <div>
                  <strong>${player.name}</strong>
                  <div class="small">Handicap actuel ${player.handicap.toFixed(1)} · initial ${initialHandicap.toFixed(1)}</div>
                  <div class="small">${course.name} · ${stats.tee.label} · slope ${stats.tee.slope}</div>
                </div>
                <span class="tag green">${stats.handicapValue} CR</span>
              </div>
              ${renderPlayerPalmares(player)}
              ${renderPlayerStats(player)}
              ${isAdmin() ? `
                <div class="player-edit-row">
                  <div class="field">
                    <label>Handicap de départ</label>
                    <input type="tel" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" autocomplete="off" value="${player.handicap.toFixed(1)}" data-player-handicap="${player.id}" />
                  </div>
                </div>
              ` : ""}
              ${renderHandicapHistory(player)}
              ${renderPlayerScorecards(player)}
            </div>
          `;
        }).join("") : `<div class="empty">Connecte-toi avec ton code joueur pour voir ton profil personnel.</div>`}
        </div>
      </div>
    </div>
  `;
}

function renderPlayerStats(player) {
  const grossStats = grossSouterrainesStats(player);
  const stableford = cumulativeStats(player);
  const triplesPlus = grossStats.triples + grossStats.quadruples;
  const puttLabel = grossStats.puttHoles ? `${grossStats.puttsAverage.toFixed(1)} moy.` : "-";
  return `
    <details class="player-stats">
      <summary>Statistiques</summary>
      <div class="player-stats-grid">
        <div><span>Birdies</span><strong>${grossStats.birdies}</strong></div>
        <div><span>Pars</span><strong>${grossStats.pars}</strong></div>
        <div><span>Bogeys</span><strong>${grossStats.bogeys}</strong></div>
        <div><span>Doubles</span><strong>${grossStats.doubles}</strong></div>
        <div><span>Triples +</span><strong>${triplesPlus}</strong></div>
        <div><span>Stableford</span><strong>${stableford.points}</strong></div>
        <div><span>Trous joués</span><strong>${grossStats.holesPlayed}</strong></div>
        <div><span>Brut</span><strong>${grossStats.grossTotal || "-"}</strong></div>
        <div><span>Putts</span><strong>${puttLabel}</strong></div>
        <div><span>3 putts +</span><strong>${grossStats.puttHoles ? grossStats.threePutts : "-"}</strong></div>
      </div>
    </details>
  `;
}

function renderPlayerPalmares(player) {
  const palmares = playerPalmares(player);
  const wins = palmares.wins.map((year) => `
    <span class="palmares-item">
      <span class="palmares-symbol star">★</span>
      <span>${year}</span>
    </span>
  `).join("");
  const spoons = palmares.spoons.map((year) => `
    <span class="palmares-item">
      <span class="palmares-symbol spoon">🥄</span>
      <span>${year}</span>
    </span>
  `).join("");
  if (!wins && !spoons) return "";
  return `
    <div class="player-palmares">
      ${wins}
      ${spoons}
    </div>
  `;
}

function renderPlayerAdminTools() {
  return `
    <div class="admin-tools">
      <label class="toggle-row">
        <input type="checkbox" data-setting="anonymize-leaderboards" ${state.anonymizeParticipantLeaderboards !== false ? "checked" : ""} />
        <span>Classements anonymes pour les participants</span>
      </label>
      <form class="add-player-form" data-add-player-form>
        <div class="field">
          <label>Nouveau joueur</label>
          <input type="text" data-new-player-name placeholder="Nom" autocomplete="off" />
        </div>
        <div class="field">
          <label>Handicap</label>
          <input type="tel" inputmode="decimal" data-new-player-handicap placeholder="Ex. 24" autocomplete="off" />
        </div>
        <button class="btn primary" type="submit">Ajouter</button>
      </form>
      <p class="small">Code joueur généré : prénom sans espace + 2026, par exemple <strong>juju2026</strong>.</p>
    </div>
  `;
}

function renderHandicapHistory(player) {
  let current = player.initialHandicap ?? player.handicap;
  let previousRoundValidated = true;
  return `
    <div class="handicap-history">
      <strong>Evolution handicap</strong>
      <div class="history-grid">
        <span>Tour</span><span>Avant</span><span>Pts</span><span>Après</span>
        ${state.rounds.map((round) => {
          const isValidated = Boolean(state.validatedRounds[round.id]);
          const before = previousRoundValidated ? current : null;
          const stats = before !== null ? playerRoundStatsFromHandicap(player, round.id, before) : null;
          const after = isValidated && stats && stats.handicapAfter !== null ? stats.handicapAfter : null;
          if (after !== null) current = after;
          previousRoundValidated = isValidated && after !== null;
          const points = isValidated && stats?.holesPlayed ? stats.points : "-";
          return `
            <span>T${round.number}</span>
            <span>${before !== null ? before.toFixed(1) : "-"}</span>
            <span>${points}</span>
            <span>${after !== null ? after.toFixed(1) : "-"}</span>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderPlayerScorecards(player) {
  return `
    <div class="player-scorecards">
      <strong>Cartes de score</strong>
      ${state.rounds.map((round) => renderPlayerScorecard(player, round.id)).join("")}
    </div>
  `;
}

function renderPlayerScorecard(player, roundId) {
  const round = state.rounds.find((item) => item.id === roundId);
  const course = courseForRound(roundId);
  const stats = playerRoundStats(player, roundId);
  const cells = course.holes.map((hole) => {
    const gross = getGross(roundId, player.id, hole.number);
    const strokes = strokesOnHole(stats.handicapValue, hole.strokeIndex);
    const points = stablefordPoints(hole.par, gross, strokes);
    return { hole, gross, points };
  });
  const parTotal = cells.reduce((sum, cell) => sum + cell.hole.par, 0);
  const grossTotal = cells.reduce((sum, cell) => sum + (Number(cell.gross) || 0), 0);
  const pointsTotal = cells.reduce((sum, cell) => sum + (Number(cell.points) || 0), 0);
  const isValidated = Boolean(state.validatedRounds[roundId]);
  const status = isValidated ? "validé" : stats.holesPlayed ? `${stats.holesPlayed}/${course.holes.length} trous` : "à venir";
  const frontNine = cells.slice(0, 9);
  const backNine = cells.slice(9, 18);
  return `
    <details class="player-scorecard">
      <summary>
        <span>Tour ${round.number} · ${course.name}</span>
        <span class="scorecard-status">${status}</span>
      </summary>
      ${renderScorecardNine("Aller", frontNine)}
      ${renderScorecardNine("Retour", backNine)}
      <div class="small">Brut ${grossTotal || "-"} · Stableford ${pointsTotal || "-"} pts · ${stats.holesPlayed}/${course.holes.length} trous</div>
    </details>
  `;
}

function renderScorecardNine(label, cells) {
  return `
    <div class="scorecard-nine">
      <div class="scorecard-nine-title">${label}</div>
      <table class="scorecard-table compact">
        <tbody>
          <tr>
            <th>Trou</th>
            ${cells.map((cell) => `<th>${cell.hole.number}</th>`).join("")}
          </tr>
          <tr>
            <td>Par</td>
            ${cells.map((cell) => `<td>${cell.hole.par}</td>`).join("")}
          </tr>
          <tr>
            <td>Brut</td>
            ${cells.map((cell) => `<td>${renderScoreMark(cell)}</td>`).join("")}
          </tr>
          <tr>
            <td>Net</td>
            ${cells.map((cell) => `<td>${cell.points ?? "-"}</td>`).join("")}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function scoreMarkClass(cell) {
  if (!cell.gross) return "";
  const diff = cell.gross - cell.hole.par;
  if (diff <= -2) return "double-circle";
  if (diff === -1) return "circle";
  if (diff === 1) return "square";
  if (diff >= 2) return "double-square";
  return "";
}

function renderScoreMark(cell) {
  if (!cell.gross) return "-";
  const markClass = scoreMarkClass(cell);
  return markClass ? `<span class="score-mark ${markClass}">${cell.gross}</span>` : cell.gross;
}

function renderGroups() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  const groups = visibleGroupsForRound(round.id);
  const assigned = new Set(groups.flatMap((group) => group.playerIds.filter(Boolean)));
  const unassigned = state.players.filter((player) => !assigned.has(player.id));
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Parties de jeu</h3>
          <p class="panel-subtitle">Tour ${round.number} · ${course.name} · sélection des joueurs et du marqueur</p>
        </div>
        <select data-action="select-round">${state.rounds.map((item) => `<option value="${item.id}" ${item.id === round.id ? "selected" : ""}>Tour ${item.number}</option>`).join("")}</select>
      </div>
      <div class="panel-body">
        <div class="actions" style="margin-top:0;margin-bottom:14px">
          ${isAdmin() ? `
            <button class="btn primary" data-action="auto-groups-3">Créer 3 parties</button>
            <button class="btn" data-action="auto-groups-4">Créer 4 parties</button>
            <button class="btn" data-action="add-group">Ajouter une partie</button>
          ` : `<span class="tag blue">Parties créées par l'administrateur</span>`}
        </div>
        ${isAdmin() && unassigned.length ? `<p class="small"><strong>Non affectés :</strong> ${unassigned.map((player) => player.name).join(", ")}</p>` : ""}
        <div class="cards group-list">
          ${groups.length ? groups.map((group, index) => renderGroupCard(group, index)).join("") : `<div class="empty">Aucune partie créée pour ce tour.</div>`}
        </div>
      </div>
    </div>
  `;
}

function renderGroupCard(group, index) {
  const players = group.playerIds.map((id) => state.players.find((player) => player.id === id)).filter(Boolean);
  return `
    <div class="group-card">
      <div class="card-top">
        <div>
          <strong>${group.name || `Partie ${index + 1}`}</strong>
          <div class="small">${players.length || 0} joueur${players.length > 1 ? "s" : ""} · marqueur ${playerName(group.markerId) || "à choisir"}</div>
        </div>
        ${isAdmin() ? `<button class="btn danger" data-remove-group="${group.id}">Supprimer</button>` : ""}
      </div>
      ${isAdmin() ? `
      <div class="group-grid">
        <div class="field">
          <label>Nom</label>
          <input value="${escapeHtml(group.name || "")}" data-group-name="${group.id}" ${isAdmin() ? "" : "readonly"} />
        </div>
        <div class="field">
          <label>Marqueur</label>
          <select data-group-marker="${group.id}" ${isAdmin() ? "" : "disabled"}>
            <option value="">Choisir</option>
            ${group.playerIds.filter(Boolean).map((playerId) => `<option value="${playerId}" ${group.markerId === playerId ? "selected" : ""}>${playerName(playerId)}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="group-slots">
        ${[0, 1, 2, 3].map((slot) => `
          <div class="field">
            <label>Joueur ${slot + 1}</label>
            <select data-group-player="${group.id}:${slot}" ${isAdmin() ? "" : "disabled"}>
              <option value="">Libre</option>
              ${state.players.map((player) => `<option value="${player.id}" ${group.playerIds[slot] === player.id ? "selected" : ""}>${player.name}</option>`).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      ` : ""}
      <div class="actions">
        <button class="btn primary" data-score-group="${group.id}">Saisir cette partie</button>
      </div>
    </div>
  `;
}

function renderNotifications() {
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Alertes shot</h3>
          <p class="panel-subtitle">Birdies, eagles, albatros : les shots à honorer</p>
        </div>
      </div>
      <div class="panel-body cards">
        ${state.notifications.length ? state.notifications.map((item) => `
          <div class="notification">
            <div class="card-top">
              <div>
                <strong>${item.message}</strong>
                <div class="small">${item.detail} · ${item.createdAt}</div>
              </div>
              <span class="tag gold">${labelForUnderPar(item.type)}</span>
            </div>
          </div>
        `).join("") : `<div class="empty">Aucun shot à boire pour le moment.</div>`}
      </div>
    </div>
  `;
}

function courseName(courseId) {
  const course = state.courses.find((item) => item.id === courseId);
  return course ? course.name : "";
}

function groupsForRound(roundId) {
  if (!state.groups) state.groups = createInitialGroups();
  if (!state.groups[roundId]) state.groups[roundId] = [];
  return state.groups[roundId];
}

function visibleGroupsForRound(roundId) {
  const groups = groupsForRound(roundId);
  if (!isPlayerLogin()) return groups;
  return groups.filter((group) => group.playerIds.includes(currentPlayerId));
}

function groupForPlayer(roundId, playerId) {
  return groupsForRound(roundId).find((group) => group.playerIds.includes(playerId));
}

function playerName(playerId) {
  const player = state.players.find((item) => item.id === playerId);
  return player ? player.name : "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function addGroup(roundId) {
  if (!isAdmin()) return requireAdminMessage();
  const groups = groupsForRound(roundId);
  groups.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `g-${Date.now()}`,
    name: `Partie ${groups.length + 1}`,
    playerIds: ["", "", ""],
    markerId: "",
  });
  saveState();
  render();
}

function addPlayer(name, handicapValue) {
  if (!isAdmin()) return requireAdminMessage();
  const cleanName = name.trim();
  const handicap = Number(String(handicapValue).replace(",", "."));
  if (!cleanName || Number.isNaN(handicap) || handicap < 0) return;
  const id = `p-${Date.now()}`;
  state.players.push({
    id,
    name: cleanName,
    handicap: Number(handicap.toFixed(1)),
    initialHandicap: Number(handicap.toFixed(1)),
  });
  saveState();
  render();
}

function autoCreateGroups(roundId, count) {
  if (!isAdmin()) return requireAdminMessage();
  if (!state.groups) state.groups = createInitialGroups();
  const groups = Array.from({ length: count }, (_, index) => ({
    id: crypto.randomUUID ? crypto.randomUUID() : `g-${Date.now()}-${index}`,
    name: `Partie ${index + 1}`,
    playerIds: [],
    markerId: "",
  }));
  state.players.forEach((player, index) => {
    groups[index % count].playerIds.push(player.id);
  });
  groups.forEach((group) => {
    group.markerId = group.playerIds[0] || "";
    while (group.playerIds.length < 4) group.playerIds.push("");
  });
  state.groups[roundId] = groups;
  state.selectedGroupId = groups[0]?.id || "";
  state.selectedPlayerId = groups[0]?.playerIds.find(Boolean) || state.selectedPlayerId;
  saveState();
  render();
}

function updateGroupPlayer(groupId, slot, playerId) {
  if (!isAdmin()) return requireAdminMessage();
  const group = groupsForRound(state.selectedRoundId).find((item) => item.id === groupId);
  if (!group) return;
  if (playerId) {
    groupsForRound(state.selectedRoundId).forEach((item) => {
      item.playerIds = item.playerIds.map((id) => (id === playerId ? "" : id));
      if (item.markerId === playerId && item.id !== groupId) item.markerId = "";
    });
  }
  group.playerIds[slot] = playerId;
  if (group.markerId && !group.playerIds.includes(group.markerId)) group.markerId = "";
  if (!group.markerId && playerId) group.markerId = playerId;
  saveState();
  render();
}

function removeGroup(groupId) {
  if (!isAdmin()) return requireAdminMessage();
  state.groups[state.selectedRoundId] = groupsForRound(state.selectedRoundId).filter((group) => group.id !== groupId);
  if (state.selectedGroupId === groupId) state.selectedGroupId = "";
  saveState();
  render();
}

function playersInSelectedGroup() {
  const group = groupsForRound(state.selectedRoundId).find((item) => item.id === state.selectedGroupId);
  if (!group) return state.players;
  const ids = group.playerIds.filter(Boolean);
  return ids.length ? ids.map((id) => state.players.find((player) => player.id === id)).filter(Boolean) : state.players;
}

function playersInGroup(roundId, groupId) {
  const group = groupsForRound(roundId).find((item) => item.id === groupId);
  if (!group) return [];
  return group.playerIds.filter(Boolean).map((id) => state.players.find((player) => player.id === id)).filter(Boolean);
}

function validateRound() {
  const roundId = state.selectedRoundId;
  const totalHoles = courseForRound(roundId).holes.length;
  const allComplete = state.players.every((player) => playerRoundStats(player, roundId).holesPlayed === totalHoles);
  if (!allComplete && !confirm(`Tous les joueurs n'ont pas ${totalHoles} trous saisis. Valider quand même les handicaps des cartes complètes ?`)) {
    return;
  }
  state.players = state.players.map((player) => {
    const stats = playerRoundStats(player, roundId);
    if (stats.handicapAfter === null) return player;
    return { ...player, handicap: stats.handicapAfter };
  });
  state.validatedRounds[roundId] = true;
  saveState();
  render();
}

function resetScores() {
  if (!confirm("Effacer tous les scores et notifications du prototype ?")) return;
  state.scores = {};
  state.putts = {};
  state.validatedHoles = {};
  state.notifications = [];
  state.players = normalizePlayers(playersSeed);
  state.validatedRounds = {};
  state.seenNotificationCount = 0;
  saveState();
  render();
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.view;
      if (state.activeView === "notifications") {
        state.seenNotificationCount = state.notifications.length;
      }
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-action="logout"]').forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(PLAYER_KEY);
      isAuthenticated = false;
      currentRole = "participant";
      currentPlayerId = "";
      remoteReady = false;
      clearInterval(remotePollTimer);
      clearTimeout(syncTimer);
      render();
    });
  });

  document.querySelectorAll('[data-action="open-augusta"]').forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = "augusta";
      saveState();
      render();
      requestLandscapeMode();
    });
  });

  document.querySelectorAll('[data-action="close-augusta"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeAugustaMode();
    });
  });

  document.querySelectorAll('[data-action="toggle-position-race"]').forEach((panel) => {
    panel.addEventListener("click", () => {
      state.showPositionRace = !state.showPositionRace;
      saveLocalOnly();
      render();
    });
    panel.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      state.showPositionRace = !state.showPositionRace;
      saveLocalOnly();
      render();
    });
  });

  document.querySelectorAll("[data-round]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedRoundId = button.dataset.round;
      state.selectedGroupId = "";
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-home-round]").forEach((button) => {
    button.addEventListener("click", () => {
      state.homePreviewRoundId = state.homePreviewRoundId === button.dataset.homeRound ? "" : button.dataset.homeRound;
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-action="select-round"]').forEach((select) => {
    select.addEventListener("change", () => {
      state.selectedRoundId = select.value;
      state.selectedGroupId = "";
      state.activeScoreCell = null;
      state.activeMobileHole = 1;
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-action="select-player"]').forEach((select) => {
    select.addEventListener("change", () => {
      state.selectedPlayerId = select.value;
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-action="select-marker"]').forEach((select) => {
    select.addEventListener("change", () => {
      const group = groupsForRound(state.selectedRoundId).find((item) => item.id === state.selectedGroupId);
      if (group && group.playerIds.includes(select.value)) group.markerId = select.value;
      state.selectedPlayerId = select.value;
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-action="select-group"]').forEach((select) => {
    select.addEventListener("change", () => {
      if (select.value) {
        startGroupScoreEntry(state.selectedRoundId, select.value);
      } else {
        state.selectedGroupId = "";
        state.activeMobileHole = 1;
        state.activeScoreCell = null;
      }
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-score]").forEach((input) => {
    input.addEventListener("change", () => {
      const [roundId, playerId, hole] = input.dataset.score.split(":");
      setGross(roundId, playerId, Number(hole), input.value);
    });
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
    });
  });

  document.querySelectorAll("[data-score-cell]").forEach((button) => {
    button.addEventListener("click", () => {
      const [roundId, playerId, hole, kind] = button.dataset.scoreCell.split(":");
      setActiveScoreCell(roundId, playerId, Number(hole), kind || "score");
    });
  });

  document.querySelectorAll("[data-keypad-score]").forEach((button) => {
    button.addEventListener("click", () => keypadScore(button.dataset.keypadScore));
  });

  document.querySelectorAll("[data-keypad-clear]").forEach((button) => {
    button.addEventListener("click", clearActiveScore);
  });

  document.querySelectorAll("[data-mobile-hole-prev]").forEach((button) => {
    button.addEventListener("click", () => {
      const course = courseForRound(state.selectedRoundId);
      const currentIndex = course.holes.findIndex((hole) => hole.number === state.activeMobileHole);
      const previous = course.holes[Math.max(0, currentIndex - 1)];
      if (!previous) return;
      state.activeMobileHole = previous.number;
      const firstPlayer = activeGroupPlayers()[0];
      state.activeScoreCell = firstPlayer ? { roundId: state.selectedRoundId, playerId: firstPlayer.id, holeNumber: previous.number, kind: "score" } : null;
      saveLocalOnly();
      render();
    });
  });

  document.querySelectorAll("[data-mobile-hole-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const course = courseForRound(state.selectedRoundId);
      const currentIndex = course.holes.findIndex((hole) => hole.number === state.activeMobileHole);
      const next = course.holes[Math.min(course.holes.length - 1, currentIndex + 1)];
      if (!next) return;
      state.activeMobileHole = next.number;
      const firstPlayer = activeGroupPlayers()[0];
      state.activeScoreCell = firstPlayer ? { roundId: state.selectedRoundId, playerId: firstPlayer.id, holeNumber: next.number, kind: "score" } : null;
      saveLocalOnly();
      render();
    });
  });

  document.querySelectorAll("[data-validate-hole]").forEach((button) => {
    button.addEventListener("click", () => {
      const [roundId, groupId, hole] = button.dataset.validateHole.split(":");
      validateHole(roundId, groupId, Number(hole));
      const players = activeGroupPlayers();
      const course = courseForRound(roundId);
      const nextHole = course.holes.find((item) => item.number > Number(hole));
      if (nextHole && players[0]) {
        state.activeScoreCell = { roundId, playerId: players[0].id, holeNumber: nextHole.number, kind: "score" };
        state.activeMobileHole = nextHole.number;
        saveLocalOnly();
        render();
      }
    });
    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      button.click();
    });
  });

  document.querySelectorAll("[data-player-handicap]").forEach((input) => {
    input.addEventListener("change", () => {
      if (!isAdmin()) return requireAdminMessage();
      const value = Number(String(input.value).replace(",", "."));
      if (Number.isNaN(value) || value < 0) {
        render();
        return;
      }
      const handicap = Number(value.toFixed(1));
      state.players = state.players.map((player) => (
        player.id === input.dataset.playerHandicap ? { ...player, handicap, initialHandicap: handicap } : player
      ));
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-setting="anonymize-leaderboards"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (!isAdmin()) return requireAdminMessage();
      state.anonymizeParticipantLeaderboards = input.checked;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-add-player-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!isAdmin()) return requireAdminMessage();
      addPlayer(form.querySelector("[data-new-player-name]").value, form.querySelector("[data-new-player-handicap]").value);
    });
  });

  document.querySelectorAll("[data-score-group]").forEach((button) => {
    button.addEventListener("click", () => {
      startGroupScoreEntry(state.selectedRoundId, button.dataset.scoreGroup);
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-action="auto-groups-3"]').forEach((button) => {
    button.addEventListener("click", () => autoCreateGroups(state.selectedRoundId, 3));
  });

  document.querySelectorAll('[data-action="auto-groups-4"]').forEach((button) => {
    button.addEventListener("click", () => autoCreateGroups(state.selectedRoundId, 4));
  });

  document.querySelectorAll('[data-action="add-group"]').forEach((button) => {
    button.addEventListener("click", () => addGroup(state.selectedRoundId));
  });

  document.querySelectorAll("[data-remove-group]").forEach((button) => {
    button.addEventListener("click", () => removeGroup(button.dataset.removeGroup));
  });

  document.querySelectorAll("[data-group-name]").forEach((input) => {
    input.addEventListener("change", () => {
      if (!isAdmin()) return requireAdminMessage();
      const group = groupsForRound(state.selectedRoundId).find((item) => item.id === input.dataset.groupName);
      if (group) group.name = input.value.trim() || group.name;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-group-marker]").forEach((select) => {
    select.addEventListener("change", () => {
      if (!isAdmin()) return requireAdminMessage();
      const group = groupsForRound(state.selectedRoundId).find((item) => item.id === select.dataset.groupMarker);
      if (group) group.markerId = select.value;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-group-player]").forEach((select) => {
    select.addEventListener("change", () => {
      const [groupId, slot] = select.dataset.groupPlayer.split(":");
      updateGroupPlayer(groupId, Number(slot), select.value);
    });
  });

  const validate = document.querySelector('[data-action="validate-round"]');
  if (validate) validate.addEventListener("click", validateRound);

  const reset = document.querySelector('[data-action="reset-scores"]');
  if (reset) reset.addEventListener("click", resetScores);

  document.querySelectorAll("[data-import-scores]").forEach((input) => {
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => importScoreCsv(String(reader.result || ""));
      reader.readAsText(file);
    });
  });
}

if (isAuthenticated) {
  startRemoteSync();
}
render();
