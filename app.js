const STORAGE_KEY = "open-de-panse-mvp-state-v3";
const AUTH_KEY = "open-de-panse-auth-v1";
const ROLE_KEY = "open-de-panse-role-v1";
const PARTICIPANT_PASSWORD = "panse2026";
const ADMIN_PASSWORD = "panseadmin2026";
const SUPABASE_URL = "https://pvqzyysapstdozequtkw.supabase.co";
const SUPABASE_KEY = "sb_publishable_w7E0RSqEulwTpKLAwyjBow_J1wKlt2a";
const SUPABASE_STATE_ID = "open-de-panse-2026";

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
  ["p4", "Gege", 38],
  ["p5", "Nanou", 21],
  ["p6", "Pierrot", 47],
  ["p7", "Lutcho", 24],
  ["p8", "Nonoz", 28],
  ["p9", "Ben", 26],
  ["p10", "Manu", 41],
  ["p11", "La Roquette", 33],
  ["p12", "Greg'z", 16],
].map(([id, name, handicap]) => ({ id, name, handicap }));

function makeHoles(pars, sis) {
  return pars.map((par, index) => ({ number: index + 1, par, strokeIndex: sis[index] }));
}

const coursesSeed = [
  {
    id: "castelconturbia",
    club: "Golf Club Castelconturbia",
    name: "Yellow + Blue Championship",
    location: "Agrate Conturbia, Piemonte",
    note: "Composition 18 trous : Yellow Course - Pini puis Blue Course - Castagni. Format championship par 72.",
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
  { id: "r2", number: 2, date: "Jeudi 4 juin 2026", time: "matin", courseId: "bogogno-bonora", status: "à venir" },
  { id: "r3", number: 3, date: "Jeudi 4 juin 2026", time: "après-midi", courseId: "bogogno-del-conte", status: "à venir" },
  { id: "r4", number: 4, date: "Vendredi 5 juin 2026", time: "", courseId: "le-robinie", status: "à venir" },
];

let state = loadState();
let isAuthenticated = localStorage.getItem(AUTH_KEY) === "ok";
let currentRole = localStorage.getItem(ROLE_KEY) || "participant";
let remoteReady = false;
let isApplyingRemote = false;
let syncTimer = null;
const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);

function createInitialState() {
  return {
    activeView: "home",
    selectedRoundId: "r1",
    selectedGroupId: "",
    selectedPlayerId: "p1",
    rounds: roundsSeed,
    courses: coursesSeed,
    players: playersSeed,
    groups: createInitialGroups(),
    scores: {},
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
    return { ...createInitialState(), ...parsed };
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
    rounds: state.rounds,
    courses: state.courses,
    players: state.players,
    groups: state.groups,
    scores: state.scores,
    validatedHoles: state.validatedHoles,
    notifications: state.notifications,
    validatedRounds: state.validatedRounds,
  };
}

function applyRemoteState(data) {
  if (!data || typeof data !== "object") return;
  isApplyingRemote = true;
  state = {
    ...state,
    ...data,
    activeView: state.activeView,
    selectedRoundId: state.selectedRoundId,
    selectedGroupId: state.selectedGroupId,
    selectedPlayerId: state.selectedPlayerId,
  };
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
  const { error } = await supabaseClient
    .from("app_state")
    .upsert({ id: SUPABASE_STATE_ID, data: publicState() });
  if (error) console.warn("Supabase save failed", error);
}

async function loadRemoteState() {
  if (!supabaseClient || !isAuthenticated) return;
  const { data, error } = await supabaseClient
    .from("app_state")
    .select("data")
    .eq("id", SUPABASE_STATE_ID)
    .single();
  if (error) {
    console.warn("Supabase load failed", error);
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

function courseForRound(roundId) {
  const round = state.rounds.find((item) => item.id === roundId);
  return state.courses.find((course) => course.id === round.courseId);
}

function selectedRound() {
  return state.rounds.find((round) => round.id === state.selectedRoundId);
}

function selectedPlayer() {
  return state.players.find((player) => player.id === state.selectedPlayerId);
}

function roundScoreKey(roundId, playerId, holeNumber) {
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

function holeValidationKey(roundId, groupId, holeNumber) {
  return `${roundId}:${groupId || "all"}:${holeNumber}`;
}

function isHoleValidated(roundId, groupId, holeNumber) {
  if (!state.validatedHoles) state.validatedHoles = {};
  return Boolean(state.validatedHoles[holeValidationKey(roundId, groupId, holeNumber)]);
}

function setGross(roundId, playerId, holeNumber, value) {
  const key = roundScoreKey(roundId, playerId, holeNumber);
  const nextValue = Number(value);
  if (!value || Number.isNaN(nextValue) || nextValue < 1) {
    delete state.scores[key];
  } else {
    state.scores[key] = nextValue;
  }
  saveState();
  render();
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
  state.notifications.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    roundId,
    playerId,
    holeNumber,
    type,
    message: `${player.name} · trou ${holeNumber} · ${labelForUnderPar(type)} brut`,
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
  const course = courseForRound(roundId);
  const handicapValue = courseHandicap(player, course);
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

  const handicapAfter = player.handicap - ((points - 36) * 0.5);
  return {
    points,
    grossTotal,
    holesPlayed,
    relative,
    underPar,
    handicapValue,
    handicapAfter: holesPlayed === course.holes.length ? Math.max(0, Number(handicapAfter.toFixed(1))) : null,
    tee: teeForPlayer(player, course),
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
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      <main class="container">
        <section class="view ${state.activeView === "home" ? "active" : ""}">${renderHome()}</section>
        <section class="view ${state.activeView === "leaderboard" ? "active" : ""}">${renderLeaderboard()}</section>
        <section class="view ${state.activeView === "score" ? "active" : ""}">${renderScoreEntry()}</section>
        <section class="view ${state.activeView === "groups" ? "active" : ""}">${renderGroups()}</section>
        <section class="view ${state.activeView === "players" ? "active" : ""}">${renderPlayers()}</section>
        <section class="view ${state.activeView === "notifications" ? "active" : ""}">${renderNotifications()}</section>
      </main>
      ${renderTabs()}
    </div>
  `;
  bindEvents();
}

function renderLogin() {
  return `
    <div class="login-screen">
      <div class="login-panel">
        <img class="login-logo" src="assets/open-de-panse-logo.png?v=3" alt="Logo Open de Panse" />
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
      currentRole = "admin";
      isAuthenticated = true;
      startRemoteSync();
      render();
      return;
    }
    if (value === PARTICIPANT_PASSWORD || value === "pense2026") {
      localStorage.setItem(AUTH_KEY, "ok");
      localStorage.setItem(ROLE_KEY, "participant");
      currentRole = "participant";
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

function requireAdminMessage() {
  alert("Cette action est réservée à l'administrateur.");
}

async function startRemoteSync() {
  if (!supabaseClient || !isAuthenticated) return;
  await loadRemoteState();
  subscribeRemoteState();
  render();
}

function renderTopbar() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand-lockup">
          <img class="brand-logo" src="assets/open-de-panse-logo.png?v=3" alt="Logo Open de Panse" />
          <div class="brand">
            <h1>Open de Panse</h1>
            <span>Stableford net - 4 tours - MVP</span>
          </div>
        </div>
        <span class="status-pill">${currentRole === "admin" ? "Admin" : "Participant"} · ${remoteReady ? "Live" : "Local"}</span>
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
    ["notifications", "Alertes", icons.bell],
  ];
  return `<nav class="tabs">${tabs.map(([id, label, icon]) => `
    <button class="tab ${state.activeView === id ? "active" : ""}" data-view="${id}" title="${label}">${icon}${label}</button>
  `).join("")}</nav>`;
}

function renderHome() {
  const cumulative = sortedLeaderboard("cumulative");
  const leader = cumulative[0];
  const completedScores = Object.keys(state.scores).length;
  return `
    <div class="hero">
      <div class="hero-main">
        <img class="hero-logo" src="assets/open-de-panse-logo.png?v=3" alt="Logo Open de Panse" />
        <div>
          <h2>Le scoring live de l'Open de Panse est prêt à prendre le départ.</h2>
          <p>Quatre tours réels, calcul WHS, Stableford net, alertes birdie et handicap Open de Panse mis à jour après validation.</p>
        </div>
      </div>
      <div class="metric-row">
        <div class="metric"><strong>${state.players.length}</strong><span>joueurs</span></div>
        <div class="metric"><strong>${state.rounds.length}</strong><span>tours</span></div>
        <div class="metric"><strong>${completedScores}</strong><span>scores saisis</span></div>
        <div class="metric"><strong>${leader ? leader.stats.points : 0}</strong><span>points leader</span></div>
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
        <div class="panel-body cards">${state.rounds.map(renderRoundCard).join("")}</div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Leader cumulé</h3>
            <p class="panel-subtitle">Classement Stableford net sur les tours joués</p>
          </div>
        </div>
        <div class="panel-body">${leader ? `
          <div class="player-name">${leader.player.name}</div>
          <div class="score-big positive">${leader.stats.points} pts</div>
          <p class="small">${leader.stats.holesPlayed} trous joués · brut ${leader.stats.grossTotal || "-"} · ${formatRelative(leader.stats.relative)}</p>
        ` : `<div class="empty">Aucun score saisi.</div>`}</div>
      </div>
    </div>
    <div class="panel" style="margin-top:14px">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Dernières alertes</h3>
          <p class="panel-subtitle">Birdies, eagles et autres scores bruts sous le par</p>
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
        `).join("") : `<div class="empty">Les premiers birdies apparaîtront ici.</div>`}
      </div>
    </div>
  `;
}

function renderRoundCard(round) {
  const course = state.courses.find((item) => item.id === round.courseId);
  return `
    <button class="round-card ${state.selectedRoundId === round.id ? "active" : ""}" data-round="${round.id}">
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
    <div class="panel" style="margin-top:14px">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Classement cumulé</h3>
          <p class="panel-subtitle">Total Stableford net sur tous les tours</p>
        </div>
      </div>
      <div class="panel-body">
        ${renderLeaderboardTable(sortedLeaderboard("cumulative"))}
      </div>
    </div>
  `;
}

function renderLeaderboardTable(rows) {
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

function renderScoreEntry() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  const groups = groupsForRound(round.id);
  const groupPlayers = playersInSelectedGroup();
  if (!groupPlayers.some((item) => item.id === state.selectedPlayerId)) {
    state.selectedPlayerId = groupPlayers[0]?.id || state.players[0].id;
  }
  const player = selectedPlayer();
  const stats = playerRoundStats(player, round.id);
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Saisie des scores</h3>
          <p class="panel-subtitle">Tour ${round.number} · ${course.name}</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="controls">
          <div class="field">
            <label>Tour</label>
            <select data-action="select-round">${state.rounds.map((item) => `<option value="${item.id}" ${item.id === round.id ? "selected" : ""}>Tour ${item.number} - ${courseName(item.courseId)}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label>Joueur</label>
            <select data-action="select-player">${groupPlayers.map((item) => `<option value="${item.id}" ${item.id === player.id ? "selected" : ""}>${item.name}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label>Partie</label>
            <select data-action="select-group">
              <option value="">Tous les joueurs</option>
              ${groups.map((group) => `<option value="${group.id}" ${group.id === state.selectedGroupId ? "selected" : ""}>${group.name}</option>`).join("")}
            </select>
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
        ${state.selectedGroupId ? renderGroupScoreGrid(round.id, course, groupPlayers) : `
          <div class="scorecard">
            ${course.holes.map((hole) => renderHoleInput(round.id, player, course, hole, stats.handicapValue)).join("")}
          </div>
        `}
        <div class="actions">
          <button class="btn primary" data-action="validate-round">Valider le tour et appliquer les handicaps</button>
          <button class="btn" data-view="groups">Créer ou modifier les parties</button>
          <button class="btn danger" data-action="reset-scores">Effacer les scores du prototype</button>
        </div>
      </div>
    </div>
  `;
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
    <div class="score-grid-wrap">
      <table class="score-grid">
        <thead>
          <tr>
            <th>Trou</th>
            <th>Par</th>
            <th>SI</th>
            ${players.map((player) => {
              const stats = playerRoundStats(player, roundId);
              return `<th><span>${player.name}</span><small>${stats.tee.label} · ${stats.handicapValue} CR</small></th>`;
            }).join("")}
            <th>Validation</th>
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
                const stats = playerRoundStats(player, roundId);
                const strokes = strokesOnHole(stats.handicapValue, hole.strokeIndex);
                const points = stablefordPoints(hole.par, gross, strokes);
                const type = underParType(hole.par, gross);
                return `
                  <td class="${type ? "under-par-cell" : ""}">
                    <input class="grid-score-input" type="tel" inputmode="numeric" pattern="[0-9]*" autocomplete="off" enterkeyhint="next" value="${gross}" data-score="${roundId}:${player.id}:${hole.number}" aria-label="${player.name} trou ${hole.number}" />
                    <small>${points ?? "-"} pt${points > 1 ? "s" : ""} · ${strokes >= 0 ? "+" : ""}${strokes}</small>
                  </td>
                `;
              }).join("")}
              <td>
                <button class="btn ${isHoleValidated(roundId, state.selectedGroupId, hole.number) ? "" : "primary"}" data-validate-hole="${roundId}:${state.selectedGroupId}:${hole.number}">
                  ${isHoleValidated(roundId, state.selectedGroupId, hole.number) ? "Validé" : "Valider"}
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlayers() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Joueurs</h3>
          <p class="panel-subtitle">Handicap, départ recommandé et coups rendus sur le tour sélectionné</p>
        </div>
      </div>
      <div class="panel-body cards">
        ${state.players.map((player) => {
          const stats = playerRoundStats(player, round.id);
          return `
            <div class="player-card">
              <div class="card-top">
                <div>
                  <strong>${player.name}</strong>
                  <div class="small">Handicap Open de Panse ${player.handicap.toFixed(1)}</div>
                  <div class="small">${course.name} · ${stats.tee.label} · slope ${stats.tee.slope}</div>
                </div>
                <span class="tag green">${stats.handicapValue} CR</span>
              </div>
              <div class="player-edit-row">
                <div class="field">
                  <label>Handicap de départ</label>
                  <input type="tel" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" autocomplete="off" value="${player.handicap.toFixed(1)}" data-player-handicap="${player.id}" ${isAdmin() ? "" : "readonly"} />
                </div>
              </div>
              <div class="actions">
                <button class="btn" data-player-score="${player.id}">Saisir</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderGroups() {
  const round = selectedRound();
  const course = courseForRound(round.id);
  const groups = groupsForRound(round.id);
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
        ${unassigned.length ? `<p class="small"><strong>Non affectés :</strong> ${unassigned.map((player) => player.name).join(", ")}</p>` : `<p class="small positive"><strong>Tous les joueurs sont affectés à une partie.</strong></p>`}
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
          <h3 class="panel-title">Notifications</h3>
          <p class="panel-subtitle">Birdies, eagles, albatros et meilleurs scores bruts sous le par</p>
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
        `).join("") : `<div class="empty">Aucun score brut sous le par pour le moment.</div>`}
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
  state.validatedHoles = {};
  state.notifications = [];
  state.players = playersSeed.map((player) => ({ ...player }));
  state.validatedRounds = {};
  saveState();
  render();
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.view;
      saveState();
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

  document.querySelectorAll('[data-action="select-round"]').forEach((select) => {
    select.addEventListener("change", () => {
      state.selectedRoundId = select.value;
      state.selectedGroupId = "";
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

  document.querySelectorAll('[data-action="select-group"]').forEach((select) => {
    select.addEventListener("change", () => {
      state.selectedGroupId = select.value;
      const firstPlayer = playersInSelectedGroup()[0];
      if (firstPlayer) state.selectedPlayerId = firstPlayer.id;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-score]").forEach((input) => {
    input.addEventListener("change", () => {
      const [roundId, playerId, hole] = input.dataset.score.split(":");
      setGross(roundId, playerId, Number(hole), input.value);
    });
  });

  document.querySelectorAll("[data-validate-hole]").forEach((button) => {
    button.addEventListener("click", () => {
      const [roundId, groupId, hole] = button.dataset.validateHole.split(":");
      validateHole(roundId, groupId, Number(hole));
    });
  });

  document.querySelectorAll("[data-player-score]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPlayerId = button.dataset.playerScore;
      state.activeView = "score";
      saveState();
      render();
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
      state.players = state.players.map((player) => (
        player.id === input.dataset.playerHandicap ? { ...player, handicap: Number(value.toFixed(1)) } : player
      ));
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-score-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = groupsForRound(state.selectedRoundId).find((item) => item.id === button.dataset.scoreGroup);
      state.selectedGroupId = button.dataset.scoreGroup;
      state.selectedPlayerId = group?.playerIds.find(Boolean) || state.selectedPlayerId;
      state.activeView = "score";
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
}

if (isAuthenticated) {
  startRemoteSync();
}
render();
