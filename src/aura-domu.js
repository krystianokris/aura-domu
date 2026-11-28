// Aura domu — karta Home Assistanta · v0.12.1
// https://github.com/krystianokris/aura-domu · licencja MIT
// Instalacja: HACS (repozytorium niestandardowe, kategoria Dashboard) albo ręcznie:
//   1) skopiuj dist/aura-domu.js do /config/www/aura-domu.js
//   2) Ustawienia → Pulpity → ⋮ → Zasoby → /local/aura-domu.js?v=0.12.1 (Moduł JavaScript)
//   3) pulpit z widokiem „Panel” i kartą `type: custom:aura-domu`
// Pełny przykład konfiguracji: examples/aura-domu.yaml i README.
const AURA_CSS = `
:host{display:block;font:400 14px/1.45 'Inter Tight',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-tap-highlight-color:transparent}
*{box-sizing:border-box}
button,input,select{font:inherit;color:inherit}
button{cursor:pointer;border:0;background:none;padding:0;text-align:inherit}
button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
button:disabled{opacity:.45;cursor:default}
h1,h2,h3,p{margin:0}
svg{display:block}
button svg{flex:none}
[hidden]{display:none!important}

/* ---------- materiał: jedna paleta, jedno światło ---------- */
.aura{
  --base:#e8ebef;--high:#f6f8fa;--low:#e2e6eb;--edge:#ffffffb2;--glint:#ffffffba;--lift:#ffffffd9;--drop:#21314935;--inset:#26384e24;--tint:#f5cdb7;
  --ink:#20252a;--muted:#59636b;--symbol:#8e989b;--accent:#9d4935;--hot:#e68768;--wash:#fbe6dc;--aqua:#4f8a78;--good:#2f7f55;--warn:#a2670f;--bad:#b33c35;
  --convex:linear-gradient(145deg,var(--high),var(--low));--concave:linear-gradient(145deg,var(--low),var(--high));
  --raised:-7px -7px 15px var(--lift),8px 10px 18px var(--drop),inset 0 1px 0 var(--edge);
  --raised-sm:-4px -4px 9px var(--lift),5px 6px 12px var(--drop),inset 0 1px 0 var(--edge);
  --raised-xs:-2px -2px 5px var(--lift),3px 3px 6px var(--drop);
  --sunken:inset 6px 7px 14px var(--inset),inset -5px -5px 12px var(--lift);
  --sunken-sm:inset 3px 4px 8px var(--inset),inset -3px -3px 7px var(--lift);
  color-scheme:light;min-height:100vh;background:var(--base);color:var(--ink);padding:0 max(20px,calc((100% - 1192px)/2)) 48px;transition:background .4s,color .4s}
.aura[data-theme=dark]{color-scheme:dark;
  --base:#15181e;--high:#242932;--low:#191d24;--edge:#ffffff13;--glint:#ffffff1c;--lift:#ffffff0c;--drop:#0009;--inset:#0008;--tint:#7d4638;
  --ink:#eef0f2;--muted:#a8b1b5;--symbol:#7b878d;--accent:#f6ab8e;--hot:#f29a7c;--wash:#412e2c;--aqua:#a1c6b8;--good:#6fcf9b;--warn:#e9b45a;--bad:#ff9a90}
.tile,.entity,.quiet,.theme,.state-chip,.preset,.round,.mini,.toggle,.activity button,.arrow,.label svg,.entity-icon{background:var(--convex);border:1px solid var(--edge)}
.tile{box-shadow:var(--raised)}
.entity,.activity button{box-shadow:var(--raised-sm)}
.quiet,.theme,.state-chip,.preset,.round,.mini,.toggle,.arrow,.label svg,.entity-icon{box-shadow:var(--raised-xs)}
.quiet:active,.theme:active,.preset:active,.round:active,.mini:active,.toggle:active,.arrow:active,.activity button:active{box-shadow:var(--sunken-sm)}
.preset[aria-pressed=true],.toggle[aria-pressed=true]{background:var(--concave);border-color:transparent;color:var(--accent);box-shadow:var(--sunken-sm),inset 0 0 0 1px color-mix(in srgb,var(--hot) 32%,transparent)}
.search,.filter{border:1px solid transparent;background:var(--concave);box-shadow:var(--sunken-sm);border-radius:14px;min-height:44px;padding:0 14px}

/* ---------- góra ---------- */
.top{min-height:75px;display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:12px}
.brand{display:flex;align-items:center;gap:10px;white-space:nowrap;font-weight:600;letter-spacing:-.025em;font-size:18px}
.brand-mark{width:27px;height:27px;border:1px solid var(--symbol);border-radius:50%;position:relative;transform:rotate(-33deg)}
.brand-mark::before{content:'';position:absolute;inset:6px -3px;border:1px solid var(--symbol);border-radius:50%;transform:rotate(-12deg)}
.brand-mark::after{content:'';position:absolute;left:19px;top:5px;width:8px;height:8px;border-radius:50%;background:var(--hot);border:2px solid var(--base)}
.nav{display:flex;gap:4px;padding:4px;border-radius:999px;background:var(--low);box-shadow:var(--sunken-sm)}
.nav button{padding:8px 17px;border-radius:999px;color:var(--muted);min-height:38px;border:1px solid transparent;transition:color .2s,background .2s,box-shadow .2s}
.nav button:hover{color:var(--ink)}
.nav [aria-current=page]{color:var(--ink);background:var(--convex);border-color:var(--edge);box-shadow:var(--raised-xs)}
.top-right{display:flex;align-items:center;gap:12px}
.connection{color:var(--muted);white-space:nowrap;font-size:12px}
.led{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--hot);margin-right:6px}
.connection[data-offline] .led{background:var(--symbol)}
.theme{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;color:var(--muted)}
.theme svg{width:17px;height:17px}
.quiet{border-radius:999px;padding:7px 13px;min-height:34px;font-size:12px;color:var(--ink);white-space:nowrap}
.quiet:hover,.theme:hover{color:var(--accent)}
.reset{color:var(--muted);padding:8px 12px;border-radius:999px}
.reset:hover{color:var(--ink)}

/* ---------- scena ---------- */
.stage{--signal:#a43e2c;--signal-glow:#f9bb952d;--orb-hue:30;--orb-tempo:6s;position:relative;isolation:isolate;display:grid;grid-template-columns:.87fr 1.13fr;min-height:379px;border-radius:33px;overflow:hidden;background:var(--concave);box-shadow:inset 8px 10px 23px var(--inset),inset -8px -9px 22px var(--lift)}
.aura[data-theme=dark] .stage{--signal:#ffd0b8;--signal-glow:#f9bb9526}
.stage[data-kind=laundry]{--signal:#227a63;--signal-glow:#7acdb73d}
.stage[data-kind=energy]{--signal:#925915;--signal-glow:#e7aa5343}
.stage[data-kind=alert]{--signal:#b33c35;--signal-glow:#ee6a6040}
.aura[data-theme=dark] .stage[data-kind=laundry]{--signal:#b7efdc}
.aura[data-theme=dark] .stage[data-kind=energy]{--signal:#fadcaa}
.aura[data-theme=dark] .stage[data-kind=alert]{--signal:#ffb1a9}
.stage::before{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(ellipse at 75% 53%,var(--signal-glow),transparent 54%)}
.stage-copy{position:relative;z-index:2;padding:34px 0 68px 41px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;min-width:0}
.stage-copy.is-event{animation:rise .45s ease both}
.date{font-size:11px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:9px}
.date::before{content:'';width:21px;height:1px;background:var(--signal);box-shadow:0 0 12px var(--signal)}
.clock{font-size:clamp(65px,9.3vw,109px);font-weight:300;letter-spacing:-.09em;line-height:1.04;font-variant-numeric:tabular-nums;margin:5px 0 4px}
.stage-copy.is-event .clock{display:none}
.headline{font-size:clamp(27px,4vw,50px);font-weight:420;letter-spacing:-.06em;line-height:1.1;max-width:17ch;overflow-wrap:anywhere}
.stage-copy:not(.is-event) .headline{font-size:clamp(23px,3vw,33px);letter-spacing:-.04em}
.stage-copy.is-event .headline{margin-top:12px}
#summary{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px;color:var(--muted);min-height:1.45em}
.state-chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:5px 9px;font-size:11px;color:var(--ink)}
.state-chip svg{width:13px;height:13px;color:var(--signal)}
.stage-foot{position:absolute;inset:auto 20px 0 41px;min-height:45px;display:flex;align-items:center;gap:10px;z-index:3;color:var(--muted);font-size:12px;border-top:1px solid color-mix(in srgb,var(--muted) 19%,transparent);pointer-events:none}
.stage-foot button{pointer-events:auto;margin-left:auto;min-height:31px;padding:5px 11px}
.weather{display:flex;align-items:center;gap:8px}
.weather svg{width:16px;height:16px;color:var(--signal)}
.weather:empty{display:none}
.orb-zone{position:relative;display:grid;place-items:center;min-height:377px;margin-right:10px;isolation:isolate}
.orbit{position:absolute;width:min(93%,424px);aspect-ratio:1;pointer-events:none;overflow:visible;color:var(--muted);opacity:.59;transform:rotate(-14deg);transition:transform .8s cubic-bezier(.2,.75,.2,1),opacity .55s}
.stage[data-awake=true] .orbit{transform:rotate(19deg) scale(1.07);opacity:.28}
.orbit .track{stroke-dasharray:3 5;opacity:.62}
.orbit .trace{stroke:var(--signal);stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .9s .15s}
.stage[data-awake=true] .trace{stroke-dashoffset:0}
.orbit .point{fill:var(--hot);stroke:none;transform-origin:180px 180px;animation:orbit 28s linear infinite;filter:drop-shadow(0 0 4px var(--hot))}
.orbit .point.secondary{animation-direction:reverse;animation-duration:45s}
.ring-calibration{transform-origin:180px 180px;animation:orbit 88s linear infinite}
.room-signal{fill:var(--muted);stroke:none;opacity:.55;transition:fill .5s,opacity .5s}
.room-signal.active{fill:var(--hot);opacity:1;filter:drop-shadow(0 0 3px var(--hot))}
.orbit-halo{position:absolute;width:min(93%,424px);aspect-ratio:1;border-radius:50%;pointer-events:none;z-index:-1;background:radial-gradient(ellipse,hsl(var(--orb-hue) 78% 63% / .3) 0,transparent 64%);animation:halo var(--orb-tempo) ease-in-out infinite;transition:background 1.2s}
.orb-contact{position:absolute;left:50%;top:74%;width:clamp(66px,12vw,145px);height:21px;transform:translateX(-50%);background:radial-gradient(closest-side,var(--drop),transparent);filter:blur(4px);animation:contact var(--orb-tempo) ease-in-out infinite;pointer-events:none;transition:opacity .4s}
.stage[data-awake=true] .orb-contact{opacity:0;animation:none}
.orb{--orb-x:0;--orb-y:0;--orb-size:1;position:relative;z-index:2;width:clamp(115px,18vw,207px);aspect-ratio:1;border-radius:50%;
  background:radial-gradient(ellipse at 32% 21%,#fffffff5,transparent 30%),radial-gradient(ellipse at 71% 78%,hsl(var(--orb-hue) 80% 72% / .5),transparent 40%),radial-gradient(circle at 35% 28%,hsl(var(--orb-hue) 47% 96%),hsl(var(--orb-hue) 23% 85%) 46%,hsl(var(--orb-hue) 22% 63%) 90%);
  box-shadow:inset -13px -16px 30px #4b566348,inset 8px 11px 20px #fff9,inset 0 0 0 1px #fff8,0 23px 34px -22px var(--drop);
  transform:translate(var(--orb-x),var(--orb-y)) scale(var(--orb-size));transition:transform .9s cubic-bezier(.19,1,.22,1),filter .5s,background 1.2s;animation:float var(--orb-tempo) ease-in-out infinite}
.aura[data-theme=dark] .orb{background:radial-gradient(ellipse at 34% 23%,#f7f8ffe8,transparent 28%),radial-gradient(ellipse at 73% 78%,hsl(var(--orb-hue) 75% 70% / .5),transparent 41%),radial-gradient(circle at 35% 29%,hsl(var(--orb-hue) 29% 83%),hsl(var(--orb-hue) 18% 49%) 54%,hsl(var(--orb-hue) 19% 28%) 88%);box-shadow:inset -13px -15px 30px #070c17a8,inset 9px 10px 15px #fff4,0 28px 38px -21px #000}
.orb::before,.orb::after{content:'';position:absolute;border-radius:50%;pointer-events:none;border:1px solid transparent}
.orb::before{inset:6% 10% 16% 6%;border-top-color:#fff9;border-left-color:#fff4;transform:rotate(-14deg)}
.orb::after{inset:8% 4% 2% 20%;border-bottom-color:#ffead777;border-right-color:#e8e5d850;transform:rotate(15deg)}
.orb:hover{--orb-size:1.05;filter:brightness(1.06)}
.stage[data-mood=alert] .orb{outline:1px solid var(--bad);outline-offset:12px}
.stage[data-mood=night] .orb{filter:brightness(.82) saturate(.7)}
.stage[data-awake=true] .orb{--orb-x:-83%;--orb-y:38%;--orb-size:.24;animation:glow 2s ease-in-out infinite;outline:1px solid var(--signal);outline-offset:12px}
.orb-caption{position:absolute;bottom:55px;left:0;right:0;text-align:center;color:var(--muted);font-size:11px;letter-spacing:.06em;pointer-events:none;transition:opacity .3s}
.stage[data-mood=alert] .orb-caption{color:var(--bad);font-weight:600}
.stage[data-awake=true] .orb-caption{opacity:0}
.scene{position:absolute;inset:7% 8% 12%;display:grid;place-items:center;color:var(--signal);z-index:1;pointer-events:none}
.scene svg{grid-area:1/1;width:min(100%,340px);height:auto;visibility:hidden;opacity:0;transform:scale(.78) translateX(12px);overflow:visible}
.scene :is(path,circle,rect,line,polyline){vector-effect:non-scaling-stroke}
.stage[data-kind=bell] .scene-bell,.stage[data-kind=laundry] .scene-laundry,.stage[data-kind=energy] .scene-energy,.stage[data-kind=alert] .scene-alert,.stage[data-kind=status] .scene-status{visibility:visible;animation:reveal .55s .14s cubic-bezier(.2,.7,.3,1) both}
.scene .beam{stroke-dasharray:1;stroke-dashoffset:1}
.stage[data-awake=true] .scene .beam{animation:ink .9s .32s ease-out both}
.stage[data-kind=bell] .bell-wave{transform-origin:170px 108px;animation:wave 2.4s .35s ease-out infinite}
.stage[data-kind=alert] .bell-wave{transform-origin:170px 108px;animation:wave 1.65s ease-out infinite}
.stage[data-kind=laundry] .drum{transform-origin:170px 110px;animation:orbit 6s .2s linear infinite}
.stage[data-kind=energy] .current{stroke-dasharray:5 7;animation:current 1.25s linear infinite}
.stage[data-kind=status] .status-dot{animation:glow 2.1s ease-in-out infinite}
.close-x{display:none;position:absolute;top:8px;right:8px;z-index:5;width:44px;height:44px;place-items:center;font-size:20px;line-height:1;color:var(--ink)}
.close-x::before{content:'';position:absolute;inset:6px;border-radius:50%;z-index:-1;background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised-xs)}
.close-x:active::before{box-shadow:var(--sunken-sm)}
.signal-progress{position:absolute;inset:auto 0 0;height:2px;background:var(--signal);z-index:4;transform-origin:left;opacity:.7;pointer-events:none}
.signal-progress.run{animation:shrink 12s linear both}

/* ---------- sceny HA ---------- */
.presets{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
.preset{display:inline-flex;align-items:center;gap:9px;padding:11px 17px 11px 13px;border-radius:17px;font-weight:500;color:var(--ink);transition:box-shadow .25s,background .25s,color .25s}
.preset svg{width:18px;height:18px;color:var(--muted);transition:color .25s}
.preset[aria-pressed=true] svg{color:var(--accent)}

/* ---------- kafle ---------- */
.section{margin-top:26px}
.section-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px}
.section-head h2{font-weight:500;font-size:29px;letter-spacing:-.055em}
.overview,.rooms{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:17px;padding:3px 0 10px}
.tile{--tilt-x:0deg;--tilt-y:0deg;position:relative;isolation:isolate;overflow:hidden;text-align:left;min-width:0;border-radius:24px;padding:17px 19px 19px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:10px;color:var(--ink);transition:transform .24s ease,box-shadow .24s ease,background .3s}
.overview .tile{min-height:206px}
.card[data-card]{cursor:pointer}
.tile::after{content:'';position:absolute;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(ellipse at var(--light-x,20%) var(--light-y,8%),var(--glint),transparent 56%);opacity:0;transition:opacity .27s}
@media(hover:hover) and (pointer:fine){.tile:hover{transform:perspective(780px) translateY(-2px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))}.tile:hover::after{opacity:1}}
button.tile:active,.tile:has(> .room-hit:active){transform:scale(.982)}
.label{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:550;letter-spacing:.015em;position:relative;z-index:1;pointer-events:none;max-width:calc(100% - 34px)}
.label svg{width:29px;height:29px;padding:6px;border-radius:50%;color:var(--muted);transition:color .3s,box-shadow .3s}
.tile.active .label svg{color:var(--accent)}
.arrow{position:absolute;top:13px;right:13px;z-index:2;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;color:var(--symbol);transition:transform .25s,color .25s}
.arrow svg{width:13px;height:13px}
.tile:hover .arrow{transform:rotate(-25deg);color:var(--accent)}
.value{display:block;font-weight:450;font-size:clamp(24px,2.9vw,36px);letter-spacing:-.065em;line-height:1.05;font-variant-numeric:tabular-nums}
.tile small{display:block;color:var(--muted);font-size:11px;margin-top:5px}
.tile-art{position:absolute;right:0;bottom:0;width:134px;height:94px;color:var(--symbol);opacity:.48;z-index:-1;mask-image:linear-gradient(120deg,transparent 3%,#000 53%);transition:transform .45s,opacity .25s;pointer-events:none}
.tile:hover .tile-art{transform:translate(-3px,-3px) scale(1.06);opacity:.75}
.tile:hover .drawing{stroke-dasharray:1;animation:ink .7s ease both}
.tile.active .tile-art{color:var(--hot);opacity:.8}
.active-mark{fill:transparent;stroke:currentColor}.tile.active .active-mark{fill:var(--hot);stroke:none}
.card-body{position:relative;z-index:1;width:100%;display:flex;flex-direction:column;align-items:flex-start;gap:9px;flex:1;justify-content:flex-end}
.tags{display:flex;flex-wrap:wrap;gap:5px}
.tag{font-size:11px;padding:3px 9px;border-radius:999px;background:var(--wash);color:var(--accent)}
.mini{display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:0 13px;border-radius:13px;font-size:12px;font-weight:500;color:var(--ink)}
.mini svg{width:14px;height:14px}
.climate-row{display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%}
.dial{position:relative;width:118px;height:100px;flex:none}
.dial svg{width:100%;height:100%;overflow:visible}
.dial .trk{stroke:color-mix(in srgb,var(--muted) 24%,transparent)}
.dial .val{transition:stroke-dashoffset .6s cubic-bezier(.3,1.2,.5,1)}
.dial .knob{fill:var(--high);stroke:var(--hot);stroke-width:2;transform-box:view-box;transform-origin:59px 59px;transition:transform .5s cubic-bezier(.3,1.3,.5,1);filter:drop-shadow(0 2px 3px var(--drop))}
.dial .mid{position:absolute;inset:31px 0 auto;text-align:center;line-height:1.15}
.dial .mid b{display:block;font-size:26px;font-weight:420;letter-spacing:-.06em;font-variant-numeric:tabular-nums}
.dial .mid span{font-size:10.5px;color:var(--muted)}
.round{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;font-size:18px;line-height:1;color:var(--ink);flex:none}
.spark{width:100%;height:56px;overflow:visible}
.spark .line{fill:none;stroke:var(--hot);stroke-width:1.6;vector-effect:non-scaling-stroke}
.price{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500}
.price i{width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}

/* ---------- pokoje ---------- */
.room{min-height:116px;padding:15px 16px}
.room > span:not(.arrow){position:relative;z-index:1;pointer-events:none}
.room .value{font-size:15px;letter-spacing:-.025em;font-weight:500}
.room .tile-art{width:115px;height:85px;mask-image:linear-gradient(115deg,transparent 3%,#000 48%)}
.room .architect{opacity:.45}
.room-glow{fill:currentColor;stroke:none;opacity:0}
.room.active{background:radial-gradient(ellipse at 97% 100%,color-mix(in srgb,var(--tint) 55%,transparent),transparent 65%),var(--concave);border-color:transparent;box-shadow:var(--sunken),inset 0 0 0 1px color-mix(in srgb,var(--hot) 26%,transparent)}
.room.active .label svg{color:var(--accent)}
.room.active .room-glow{opacity:.85;animation:room-glow 5.5s ease-in-out infinite}
.room.active .value{color:var(--accent)}
.room-hit{position:absolute;inset:0;border-radius:inherit;z-index:0}
.room .label{max-width:calc(100% - 54px)}
.bulb{position:absolute;top:9px;right:9px;z-index:2;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;color:var(--muted);background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised-xs);transition:color .25s,box-shadow .25s,background .25s}
.bulb svg{width:19px;height:19px}
.bulb:hover{color:var(--accent)}
.bulb:active{box-shadow:var(--sunken-sm)}
.bulb[aria-pressed=true]{color:var(--accent);background:var(--concave);border-color:transparent;box-shadow:var(--sunken-sm),0 0 16px -2px color-mix(in srgb,var(--hot) 55%,transparent)}
.tile small.warn{color:var(--warn);font-weight:500}
.room-hit:focus-visible{outline-offset:-4px}
.ignite::before{content:'';position:absolute;left:var(--cx,50%);top:var(--cy,50%);width:12px;height:12px;margin:-6px;border-radius:50%;background:var(--hot);opacity:.42;animation:ignite .8s ease-out forwards;pointer-events:none;z-index:-1}

/* ---------- podstrony ---------- */
.activity{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.activity button{display:flex;align-items:center;gap:9px;padding:9px 13px;border-radius:15px;min-height:46px}
.entry{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.activity time{color:var(--muted);font-size:11px;white-space:nowrap}
.inner{animation:rise .3s ease both}
.page-title{font-size:clamp(31px,5vw,51px);font-weight:400;letter-spacing:-.075em;line-height:1.05;margin:12px 0 10px}
.intro{color:var(--muted);margin-bottom:17px}
.room-banner{position:relative;isolation:isolate;overflow:hidden;border-radius:26px;background:var(--concave);box-shadow:var(--sunken);min-height:136px;padding:20px 200px 20px 24px;margin:12px 0 16px}
.room-banner .page-title{margin:6px 0 8px}
.room-banner p{color:var(--muted);font-size:13px}
.room-banner .tile-art{width:184px;height:136px;right:12px;opacity:.7;color:var(--aqua);mask-image:none}
.room-banner .drawing{stroke-dasharray:1;animation:ink .85s ease both}
.room-banner .room-glow,.room-banner .active-mark{display:none}
.filters{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:16px 0}
.search{flex:1 0 220px;max-width:100%}
.result-count{color:var(--muted);font-size:12px;margin:0 0 12px}
.entity-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.cams{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:15px}.tile.cam{padding:0;aspect-ratio:16/9;min-height:0;justify-content:flex-end;cursor:pointer;font:inherit}.cam img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}.cam-off{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:8px;color:var(--muted);font-size:13px}.cam-off svg{width:26px;height:26px;opacity:.6}.cam-label{position:relative;z-index:1;width:100%;display:flex;align-items:center;gap:8px;padding:28px 16px 13px;color:#fff;font-weight:600;font-size:14px;background:linear-gradient(transparent,#000a)}.cam-label svg{width:16px;height:16px;flex:none}.cam-label small{margin-left:auto;font-weight:500;font-size:12px;color:#fff;opacity:.9}.cam[data-alert=true] .cam-label small{color:#ffb39b;opacity:1}.cam:not(:has(img)) .cam-label,.cam:not(:has(img)) .cam-label small{color:var(--ink);background:none}
.entity{min-height:72px;border-radius:18px;display:flex;align-items:center;min-width:0;overflow:hidden;transition:background .3s,box-shadow .3s}
.entity[data-on=true]{background:linear-gradient(90deg,var(--wash),transparent 60%),var(--convex)}
.entity-main{display:flex;align-items:center;gap:11px;text-align:left;padding:9px 11px;flex:1;min-width:0;min-height:70px}
.entity-main:focus-visible,.toggle:focus-visible{outline-offset:-3px}
.entity-icon{display:grid;place-items:center;width:34px;height:34px;flex:none;border-radius:11px;color:var(--muted)}
.entity-icon svg{width:17px;height:17px}
.entity[data-on=true] .entity-icon{color:var(--accent)}
.entity-text{min-width:0;flex:1}
.entity-name,.entity-state{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.entity-name{font-weight:550;font-size:13px}
.entity-state{color:var(--muted);font-size:12px;margin-top:3px}
.toggle{display:grid;place-items:center;width:41px;height:41px;margin-right:12px;flex:none;border-radius:50%;color:var(--muted)}
.toggle svg{width:17px;height:17px}
.more{margin-top:16px}
.empty{border:1px dashed color-mix(in srgb,var(--muted) 35%,transparent);border-radius:16px;padding:20px;color:var(--muted)}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:20;background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised);border-radius:14px;padding:11px 16px;width:max-content;max-width:90vw;animation:rise .3s ease both}
.demo-dialog{max-width:min(440px,calc(100vw - 30px));border:1px solid var(--edge);border-radius:22px;background:var(--convex);box-shadow:var(--raised);color:var(--ink);padding:20px}
.demo-dialog::backdrop{background:#16192470}
.demo-dialog p{color:var(--muted);margin:8px 0 17px}

/* ---------- v7: widok pokoju i zakładki ---------- */
.room .note{display:block;color:var(--muted);font-size:11px;margin-top:5px;max-width:24ch}
.room-banner .chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}
.room-banner .back{margin-bottom:6px}
.block{margin-top:22px}
.block-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
.block-head h2{display:flex;align-items:center;gap:9px;font-weight:500;font-size:21px;letter-spacing:-.04em}
.block-head h2 svg{width:20px;height:20px;color:var(--accent)}
.block-head .count{color:var(--muted);font-size:12px;font-weight:400;letter-spacing:0}
.entity-extra{display:flex;align-items:center;gap:6px;margin-right:12px;flex:none}
.entity-extra .round{width:34px;height:34px;font-size:13px}
.entity-extra .round svg{width:14px;height:14px}
.entity.has-dim{flex-wrap:wrap}
.dim{flex:1 0 100%;margin:0 14px 12px;accent-color:var(--hot);height:22px}
.entity[data-warn=true]{background:linear-gradient(90deg,color-mix(in srgb,var(--bad) 16%,transparent),transparent 60%),var(--convex)}
.entity[data-warn=true] .entity-state{color:var(--bad);font-weight:500}
.entity[data-warn=true] .entity-icon{color:var(--bad)}
.note-line{color:var(--muted);font-size:11px;margin-top:8px;max-width:40ch}
.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
.cards .tile{min-height:180px;justify-content:flex-start}
.cards .card-body{justify-content:flex-start}
.device-rows{display:grid;gap:5px;width:100%;position:relative;z-index:1;margin-top:4px}
.device-rows div{display:flex;justify-content:space-between;gap:10px;font-size:12px;border-bottom:1px solid color-mix(in srgb,var(--muted) 14%,transparent);padding-bottom:4px}
.device-rows span{color:var(--muted)}
.device-rows b{font-weight:500;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:60%}
.device-actions{display:flex;flex-wrap:wrap;gap:7px;position:relative;z-index:1}
.mini[aria-pressed=true]{background:var(--concave);color:var(--accent);box-shadow:var(--sunken-sm)}
.room-strip{position:sticky;bottom:12px;z-index:5;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-top:28px;padding:6px;border-radius:999px;background:color-mix(in srgb,var(--base) 86%,transparent);backdrop-filter:blur(10px);box-shadow:var(--raised-sm);border:1px solid var(--edge)}
.room-strip::-webkit-scrollbar{display:none}
.room-strip button{flex:none;display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:999px;color:var(--muted);border:1px solid transparent;font-size:13px}
.room-strip button svg{width:15px;height:15px}
.room-strip [aria-current=page]{color:var(--ink);background:var(--convex);border-color:var(--edge);box-shadow:var(--raised-xs)}
.room-strip button[data-on=true] svg{color:var(--accent)}
.status-banner{display:flex;align-items:center;gap:14px;border-radius:22px;padding:18px 20px;background:var(--concave);box-shadow:var(--sunken-sm);margin:6px 0 4px}
.status-banner svg{width:30px;height:30px;color:var(--good);flex:none}
.status-banner[data-bad=true] svg{color:var(--bad)}
.status-banner b{display:block;font-size:18px;font-weight:500;letter-spacing:-.03em}
.status-banner span{color:var(--muted);font-size:12px}
.modes{display:flex;flex-wrap:wrap;gap:10px}
.modes .preset small{display:block;color:var(--muted);font-size:11px;font-weight:400}
.big-value{font-size:clamp(28px,3.4vw,40px);font-weight:420;letter-spacing:-.06em;line-height:1.05}

/* ---------- górny pasek: przy wielu zakładkach przewija się, przycisk motywu zawsze widoczny ---------- */
.top{min-width:0}
.brand,.top-right{flex:none}
.nav{flex:0 1 auto;min-width:0;overflow-x:auto;scrollbar-width:none;scroll-behavior:smooth;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 10px,#000 calc(100% - 10px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 10px,#000 calc(100% - 10px),transparent 100%)}
.nav::-webkit-scrollbar{display:none}
.nav button{flex:none;white-space:nowrap}
@media(max-width:1180px){.connection{display:none}.nav button{padding:8px 12px}.top{gap:12px}}

/* ---------- zakładka Pogoda: rysowana scena ---------- */
.weather-hero{position:relative;isolation:isolate;overflow:hidden;border-radius:33px;min-height:300px;background:var(--concave);box-shadow:inset 8px 10px 23px var(--inset),inset -8px -9px 22px var(--lift);display:grid;grid-template-columns:minmax(230px,.75fr) 1.7fr;align-items:center}
.weather-hero[data-night=true]{background:radial-gradient(ellipse at 70% 0%,color-mix(in srgb,#5d6ea8 34%,transparent),transparent 70%),linear-gradient(180deg,color-mix(in srgb,#3b4a7a 14%,transparent),transparent 75%),var(--concave)}
.wx-copy{position:relative;z-index:2;padding:30px 0 30px 38px;display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.wx-temp{font-size:clamp(64px,8.5vw,104px);font-weight:300;letter-spacing:-.08em;line-height:1;font-variant-numeric:tabular-nums}
.wx-cond{font-size:clamp(20px,2.4vw,27px);letter-spacing:-.04em}
.wx-copy .chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}
.wx-scene{width:100%;height:auto;display:block;color:var(--symbol);overflow:visible;margin-right:10px}
.wx-scene .ground{stroke:currentColor;opacity:.75}
.wx-scene .far{opacity:.35}
.wx-scene .sun-core{fill:#f6c27a;stroke:#dc9550}
.wx-scene .rays{stroke:#dc9550;transform-box:fill-box;transform-origin:center;animation:orbit 50s linear infinite}
.wx-scene .halo{transform-box:fill-box;transform-origin:center;animation:halo 6s ease-in-out infinite}
.wx-scene .moon{fill:#ece6d3;stroke:var(--symbol)}
.wx-scene .star{fill:var(--ink);stroke:none;animation:twinkle 3.2s ease-in-out infinite;animation-delay:var(--dl,0s)}
.wx-scene .cloud{fill:var(--high);stroke:currentColor;stroke-width:1.2;animation:drift var(--dur,24s) ease-in-out infinite alternate}
.wx-scene .cloud.dark{fill:color-mix(in srgb,var(--low) 72%,var(--symbol))}
.wx-scene .drop{stroke:var(--aqua);stroke-width:1.5;stroke-linecap:round;opacity:0;animation:fall var(--t,.9s) linear infinite;animation-delay:var(--dl,0s)}
.wx-scene .flake{fill:var(--high);stroke:var(--symbol);stroke-width:.7;opacity:0;animation:snowfall var(--t,6s) linear infinite;animation-delay:var(--dl,0s)}
.wx-scene .fogline{stroke:currentColor;opacity:.55;animation:drift var(--dur,10s) ease-in-out infinite alternate}
.wx-scene .gust{stroke:currentColor;stroke-dasharray:1;stroke-dashoffset:1;animation:gust 3.4s ease-in-out infinite;animation-delay:var(--dl,0s)}
.wx-scene .bolt{fill:#f7d36b;stroke:#c99430;opacity:0;animation:bolt 5.5s infinite}
.wx-scene .flash{fill:#fff;stroke:none;opacity:0;animation:flash 5.5s infinite}
.wx-scene .window{fill:transparent;transition:fill .6s}
.weather-hero[data-night=true] .wx-scene .window{fill:var(--hot);filter:drop-shadow(0 0 6px var(--hot))}
.wx-scene .smoke{stroke:currentColor;stroke-dasharray:1;animation:smoke 4.5s ease-in-out infinite}
.wx-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px}
.wx-stats .tile{min-height:150px;justify-content:flex-start}
.wx-stats .card-body{justify-content:flex-start}
.compass{width:52px;height:52px;position:absolute;right:16px;top:44px;color:var(--symbol)}
.compass .needle{fill:var(--hot);stroke:none;transform-origin:26px 26px;transition:transform .8s cubic-bezier(.3,1.3,.5,1)}
.hours{overflow-x:auto;padding:2px 3px 14px;scrollbar-width:thin}
.hours-track{position:relative}
.temp-curve{display:block;height:64px;overflow:visible}
.temp-curve .line{fill:none;stroke:var(--hot);stroke-width:1.8;stroke-linecap:round}
.temp-curve circle{fill:var(--base);stroke:var(--hot);stroke-width:1.5}
.hour-row{display:flex;gap:10px}
.hour{flex:none;width:74px;border-radius:20px;padding:11px 6px 12px;display:flex;flex-direction:column;align-items:center;gap:5px;background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised-sm);position:relative}
.hour time{font-size:11px;color:var(--muted)}
.hour svg{width:22px;height:22px;color:var(--accent)}
.hour b{font-weight:500;font-size:16px;letter-spacing:-.03em}
.hour small{font-size:10px;color:var(--aqua);min-height:1.2em}
.hour.now{background:var(--concave);box-shadow:var(--sunken-sm);border-color:transparent}
.days{display:grid;gap:10px}
.day{display:grid;grid-template-columns:minmax(80px,1fr) 30px minmax(110px,1.4fr) 58px 40px minmax(110px,2.2fr) 40px;align-items:center;gap:12px;border-radius:18px;padding:10px 16px;background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised-sm);position:relative}
.day > b{font-weight:550}
.day svg{width:22px;height:22px;color:var(--accent)}
.day .muted{color:var(--muted);font-size:12px}
.day .rain{color:var(--aqua);font-size:12px}
.day .lo{color:var(--muted);text-align:right}
.range{height:6px;border-radius:6px;background:color-mix(in srgb,var(--muted) 18%,transparent);position:relative}
.range i{position:absolute;top:0;bottom:0;border-radius:6px;background:linear-gradient(90deg,#7aa7e0,#e9a56b,#e9643f)}
@keyframes drift{to{transform:translateX(var(--dx,40px))}}
@keyframes fall{0%{transform:translate(0,-26px);opacity:0}12%{opacity:1}100%{transform:translate(-16px,150px);opacity:0}}
@keyframes snowfall{0%{transform:translate(0,-20px);opacity:0}10%{opacity:1}50%{transform:translate(13px,68px)}100%{transform:translate(-7px,150px);opacity:0}}
@keyframes gust{0%{stroke-dashoffset:1}55%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
@keyframes bolt{0%,86%,100%{opacity:0}88%,93%{opacity:1}90%{opacity:.25}}
@keyframes flash{0%,86%,100%{opacity:0}88%{opacity:.3}93%{opacity:.12}}
@keyframes twinkle{50%{opacity:.2}}
@keyframes smoke{0%{stroke-dashoffset:1;opacity:.65;transform:translateY(0)}100%{stroke-dashoffset:0;opacity:0;transform:translateY(-16px)}}
@media(max-width:950px){.weather-hero{grid-template-columns:1fr}.wx-copy{padding:24px 24px 0}.wx-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.day{grid-template-columns:minmax(70px,1fr) 26px 50px 36px minmax(80px,2fr) 36px}.day .label-col{display:none}}

/* ---------- zakładka F1 ---------- */
.f1-hero{position:relative;isolation:isolate;overflow:hidden;border-radius:33px;min-height:300px;background:var(--concave);box-shadow:inset 8px 10px 23px var(--inset),inset -8px -9px 22px var(--lift);display:grid;grid-template-columns:minmax(260px,.95fr) 1.3fr;align-items:center}
.f1-copy{position:relative;z-index:2;padding:28px 0 28px 36px;display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0}
.f1-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;background:var(--wash);color:var(--accent);font-size:12px;font-weight:550}
.f1-badge i{width:7px;height:7px;border-radius:50%;background:currentColor;animation:glow 1.6s ease-in-out infinite}
.f1-eye{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:12px;letter-spacing:.04em}
.f1-eye img{width:24px;height:auto;border-radius:3px;box-shadow:0 0 0 1px var(--edge)}
.f1-name{font-size:clamp(30px,4.2vw,50px);font-weight:420;letter-spacing:-.06em;line-height:1.02}
.f1-sub{color:var(--muted);font-size:13px}
.f1-cd{display:flex;gap:10px;margin-top:10px}
.f1-cd div{min-width:66px;padding:9px 10px;border-radius:16px;text-align:center;background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised-xs)}
.f1-cd b{display:block;font-size:26px;font-weight:450;letter-spacing:-.05em;font-variant-numeric:tabular-nums}
.f1-cd small{font-size:10.5px;color:var(--muted)}
.f1-art{position:relative;align-self:stretch;display:grid;place-items:center;padding:8px 14px 8px 0;min-width:0}
.f1-art img{display:block;width:100%;max-width:640px;height:auto;user-select:none;mix-blend-mode:multiply;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent),linear-gradient(transparent,#000 16%,#000 84%,transparent);-webkit-mask-composite:source-in;
  mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent),linear-gradient(transparent,#000 16%,#000 84%,transparent);mask-composite:intersect}
.aura[data-theme=dark] .f1-art img{filter:invert(1) hue-rotate(180deg) brightness(.92) contrast(1.05);mix-blend-mode:screen}
.f1-scene{width:100%;height:auto;display:block;color:var(--symbol);overflow:visible}
.f1-scene .car-body{fill:var(--high);stroke:var(--ink);stroke-width:1.4}
.f1-scene .livery{stroke:var(--hot);stroke-width:3}
.f1-scene .helmet{fill:var(--hot);stroke:none}
.f1-scene .wheel{transform-box:fill-box;transform-origin:center;animation:orbit .45s linear infinite}
.f1-scene .tyre{fill:var(--ink);stroke:none}
.aura[data-theme=dark] .f1-scene .tyre{fill:#0b0d11;stroke:var(--symbol)}
.f1-scene .streak{stroke:var(--symbol);opacity:0;animation:streak 1.1s linear infinite;animation-delay:var(--dl,0s)}
.f1-scene .kerb{stroke:var(--bad);stroke-width:5;stroke-dasharray:14 14;animation:kerb .5s linear infinite}
.f1-scene .kerb-w{stroke:var(--high);stroke-width:5;stroke-dasharray:14 14;stroke-dashoffset:14;animation:kerb .5s linear infinite}
.f1-scene .lane{stroke:var(--symbol);stroke-dasharray:22 18;opacity:.6;animation:lane .5s linear infinite}
.f1-scene .car{animation:shake .18s ease-in-out infinite alternate}
.f1-scene .light{fill:#c0392b;fill-opacity:0;stroke:var(--symbol)}
.f1-scene .light:nth-child(1){animation:l1 6s infinite}.f1-scene .light:nth-child(2){animation:l2 6s infinite}.f1-scene .light:nth-child(3){animation:l3 6s infinite}.f1-scene .light:nth-child(4){animation:l4 6s infinite}.f1-scene .light:nth-child(5){animation:l5 6s infinite}
@keyframes l1{0%,8%{fill-opacity:0}9%,62%{fill-opacity:1;filter:drop-shadow(0 0 5px #ff4b3a)}63%,100%{fill-opacity:0}}
@keyframes l2{0%,17%{fill-opacity:0}18%,62%{fill-opacity:1;filter:drop-shadow(0 0 5px #ff4b3a)}63%,100%{fill-opacity:0}}
@keyframes l3{0%,26%{fill-opacity:0}27%,62%{fill-opacity:1;filter:drop-shadow(0 0 5px #ff4b3a)}63%,100%{fill-opacity:0}}
@keyframes l4{0%,35%{fill-opacity:0}36%,62%{fill-opacity:1;filter:drop-shadow(0 0 5px #ff4b3a)}63%,100%{fill-opacity:0}}
@keyframes l5{0%,44%{fill-opacity:0}45%,62%{fill-opacity:1;filter:drop-shadow(0 0 5px #ff4b3a)}63%,100%{fill-opacity:0}}
@keyframes streak{0%{transform:translateX(40px);opacity:0}20%{opacity:.8}100%{transform:translateX(-120px);opacity:0}}
@keyframes kerb{to{stroke-dashoffset:-28}}
@keyframes lane{to{stroke-dashoffset:40}}
@keyframes shake{to{transform:translateY(-1px)}}
.f1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px}
.f1-grid > .wide,.cards > .wide-tile{grid-column:1 / -1}
.gen-yaml{width:100%;max-height:360px;overflow:auto;margin:6px 0 0;padding:14px 16px;border-radius:16px;background:var(--concave);box-shadow:var(--sunken-sm);font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;color:var(--ink);white-space:pre;user-select:text}
.mini.arm{outline:2px dashed var(--accent);outline-offset:2px}
.tab-toggles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;width:100%}
.tab-toggles .toggle{margin-right:0;width:38px;height:38px}
.tab-toggles .f1-row.done{opacity:.6}
@media(max-width:700px){.tab-toggles{grid-template-columns:1fr}}
.f1-grid .tile{justify-content:flex-start;min-height:0}
.f1-grid .card-body{justify-content:flex-start;gap:7px}
.f1-row{display:flex;align-items:center;gap:12px;width:100%;padding:9px 12px;border-radius:15px;background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised-xs);position:relative}
.f1-row svg{width:18px;height:18px;color:var(--muted);flex:none}
.f1-row > div{flex:1;min-width:0}
.f1-row b{display:block;font-size:13px;font-weight:550}
.f1-row small{display:block;color:var(--muted);font-size:11.5px}
.f1-row .t{text-align:right;font-variant-numeric:tabular-nums;font-weight:550;font-size:13px}
.f1-row.done{opacity:.5}
.f1-row.next{background:linear-gradient(90deg,var(--wash),transparent 70%),var(--convex)}
.f1-row.next svg,.f1-row.now svg{color:var(--accent)}
.f1-row.now{box-shadow:var(--raised-xs),inset 0 0 0 1px var(--hot)}
.podium{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;gap:10px;width:100%;margin-top:6px}
.podium div{display:flex;flex-direction:column;align-items:center;gap:2px;text-align:center}
.podium b{font-size:20px;font-weight:500;letter-spacing:-.03em}
.podium small{font-size:11px;color:var(--muted)}
.podium em{font-style:normal;font-size:11px;color:var(--accent);font-variant-numeric:tabular-nums}
.podium span.step{display:grid;place-items:center;width:100%;border-radius:12px 12px 4px 4px;background:var(--concave);box-shadow:var(--sunken-sm);font-weight:600;color:var(--muted);margin-top:6px}
.podium .p1 span.step{height:74px;color:var(--accent)}.podium .p2 span.step{height:54px}.podium .p3 span.step{height:40px}
.std{display:grid;gap:7px;width:100%}
.std-row{display:grid;grid-template-columns:22px 44px 1fr 46px;align-items:center;gap:9px;font-size:13px}
.std-row .p{color:var(--muted);text-align:right;font-variant-numeric:tabular-nums}
.std-row .cd{font-weight:650;letter-spacing:.03em;border-left:3px solid var(--tc,var(--hot));padding-left:6px}
.std-row .n small{display:block;color:var(--muted);font-size:11px}
.std-row .bar{display:block;height:4px;border-radius:4px;background:color-mix(in srgb,var(--muted) 16%,transparent);margin-top:4px}
.std-row .bar i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--hot),var(--accent))}
.std-row .pt{text-align:right;font-weight:550;font-variant-numeric:tabular-nums}
.track-about{display:grid;grid-template-columns:minmax(140px,220px) 1fr;gap:18px;align-items:center;width:100%}
.track-about img{width:100%;height:auto;filter:brightness(0) saturate(0) opacity(.75)}
.aura[data-theme=dark] .track-about img{filter:none;opacity:.85}
.facts{display:grid;gap:9px}
.facts div small{display:block;color:var(--muted);font-size:11px}
.facts div b{font-weight:550}
.wins{display:flex;flex-wrap:wrap;gap:5px;margin-top:3px}
.wins span{font-size:11px;padding:2px 8px;border-radius:999px;background:var(--wash);color:var(--accent)}
.flag-ring{position:relative;display:grid;place-items:center;width:min(240px,100%);aspect-ratio:1;margin:0 auto}
.flag-ring svg{position:absolute;inset:0;width:100%;height:100%}
.flag-ring .r1{fill:none;stroke:var(--fc);stroke-width:10;stroke-dasharray:30 8;transform-origin:center;animation:orbit 12s linear infinite;filter:drop-shadow(0 0 6px var(--fc))}
.flag-ring .r0{fill:none;stroke:color-mix(in srgb,var(--muted) 25%,transparent);stroke-width:1}
.flag-ring div{text-align:center;max-width:62%}
.flag-ring small{display:block;color:var(--muted);font-size:11px}
.flag-ring b{display:block;font-size:20px;font-weight:500;letter-spacing:-.03em;color:var(--fc)}
.rc{display:grid;gap:6px;width:100%}
.rc div{display:flex;gap:9px;font-size:12px}
.rc time{color:var(--muted);font-variant-numeric:tabular-nums}
@media(max-width:950px){.f1-hero{grid-template-columns:1fr}.f1-copy{padding:24px 24px 0}.f1-grid{grid-template-columns:1fr}.track-about{grid-template-columns:1fr}}

/* ---------- zakładka Kosze ---------- */
.bins-next{display:grid;grid-template-columns:auto 1fr;gap:26px;align-items:center;min-height:220px}
.bins-next .card-body{justify-content:center}
.bin-art{display:flex;align-items:flex-end;gap:10px;padding:6px 6px 0 10px}
.bin-art svg{width:86px;height:auto;overflow:visible;color:var(--ink)}
.bins-next .bin-art svg{animation:bob 3.2s ease-in-out infinite}
.bins-next .bin-art svg:nth-child(2){animation-delay:-1.1s}
.bins-next .bin-art svg:nth-child(3){animation-delay:-2.2s}
.bin-art .lid{transform-box:fill-box;transform-origin:100% 100%;transition:transform .5s cubic-bezier(.3,1.4,.5,1)}
.bins-next:hover .bin-art .lid{transform:rotate(-14deg)}
.bin-body{fill:var(--bin);fill-opacity:.85;stroke:currentColor}
.bin-dot{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;flex:none;background:var(--bin);box-shadow:inset 0 -3px 6px #0004,0 0 0 2px color-mix(in srgb,var(--bin) 35%,transparent)}
.bin-dot svg{width:17px;height:17px;color:#fff}
.bin-dots{display:inline-flex;gap:4px}
.bin-type{color:var(--accent);font-weight:500}
.bin-tip{display:inline-flex;align-items:center;gap:7px;margin-top:10px;padding:7px 12px;border-radius:999px;background:var(--wash);color:var(--accent);font-size:12.5px;font-weight:500}
.bin-tip svg{width:15px;height:15px}
.bin-rows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.bin-row{display:flex;align-items:center;gap:13px;min-height:72px;border-radius:18px;padding:10px 16px;background:var(--convex);border:1px solid var(--edge);box-shadow:var(--raised-sm);position:relative}
.bin-row.soon{background:linear-gradient(90deg,var(--wash),transparent 60%),var(--convex)}
.bin-row > div{flex:1;min-width:0}
.bin-row b{display:block;font-weight:550;font-size:13.5px}
.bin-row small{display:block;color:var(--muted);font-size:12px;margin-top:2px}
.bin-row .when{font-size:12.5px;font-weight:550;color:var(--accent);white-space:nowrap}
.bin-date{display:grid;place-items:center;width:46px;flex:none;line-height:1.05}
.bin-date b{font-size:21px;font-weight:450;letter-spacing:-.04em}
.bin-date small{font-size:11px;color:var(--muted);text-transform:uppercase;margin:0}
@keyframes bob{50%{transform:translateY(-4px)}}
@media(max-width:950px){.bin-rows{grid-template-columns:1fr}.bins-next{grid-template-columns:1fr}}

/* ---------- zakładka Ogrzewanie ---------- */
.heat-top{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}
.heat-grid{display:grid;grid-template-columns:minmax(250px,.85fr) 1.7fr;gap:17px;align-items:start}
.boiler{justify-content:flex-start}
.boiler .card-body{justify-content:flex-start}
.boiler-art{width:100%;max-width:210px;height:auto;color:var(--symbol);margin:4px auto 2px;overflow:visible}
.boiler-art .flame{fill:transparent;stroke:var(--symbol);transform-box:fill-box;transform-origin:50% 100%}
.boiler.heating .boiler-art .flame{fill:var(--hot);stroke:var(--hot);animation:flame 1.1s ease-in-out infinite alternate;filter:drop-shadow(0 0 6px var(--hot))}
.boiler-art .flow{stroke-dasharray:4 7;opacity:.4}
.boiler.heating .boiler-art .flow{stroke:var(--hot);opacity:1;animation:current 1s linear infinite}
.boiler.heating .boiler-art .pump{animation:orbit 1.4s linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes flame{to{transform:scale(1.1,.86)}}
.heat-rooms{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}
.heat-room{min-height:196px;justify-content:flex-start;padding-left:24px}
.heat-room .label small{font-weight:400;color:var(--muted);margin-left:4px}
.heat-room .heat-note{font-size:11.5px;color:var(--muted)}
.heat-room.flow .heat-note{color:var(--accent);font-weight:500}
.heat-room.wait .heat-note{color:var(--warn);font-weight:500}
.heat-room .floor{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
.heat-room .floor.on{color:var(--accent)}
.heat-room .floor svg{width:14px;height:14px}
.heat-room::before{content:'';position:absolute;left:10px;top:20px;bottom:20px;width:3px;border-radius:3px;background:color-mix(in srgb,var(--muted) 22%,transparent)}
.heat-room.flow::before{background:linear-gradient(var(--hot),transparent 45%,var(--hot));background-size:100% 200%;animation:pipe 1.5s linear infinite;box-shadow:0 0 8px color-mix(in srgb,var(--hot) 60%,transparent)}
.heat-room.wait::before{background:var(--warn)}
@keyframes pipe{to{background-position:0 -200%}}
.heat-foot{display:grid;grid-template-columns:1fr 1.6fr 1fr;gap:17px;margin-top:17px}
.heat-foot .tile{min-height:130px;justify-content:flex-start}
.preset.arm{outline:2px dashed var(--accent);outline-offset:2px}
@media(max-width:950px){.heat-grid,.heat-foot{grid-template-columns:1fr}}
@media(max-width:600px){.heat-rooms{grid-template-columns:1fr}}

/* ---------- wejście do pokoju: kafelki wyrastają z wklęsłego kółka ---------- */
/* ten sam efekt na każdej zakładce z górnego menu (sekcje .inner) */
.inner.enter :is(.room-banner,.status-banner,.weather-hero){animation:dimple .85s cubic-bezier(.2,.8,.25,1) both}
.inner.enter :is(.block-head,.heat-top,.page-title,.intro){animation:rise .5s ease both;animation-delay:calc(var(--i,0) * 55ms)}
.entity{position:relative}
.bin-row{position:relative}
.inner.enter :is(.entity,.tile,.hour,.day,.bin-row){--d:calc(var(--i,0) * 60ms + 100ms);animation:emerge .95s cubic-bezier(.45,.05,.2,1) backwards;animation-delay:var(--d)}
.inner.enter :is(.entity,.tile,.hour,.day,.bin-row)::before{content:'';position:absolute;left:50%;top:50%;width:50px;height:50px;margin:-25px;border-radius:50%;z-index:4;pointer-events:none;background:var(--concave);box-shadow:var(--sunken-sm),inset 0 0 0 1px color-mix(in srgb,var(--hot) 18%,transparent);animation:pit .95s cubic-bezier(.3,.7,.3,1) both;animation-delay:var(--d)}
.inner.enter :is(.entity,.tile,.hour,.day,.bin-row) > *{animation:emerge-in .5s ease-out backwards;animation-delay:calc(var(--d) + 520ms)}
.inner.enter .room-strip{animation:rise .5s .35s ease both}
@keyframes emerge{
  0%{clip-path:circle(0 at 50% 50%)}
  28%,46%{clip-path:circle(27px at 50% 50%)}
  100%{clip-path:circle(140% at 50% 50%)}
}
@keyframes pit{0%{transform:scale(0)}28%,46%{transform:scale(1);opacity:1}72%{transform:scale(2.6);opacity:0}100%{opacity:0}}
@keyframes emerge-in{from{opacity:0;transform:translateY(5px) scale(.96)}}
@keyframes dimple{from{clip-path:circle(0% at 50% 50%);box-shadow:var(--sunken)}to{clip-path:circle(150% at 50% 50%)}}

@keyframes float{50%{translate:0 -7px}}
@keyframes contact{50%{scale:.82;opacity:.6}}
@keyframes halo{50%{scale:1.07;opacity:.73}}
@keyframes glow{50%{filter:brightness(1.12)}}
@keyframes orbit{to{transform:rotate(360deg)}}
@keyframes ink{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes reveal{to{opacity:1;transform:scale(1) translateX(0)}}
@keyframes wave{0%,12%{opacity:.25;transform:scale(.8)}50%{opacity:.9}100%{opacity:.13;transform:scale(1.13)}}
@keyframes current{to{stroke-dashoffset:-24}}
@keyframes shrink{from{transform:scaleX(1)}to{transform:scaleX(0)}}
@keyframes room-glow{50%{opacity:.45}}
@keyframes rise{from{transform:translateY(6px);opacity:0}}
@keyframes ignite{to{transform:scale(70);opacity:0}}

@media(max-width:950px){.entity-grid,.overview,.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.connection{display:none}.nav button{padding-inline:11px}}
@media(max-width:480px){.cards{grid-template-columns:1fr}.nav{overflow-x:auto;scrollbar-width:none}.nav button{flex:none!important}}
@media(max-width:730px){.rooms{grid-template-columns:repeat(2,minmax(0,1fr))}.activity{grid-template-columns:1fr}.stage{min-height:300px}.orb-zone{min-height:298px}.stage-copy{padding-left:24px}.stage-foot{left:24px}.clock{font-size:clamp(54px,12vw,78px)}}
@media(max-width:480px){
  .aura{padding-inline:13px}.top{flex-wrap:wrap;gap:0;padding:10px 0 6px;min-height:0;margin-bottom:12px}.top-right{order:1}.nav{order:2;width:100%;margin-top:8px}.nav button{flex:1;padding-inline:8px}
  .stage{border-radius:22px;grid-template-columns:1fr 112px;min-height:0}.orb-zone{min-height:132px;margin-right:4px}.stage-copy{padding:14px 0 14px 15px}.clock{font-size:44px;margin:2px 0 1px}.stage-foot{display:none!important}.orbit{opacity:.45}.date{font-size:9px;gap:5px;letter-spacing:.07em}.date::before{width:10px}
  .stage-copy:not(.is-event) .headline{font-size:20px}.headline{font-size:clamp(22px,6vw,30px)}#summary{gap:5px;margin-top:9px}.state-chip{padding:3px 7px;font-size:10px}.state-chip svg{width:11px;height:11px}
  .stage-foot{left:14px;right:11px;min-height:36px;font-size:10px}.stage-foot button{min-height:27px;font-size:10px;padding:4px 9px}.weather svg{width:12px;height:12px}
  .orb{width:64px}.orbit,.orbit-halo{width:150px}.orb-caption{display:none}.orb-contact{top:76%;width:52px;height:10px}.scene{inset:6% -6%}.stage[data-awake=true] .orb{--orb-x:-60%;--orb-y:55%;--orb-size:.4}.stage-copy.is-event .headline{font-size:22px;margin-top:6px}
  .presets{flex-wrap:nowrap;overflow-x:auto;gap:8px;margin:10px -13px 0;padding:6px 13px 12px;scrollbar-width:none}.presets::-webkit-scrollbar{display:none}.preset{flex:none}.preset{padding:8px 12px 8px 10px;font-size:12.5px;border-radius:14px}.preset svg{width:15px;height:15px}
  .overview,.rooms{gap:12px}.tile{border-radius:19px;padding:12px 12px 14px}.overview .tile{min-height:178px}.label{font-size:12px}.label svg{width:24px;height:24px;padding:4px}.arrow{top:9px;right:9px;width:24px;height:24px}.arrow svg{width:11px;height:11px}
  .dial{width:84px;height:72px}.dial .mid{inset:21px 0 auto}.dial .mid b{font-size:19px}.dial .mid span{font-size:9px}.round{width:30px;height:30px;font-size:15px}.climate-row{gap:0}
  .section-head h2{font-size:24px}.room{min-height:104px}.bulb{top:6px;right:6px;width:42px;height:42px}.bulb::after{content:'';position:absolute;inset:-1px;border-radius:50%}.stage[data-awake=true] .close-x{display:grid}.room .label{max-width:calc(100% - 46px)}.room .tile-art{width:88px;height:65px}.entity-grid{grid-template-columns:1fr}.room-banner{padding:14px 110px 14px 16px}.room-banner .tile-art{width:125px;height:100px;right:0}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.scene svg{opacity:1;transform:none}.scene .beam,.room-banner .drawing{stroke-dashoffset:0}.signal-progress{display:none}}
`;

const glyphs = {
  home:'M3 11 12 3l9 8v9H3z M9 20v-6h6v6', rooms:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  light:'M8 16c0-2-3-3-3-7a7 7 0 0 1 14 0c0 4-3 5-3 7 M8 17h8 M9 21h6', thermo:'M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z M12 10v7',
  bolt:'m13 2-9 12h7l-1 8 10-12h-8z', shield:'M12 3 20 6v6c0 5-4 8-8 10-4-2-8-5-8-10V6z M9 12l2 2 4-4',
  sofa:'M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3 M5 11a2 2 0 0 0-3 2v5h20v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-1-2 M5 18v2m14-2v2',
  kitchen:'M4 3v7a3 3 0 0 0 6 0V3 M7 3v18 M17 3c-2 2-3 6-3 10h4V3z M18 13v8', bed:'M3 6v14m18-7v7 M3 13h18v5H3 M6 13V9h5v4 M11 9h7a3 3 0 0 1 3 3v1',
  bath:'M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z M5 12V5a2 2 0 0 1 4 0 M7 19l-1 2m11-2 1 2', wash:'M4 3h16v18H4z M4 8h16 M7 5.5h1m3 0h1 M16 14.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
  door:'M3 21h18 M6 21V4h12v17 M10 13h1', weather:'M5 17a4 4 0 1 1 1-8 6 6 0 0 1 11 2 3 3 0 0 1 0 6z',
  moon:'M20 15A8.5 8.5 0 0 1 9 4a8.5 8.5 0 1 0 11 11z', sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M12 2v2m0 16v2M2 12h2m16 0h2 M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2',
  power:'M12 2v9 M7 5a8 8 0 1 0 10 0', arrow:'M5 12h14m-6-6 6 6-6 6', sensor:'M3 12h4l3-7 4 14 3-7h4', device:'M4 5h16v12H4z M8 21h8m-4-4v4',
  fan:'M12 12c-6 0-8-5-4-7 3-1 5 2 4 7 4-4 9-3 8 1-1 4-5 3-8-1-1 6-5 8-7 4-1-3 2-5 7-4z', water:'M12 3c2 4 6 7 6 12a6 6 0 0 1-12 0c0-5 4-8 6-12z',
  bell:'M4 18h16l-2-4V9a6 6 0 0 0-12 0v5z M10 21h4', spark:'M12 3v4m0 10v4M3 12h4m10 0h4 M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6',
  tree:'M12 3 6 10h3l-5 6h16l-5-6h3z M12 16v5', sunrise:'M3 18h18 M7 18a5 5 0 0 1 10 0 M12 4v4 M5 9l2 2m12-2-2 2',
  settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15l1.6 1.2-2 3.5-1.9-.8a7 7 0 0 1-1.6.9L15.2 22h-4l-.3-2.2a7 7 0 0 1-1.6-.9l-1.9.8-2-3.5L7 15a7 7 0 0 1 0-1.9L5.4 12l2-3.5 1.9.8a7 7 0 0 1 1.6-.9L11.2 6h4l.3 2.2a7 7 0 0 1 1.6.9l1.9-.8 2 3.5-1.6 1.2a7 7 0 0 1 0 2z',
  fire:'M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 4 0-3 0-5 0-7z',
  flag:'M5 21V3.5 M5 4h14v9H5 M5 4h3.5v3H5zM12 4h3.5v3H12zM8.5 7H12v3H8.5zM15.5 7H19v3h-3.5zM5 10h3.5v3H5zM12 10h3.5v3H12z', trophy:'M8 4h8v5a4 4 0 0 1-8 0z M8 6H5a3 3 0 0 0 3 4 M16 6h3a3 3 0 0 1-3 4 M12 13v4 M8 21h8 M9 17h6v4H9z',
  bin:'M6.6 8h10.8l-1 11.9a1.8 1.8 0 0 1-1.8 1.6H9.4a1.8 1.8 0 0 1-1.8-1.6z M4.6 8h14.8 M9.6 8V5.6c0-.7.5-1.2 1.2-1.2h2.4c.7 0 1.2.5 1.2 1.2V8 M10.4 11.4v6.4M13.6 11.4v6.4',
  rain:'M5 13a4 4 0 1 1 1-8 6 6 0 0 1 11 2 3 3 0 0 1 0 6z M8 16l-1 4m5-4-1 4m5-4-1 4', snow:'M5 13a4 4 0 1 1 1-8 6 6 0 0 1 11 2 3 3 0 0 1 0 6z M8 17.5h.01M12 19.5h.01M16 17.5h.01M10 21.5h.01M14 21.5h.01',
  storm:'M5 13a4 4 0 1 1 1-8 6 6 0 0 1 11 2 3 3 0 0 1 0 6z M12 14l-2 4h4l-2 4', fog:'M4 8h16M3 12h18M5 16h14M7 20h10', wind:'M3 8h11a3 3 0 1 0-3-3 M3 12h16a3 3 0 1 1-3 3 M3 16h8',
  partly:'M8 3v1.5M3.5 5.5l1 1M2 10h1.5 M12.5 9.5A4 4 0 0 0 5 11.5 M9 20a4 4 0 1 1 1-8 5 5 0 0 1 9 2 3 3 0 0 1 0 6z', clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M12 7v5l3 2',
  film:'M4 5h16v14H4z M8 5v14m8-14v14 M4 9h4m8 0h4M4 15h4m8 0h4', out:'M14 4h5v16h-5 M10 8l-4 4 4 4 M6 12h10',
};
const art = {
  light:'M12 81a61 61 0 0 1 117 0 M26 81a47 47 0 0 1 89 0 M41 81a31 31 0 0 1 60 0 M56 81a16 16 0 0 1 29 0',
  shield:'M16 69 72 38l59 32-57 31z M16 52l56-32 59 33-57 31z M16 35 72 3l59 33-57 31z',
  rooms:'M10 82V38h33V11h49v26h48v45 M43 38h49v44 M92 60h48 M10 62h33',
};
const roomArt = {
  sofa:['M8 79h132 M22 73V60h102v13 M27 58V43q0-9 9-9h74q9 0 9 9v15 M27 52h-8v20m100-20h8v20 M53 34v26m41-26v26 M87 29V9h36v20z M95 15h20 M95 21h17','M34 45h12v10H34z M55 45h15v10H55z'],
  kitchen:['M12 78h126 M19 72V37h107v35 M19 51h107 M42 52v19m32-19v19m27-19v19 M31 59h6m16 0h9m21 0h9 M20 29V12h48v17z M76 29V12h50v17z M70 38h27m-16-2v-8q0-5 6-5','M20 30h48v5H20z M77 30h49v5H77z'],
  bed:['M10 79h130 M20 72V44h15V30h75v14h15v28 M20 62h105 M20 69h105 M34 47h77l14 15H20z M40 45v-9h27v9m10 0v-9h27v9 M33 23V9h82v14 M74 10v12','M37 52h72l7 8H31z'],
  bath:['M15 78h126 M18 60h113m-106 0 4 11h91l5-11 M29 71v5m91-5v5 M30 58V31q0-8 9-8h8v7 M41 32h13 M41 37v5m5-5v8m6-8v5 M82 55V13h40v42 M82 42h40m-20-29v29','M85 16h34v23H85z'],
  wash:['M14 79h124 M27 72V19h42v53z M81 72V19h42v53z M27 31h42m12 0h42 M32 25h9m45 0h9 M63 51a15 15 0 1 1-30 0 15 15 0 0 1 30 0m54 0a15 15 0 1 1-30 0 15 15 0 0 1 30 0 M34 53q6-5 13 0t14 0m28 0q6-5 13 0t14 0','M41 50a7 7 0 1 0 14 0 7 7 0 1 0-14 0z'],
  door:['M10 79h130 M44 76V18h60v58 M55 76V24l40 6v46 M84 50h5 M31 17l42-13 43 13 M27 74h15m64 0h17 M16 64l12-12m92 0 12 12','M58 31l30 5v11l-30-2z'],
  tree:['M15 76h124 M31 74V41m-13 0 13-23 13 23z M60 74V30m-17 1 17-27 17 27z M107 74V46m-18 0 18-22 18 22z M37 61l16-7m68 8 10-4 M19 66l12 5','M69 60a6 6 0 1 0 12 0 6 6 0 1 0-12 0z'],
};
const signalScenes = `
  <svg class="scene-bell" viewBox="0 0 340 220"><g fill="none" stroke="currentColor"><circle class="bell-wave" cx="170" cy="108" r="92" stroke-width=".7" opacity=".33"/><circle class="bell-wave" cx="170" cy="108" r="74" stroke-width=".9" opacity=".56"/><circle cx="170" cy="108" r="58" stroke-width=".6" opacity=".65"/><path class="beam" pathLength="1" d="M138 128h64l-10-14V99a22 22 0 0 0-44 0v15z M160 139q10 13 20 0 M170 70v7" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 108h18m204 0h18M170 11v11m0 172v13" opacity=".5"/></g><circle cx="246" cy="55" r="3.3" fill="currentColor"/></svg>
  <svg class="scene-laundry" viewBox="0 0 340 220"><g fill="none" stroke="currentColor"><path class="beam" pathLength="1" d="M101 187V34q0-10 10-10h118q10 0 10 10v153q0 10-10 10H111q-10 0-10-10z M101 53h138 M115 39h27 m58 0h25" stroke-width="1"/><circle cx="170" cy="110" r="47" stroke-width="1.4"/><circle cx="170" cy="110" r="37" stroke-width=".65" opacity=".5"/><g class="drum" opacity=".63"><path d="M141 121q14-19 29-8t29-9" stroke-width="1.1"/><path d="M141 128q16-17 29-7t29-10" stroke-width=".7" opacity=".65"/></g><path class="beam" pathLength="1" d="m157 171 8 8 18-18" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M58 73h19m186 0h19m-224 74h19m186 0h19" opacity=".5"/></g></svg>
  <svg class="scene-energy" viewBox="0 0 340 220"><g fill="none" stroke="currentColor"><circle cx="170" cy="110" r="64" opacity=".55" stroke-width=".75"/><path class="beam" pathLength="1" d="m177 71-29 42h21l-6 35 32-48h-22z" stroke-width="1.5" stroke-linejoin="round"/><path class="current" d="M27 110h79m128 0h79M111 58l-20-21m138 21 20-21M111 162l-20 21m138-21 20 21" stroke-width=".8"/><circle cx="27" cy="110" r="4"/><circle cx="313" cy="110" r="4"/></g></svg>
  <svg class="scene-alert" viewBox="0 0 340 220"><g fill="none" stroke="currentColor"><circle class="bell-wave" cx="170" cy="108" r="94" stroke-width=".7"/><circle cx="170" cy="108" r="64" stroke-width=".7" opacity=".6"/><path class="beam" pathLength="1" d="m170 72 34 64h-68z M170 94v20" stroke-width="1.5" stroke-linejoin="round"/></g><circle cx="170" cy="125" r="1.9" fill="currentColor"/></svg>
  <svg class="scene-status" viewBox="0 0 340 220"><g fill="none" stroke="currentColor"><path class="beam" pathLength="1" d="m170 27 114 61v53l-114 56-114-56V88z M56 88l114 57 114-57 M170 145v52 M113 57l114 61v50 M227 57l-114 61v50 M56 113l114 57 114-57" stroke-width="1"/><path d="M170 15v11M38 141h17m230 0h17m-132 57v10" stroke-width=".7" opacity=".65"/></g><circle class="status-dot" cx="170" cy="145" r="4" fill="currentColor"/><circle class="status-dot" cx="227" cy="118" r="3" fill="currentColor"/></svg>`;
/* ---------- język: polski (teksty w kodzie) albo angielski (słownik EN, klucz = polski tekst) ---------- */
let LANG = 'pl';
const EN = {
  // menu i ekran główny
  'Widoki dashboardu':'Dashboard views','Dom':'Home','Pokoje':'Rooms','Klimat':'Climate','Ogrzewanie':'Heating','Pogoda':'Weather','Energia':'Energy','Ochrona':'Security','Kosze':'Bins','Ustawienia':'Settings','Formuła 1':'Formula 1',
  'Status domu':'Home status','Aktualny czas':'Current time','Pokaż zdarzenie lub stan domu':'Show event or home status','Pobór prądu':'Power draw','Zamknij podgląd':'Close preview','Zamknij podgląd zdarzenia':'Close event preview',
  'Sceny':'Scenes','Teraz':'Now','Wszystkie pokoje':'All rooms','Ostatnie zdarzenia':'Recent events','Przełącz pokój':'Switch room','Zamknij':'Close',
  'Spokojnej nocy':'Good night','Dzień dobry':'Good morning','Miłego popołudnia':'Good afternoon','Dobry wieczór':'Good evening','Bez pokoju':'No room',
  'Wykryto alarm':'Alarm detected','wł.':'on','grzeje':'heating','Kosze dziś':'Bins today','Kosze jutro':'Bins tomorrow','Światła':'Lights','Ogrzewanie pracuje':'Heating is on','Stan urządzeń i pomieszczeń':'Devices and rooms',
  'Uwaga':'Attention','Dom odpoczywa':'Home is resting','Dom pracuje':'Home is busy','Spokojnie':'All calm',
  '{n} w pokojach':'{n} in rooms','światło':'light','światła':'lights','świateł':'lights','Zgaś wszystkie':'Turn all off','Zapal wszystkie':'Turn all on','tanio':'cheap','średnio':'average','drogo':'expensive','Brak czujnika mocy':'No power sensor',
  'czujnik':'sensor','czujniki':'sensors','czujników':'sensors','Okna zamknięte':'Windows closed','Pozostałe okna zamknięte':'Other windows closed','Brak odczytu okien':'No window readings','Brak odczytu':'No reading','i {n} więcej':'and {n} more',
  'Pokaż':'Show','Brak termostatu':'No thermostat','wyłączone':'off','cel':'target','Obniż temperaturę':'Lower temperature','Podwyższ temperaturę':'Raise temperature',
  'Zgaszone':'All off','Brak urządzeń':'No devices','encja':'entity','encje':'entities','encji':'entities','Otwórz':'Open','Zgaś światła':'Turn off lights','Zapal światła':'Turn on lights',
  'Brak pomieszczeń. Dodaj listę „rooms” w konfiguracji karty.':'No rooms. Add a “rooms” list to the card configuration.',
  'Dane demonstracyjne':'Demo data','Połączono z HA':'Connected to HA','Brak połączenia':'Offline','Włącz jasny motyw':'Switch to light theme','Włącz ciemny motyw':'Switch to dark theme',
  'pomieszczenie':'room','pomieszczenia':'rooms','pomieszczeń':'rooms','pomieszczeniu':'room','pomieszczeniach':'rooms','{n} wł. świateł':'{n} lights on','wszystkie światła zgaszone':'all lights off',
  'Brak połączenia z Home Assistantem':'No connection to Home Assistant','Zdarzenie':'Event','Energia · na żywo':'Energy · live','Stan domu':'Home status','Chwilowy pobór mocy domu':'Current power draw of the house',
  // stany encji
  'Brak encji':'No entity','Brak encji w HA':'Entity not found in HA','O':'At','Ostatnio':'Last','Wykryto':'Detected','Wykryto obecność':'Presence detected','Brak wykrycia':'Clear','Brak stanu':'No state',
  'Niedostępne':'Unavailable','Nieznany stan':'Unknown','Wł.':'On','Wył.':'Off','Grzanie':'Heat','Chłodzenie':'Cool','Grzanie i chłodzenie':'Heat/cool','Bezczynne':'Idle','Grzeje':'Heating','Chłodzi':'Cooling','Osuszanie':'Dry','Nawiew':'Fan only',
  'Otwarte':'Open','Zamknięte':'Closed','Zamknięty':'Locked','Odblokowany':'Unlocked','Rozbrojony':'Disarmed','Uzbrojony w domu':'Armed home','Uzbrojony poza domem':'Armed away','Tryb nocny':'Armed night','Odtwarzanie':'Playing','Wstrzymane':'Paused',
  'W domu':'Home','Poza domem':'Away','W stacji':'Docked','Sprząta':'Cleaning','Wraca':'Returning','Aktywne':'Active','Zakończone':'Finished','Czuwanie':'Standby','Doskonała':'Excellent','Dobra':'Good','Umiarkowana':'Moderate','Słaba':'Poor','Bardzo słaba':'Very poor',
  'Zakończony':'Finished','Błąd':'Error','Pracuje':'Running','Drukuje':'Printing','Przygotowanie':'Preparing','Pauza':'Paused','Gotowe':'Ready',
  'Noc':'Night','Urlop':'Vacation','Uzbrojony':'Armed','Uzbrajanie':'Arming','Oczekuje':'Pending',
  'Pochmurno':'Cloudy','Częściowe zachmurzenie':'Partly cloudy','Deszcz':'Rain','Ulewa':'Pouring','Słonecznie':'Sunny','Pogodna noc':'Clear night','Śnieg':'Snow','Mgła':'Fog','Wietrznie':'Windy',
  'Wyjątkowe warunki':'Exceptional','Grad':'Hail','Burza':'Thunderstorm','Burza z deszczem':'Thunderstorm with rain','Deszcz ze śniegiem':'Sleet','Wietrznie, chmury':'Windy and cloudy',
  // pokój i urządzenia
  'Zasilanie':'Power','Jasność':'Brightness','{on} z {n} wł.':'{on} of {n} on','Multimedia':'Media','Czujniki':'Sensors','Urządzenia':'Devices','Urządzenie':'Device',
  'Ten pokój nie ma jeszcze przypisanych urządzeń w konfiguracji karty.':'This room has no devices assigned in the card configuration yet.',
  'Dodaj listę „rooms” w konfiguracji karty, aby wybrać urządzenia tego pokoju.':'Add a “rooms” list to the card configuration to choose this room’s devices.',
  'Odtwórz / pauza':'Play / pause','Ciszej':'Volume down','Głośniej':'Volume up','Pełny':'Full','Tak':'Yes','Nie':'No',
  'Stan':'Status','Etap':'Stage','Pozostało':'Remaining','Postęp':'Progress','Koniec':'Ends','Warstwa':'Layer','Warstw':'Layers','Zadanie':'Job','Dysza':'Nozzle','Dysza · cel':'Nozzle · target','Stół':'Bed','Stół · cel':'Bed · target',
  'Filtr':'Filter','Porcje':'Portions','Wizyty dziś':'Visits today','Waga kota':'Cat weight','Czas wizyty':'Visit length','Użycia':'Uses','Ostatnia porcja':'Last portion','Bateria':'Battery','Pojemnik':'Bin','Zbiornik wody':'Water tank','Temperatura':'Temperature',
  'Czyszczenie':'Clean','Nakarm':'Feed','Wstrzymaj':'Pause','Wznów':'Resume','Zatrzymaj':'Stop','Światło':'Light',
  // klimat i energia
  'wilgotność':'humidity','okno otwarte':'window open','Średnio {t} w {n}':'Average {t} across {n}','Brak odczytów temperatury':'No temperature readings','Na zewnątrz':'Outside','Pomieszczenia':'Rooms','Termostaty i klimatyzacja':'Thermostats and air conditioning',
  'Moc teraz':'Power now','Prąd dziś':'Electricity today','Koszt':'Cost','Wczoraj':'Yesterday','Opłata stała':'Standing charge','Cena prądu':'Electricity price','Następna':'Next','Tanie grzanie':'Cheap heating','Gaz dziś':'Gas today','Objętość':'Volume','Stawka':'Rate',
  'Woda wczoraj':'Water yesterday','Woda':'Water','Ścieki':'Sewerage','Odczyt':'Reading','dziś':'today','Dom pobiera teraz {p}':'The house is drawing {p}','Zużycie i koszty z liczników':'Usage and costs from your meters','Liczniki':'Meters',
  'Nie znalazłem w Home Assistant encji wpisanych w „energy_page”.':'None of the entities in “energy_page” were found in Home Assistant.','Dodaj sekcję „energy_page” w konfiguracji karty.':'Add an “energy_page” section to the card configuration.',
  // ochrona
  'Wszystko w porządku':'All good','{n} bez odczytu':'{n} without a reading','słaba bateria':'low battery','słabe baterie':'low batteries','słabych baterii':'low batteries','Czujniki działają, nie ma alarmów':'Sensors are working, no alarms','Tryb ochrony':'Security mode','Okna':'Windows','Wycieki i czad':'Leaks and CO','Ruch i obecność':'Motion and presence',
  'Dzwonek':'Doorbell','Osoba':'Person','Ruch':'Motion','Kamera wyłączona':'Camera off','Spokój':'Quiet','Kamery':'Cameras','Brak podglądu':'No preview','Nagrywa':'Recording','Baterie czujników':'Sensor batteries','Dodaj sekcję „security_page” w konfiguracji karty.':'Add a “security_page” section to the card configuration.',
  // F1
  'stan toru':'track status','za {x}':'in {x}','dzień':'day','dni':'days','za {n} godz.':'in {n} h','za {n} min':'in {n} min','Sesja':'Session','Na żywo':'Live','{s} trwa':'{s} is on','Runda':'Round','z':'of','Tydzień wyścigowy':'Race week',
  'Pierwszy trening już blisko':'First practice is close','Pierwszy trening za {x}':'First practice in {x}','Lider {n} +{p} pkt':'Leader {n} +{p} pts','Brak danych':'No data','czekam na stan toru':'waiting for track status','lider':'leader',
  'Stan toru':'Track status','Okrążenie':'Lap','Do końca':'Remaining','Na torze':'At the track','tor':'track','Automatyzacja F1':'F1 automation','automatyzacja włączona':'automation on','automatyzacja wyłączona':'automation off','otwórz pokój z telewizorem':'open the TV room',
  'Sesja zaraz się zacznie':'Session about to start','trwa':'now','najbliżej':'next','godz.':'hrs','Do wyścigu':'Until the race','Wyścig {d} o {h}':'Race {d} at {h}','{n} okrążeń':'{n} laps','weekend ze sprintem':'sprint weekend','Następny wyścig':'Next race','zakończona':'finished',
  'runda':'round','po {x}':'after {x}','rundzie':'round','rundach':'rounds','Broni zwycięstwa':'Defending winner','start z':'started','Ostatni zwycięzcy':'Recent winners','Pole position → zwycięstwo':'Pole position → win','w ostatnich wyścigach tutaj':'in recent races here',
  'Nie dojeżdża do mety':'Did not finish','kierowców w ostatnich latach':'of drivers in recent years','Obrys toru':'Track outline','deszcz':'rain','wiatr':'wind','Kwalifikacje':'Qualifying','Wyścig':'Race','Okrążenia':'Laps','Tryb bez spoilerów':'No-spoiler mode','włączony':'on','wyłączony':'off',
  'wyścig':'race','wyścigi':'races','wyścigów':'races','Trening 1':'Practice 1','Trening 2':'Practice 2','Trening 3':'Practice 3','Kwalifikacje do sprintu':'Sprint qualifying',
  'Stan na torze':'On track','Pozycje':'Positions','Dyrekcja wyścigu':'Race control','Dom w trakcie wyścigu':'Home during the race','tylko podgląd':'view only','Plan weekendu':'Weekend schedule','Twój czas':'your time','Ostatni wyścig':'Last race','Kierowcy':'Drivers','Zespoły':'Teams',
  'O torze':'About the circuit','Pogoda na wyścig':'Race weather','Szybko':'At a glance',
  'Pozycje pojawią się, gdy sesja ruszy.':'Positions appear once the session starts.','Brak komunikatów.':'No messages.','Brak planu sesji.':'No session schedule.','Brak wyników.':'No results.','Wyniki ukryte, bo tryb bez spoilerów jest włączony.':'Results hidden: no-spoiler mode is on.',
  'Brak klasyfikacji.':'No standings.','Klasyfikacja ukryta, bo tryb bez spoilerów jest włączony.':'Standings hidden: no-spoiler mode is on.','Brak danych o torze.':'No circuit data.','Prognoza pojawi się bliżej wyścigu.':'The forecast appears closer to the race.',
  'Nie widzę integracji F1 Sensor w Home Assistant.':'The F1 Sensor integration was not found in Home Assistant.',
  'Zielona flaga':'Green flag','tor czysty, ścigamy się':'track clear, racing','Żółta flaga':'Yellow flag','uwaga, zdarzenie na torze':'caution, incident on track','Podwójna żółta':'Double yellow','niebezpieczeństwo na torze':'danger on track','Wirtualny SC':'Virtual SC',
  'neutralizacja na całym torze':'neutralised on the whole track','Koniec VSC':'VSC ending','zaraz wracamy do ścigania':'racing resumes shortly','stawka jedzie za samochodem bezpieczeństwa':'the field is behind the safety car','Czerwona flaga':'Red flag','sesja przerwana':'session stopped',
  'bezchmurnie':'clear','małe zachmurzenie':'mostly clear','pochmurno':'cloudy','mgła':'fog','mżawka':'drizzle','śnieg':'snow','przelotny deszcz':'showers','burza':'thunderstorm',
  // kosze
  'czarny':'black','brązowy':'brown','żółty':'yellow','metale i tworzywa':'metals and plastics','Własny harmonogram':'Your own schedule','zielony':'green','niebieski':'blue','szary':'grey','fioletowy':'purple','czerwony':'red','{c} kosz':'{c} bin',
  'recykling':'recycling','odpady ogrodowe':'garden waste','odpady spożywcze':'food waste','szkło':'glass','papier':'paper','odpady zmieszane':'general waste',
  'jutro':'tomorrow','za {n} dni':'in {n} days','Najbliższy odbiór {r}':'Next collection {r}','Wczytuję harmonogram odbiorów…':'Loading the collection schedule…','Kalendarz nie ma żadnych przyszłych odbiorów.':'The calendar has no upcoming collections.',
  'Odbiór jest dziś. Kosze powinny już stać przy drodze.':'Collection is today. The bins should already be out.','Wystaw dziś wieczorem.':'Put them out this evening.','Co wystawić jako następne':'What goes out next',
  'Kolejne terminy pojawią się, gdy rada je opublikuje.':'More dates will appear once the council publishes them.','Najbliższe terminy dla każdego kosza':'Next date for each bin','Nadchodzące odbiory':'Upcoming collections','Źródło':'Source',
  // pogoda
  'z kierunku {d}':'from {d}','wg prognozy na tę godzinę':'from the forecast for this hour','Wiatr':'Wind','Kierunek':'Direction','Wilgotność':'Humidity','Punkt rosy':'Dew point','Ciśnienie':'Pressure','Zachmurzenie':'Cloud cover','Indeks UV':'UV index','Widoczność':'Visibility',
  'Słońce':'Sun','wschód':'sunrise','zachód':'sunset','Wschód':'Sunrise','Zachód':'Sunset','Dziś':'Today','Jutro':'Tomorrow','Czekam na prognozę z Home Assistant…':'Waiting for the forecast from Home Assistant…','Najbliższe godziny':'Next hours','Kolejne dni':'Next days',
  'Brak encji pogody w Home Assistant.':'No weather entity in Home Assistant.',
  // ogrzewanie
  'brak połączenia':'offline','grzeje – kocioł pracuje':'heating – boiler on','temperatura osiągnięta':'temperature reached','zawór {v}otwarty – grzeje':'valve {v}open – heating','zawór {v}otwarty – czeka na kocioł':'valve {v}open – waiting for the boiler','zawór zamknięty':'valve closed',
  'Komfort':'Comfort','termostat główny':'main thermostat','Auto: {s} wraca do swojego harmonogramu. Pokoje bez zmian.':'Auto: {s} returns to its own schedule. Rooms unchanged.','Komfort: {s} {a}°, pozostałe pokoje {b}°.':'Comfort: {s} {a}°, other rooms {b}°.',
  'Eco: {s} oszczędnie, pozostałe pokoje {b}°.':'Eco: {s} economy, other rooms {b}°.','Boost: wszystkie pokoje +{b}° od obecnej zadanej, bez automatycznego powrotu.':'Boost: all rooms +{b}° above their current target, no automatic return.',
  '{m} ustawiony':'{m} set','Termostat nie przyjął zmiany.':'The thermostat rejected the change.','Termostat':'Thermostat','Wyłączone':'Off','instalacja na żywo':'live system','Kocioł':'Boiler','Czuwa':'Standby','Żądanie ciepła':'Heat demand','TAK – grzeje':'YES – heating','Nie – czuwa':'No – standby',
  'Aktywne obiegi':'Active circuits','Pompa obiegowa':'Circulation pump','pracuje':'running','stop':'stopped','grzejnik':'radiator','Podłogówka':'Floor heating','włączona':'on','wył.':'off','Dodaj pokoje w „heating_page → rooms”.':'Add rooms under “heating_page → rooms”.',
  'Stuknij ponownie, aby ustawić.':'Tap again to apply.','Tryb zmienia termostaty dopiero po drugim stuknięciu.':'A mode changes the thermostats only on the second tap.','koszt':'cost','Tryb ogrzewania':'Heating mode','Praca kotła dziś':'Boiler runtime today','według kotła':'from the boiler',
  'według żądań termostatu':'from thermostat demand','Tryb systemu':'System mode','czuwa':'standby',
  // ustawienia
  'Jasny':'Light','Ciemny':'Dark','Jak w systemie':'System','Ten ekran':'This screen','Motyw i język zapamiętuje to urządzenie. Inne ekrany mają własny wybór.':'Theme and language are remembered on this device. Other screens keep their own choice.','Język':'Language','Jak w Home Assistant':'Same as Home Assistant','Pulpit':'Dashboard',
  'Pokoje i urządzenia zmieniasz w konfiguracji karty (lista „rooms”).':'Rooms and devices are set in the card configuration (the “rooms” list).','Pulpit może zmieniać tylko administrator.':'Only an administrator can change the dashboard.','Edytuj pulpit':'Edit dashboard','Pokaż menu HA':'Show HA menu',
  'Konto':'Account','administrator':'administrator','użytkownik':'user','Połączenie':'Connection','Połączono':'Connected','Wersja HA':'HA version','Urządzenia, integracje, użytkownicy i pozostałe pulpity ustawia się w Home Assistant.':'Devices, integrations, users and other dashboards are managed in Home Assistant.',
  'Otwórz ustawienia Home Assistant':'Open Home Assistant settings','widoczna w menu':'shown in the menu','ukryta':'hidden','brak danych w Home Assistant':'no data in Home Assistant','Ukryj zakładkę {n}':'Hide the {n} tab','Pokaż zakładkę {n}':'Show the {n} tab','Zakładki w menu':'Menu tabs',
  'Wybierz, które zakładki mają być widoczne na tym urządzeniu. Wybór zapamiętuje przeglądarka, jak motyw. Dla wszystkich urządzeń ustawisz to w konfiguracji karty (<code>hidden_tabs</code>). Dom i Ustawienia są zawsze widoczne.':'Choose which tabs are shown on this device. The browser remembers the choice, like the theme. To set it for every device, use <code>hidden_tabs</code> in the card configuration. Home and Settings are always shown.',
  'pokoje':'rooms','ochrona':'security','ogrzewanie':'heating','pokój':'room','pokoi':'rooms','Gotowa konfiguracja':'Ready-made configuration',
  'Karta sama dobrała z obszarów Home Assistanta: {parts} ({rooms}, {ents}). Skopiuj YAML, wklej go w edytorze pulpitu (⋮ → Edytuj pulpit → ⋮ → Edytor kodu) w miejsce tej karty, popraw nazwy i dopisz urządzenia.':'The card picked these from your Home Assistant areas: {parts} ({rooms}, {ents}). Copy the YAML and paste it in the dashboard editor (⋮ → Edit dashboard → ⋮ → Raw configuration editor) in place of this card, then rename things and add devices.',
  'Pulpit używa Twojej konfiguracji. Poniżej to, co karta z niej odczytała.':'The dashboard uses your configuration. Below is what the card read from it.','Ukryj YAML':'Hide YAML','Pokaż YAML':'Show YAML','Kopiuj':'Copy','Skopiowano YAML do schowka':'YAML copied to the clipboard',
  'Przeglądarka nie pozwala na schowek. Zaznacz YAML poniżej i skopiuj ręcznie.':'The browser blocks the clipboard. Select the YAML below and copy it manually.',
  // komunikaty i zdarzenia
  'Urządzenie nie przyjęło polecenia.':'The device rejected the command.','Odtwarzacz nie przyjął polecenia.':'The player rejected the command.','Nie udało się zmienić trybu.':'Could not change the mode.','Home Assistant nie przyjął polecenia.':'Home Assistant rejected the command.',
  'Nie udało się zmienić jasności.':'Could not change the brightness.','Nie udało się zapalić świateł':'Could not turn on the lights','Nie udało się zgasić świateł':'Could not turn off the lights','Nie udało się zgasić świateł.':'Could not turn off the lights.','Zgaszono {n}':'Turned off {n}',
  'Termostat nie przyjął temperatury.':'The thermostat rejected the temperature.','Nie udało się włączyć sceny.':'Could not activate the scene.','Suszenie zakończone':'Drying finished','Pranie zakończone':'Washing finished','Dzwonek do drzwi':'Doorbell',
  'Czujnik wykrył zdarzenie alarmowe':'A sensor detected an alarm event','Zarejestrowano naciśnięcie dzwonka':'The doorbell was pressed','Program dobiegł końca':'The program has finished',
};
const T = (text, vars) => {
  let out = LANG === 'en' && Object.prototype.hasOwnProperty.call(EN,text) ? EN[text] : text;
  if (vars) out = String(out).replace(/\{(\w+)\}/g,(m,k)=>k in vars ? String(vars[k]) : m);
  return out;
};
const loc = () => LANG === 'en' ? 'en-GB' : 'pl-PL';
const setLang = lang => { if (lang === LANG) return; LANG = lang; number = new Intl.NumberFormat(loc(),{maximumFractionDigits:1}); };
const labels = {light:'Światła',switch:'Przełączniki',climate:'Termostaty i klima',sensor:'Czujniki',binary_sensor:'Czujniki dwustanowe',weather:'Pogoda',media_player:'Multimedia',cover:'Rolety i bramy',fan:'Wentylatory',vacuum:'Odkurzacze',camera:'Kamery',lock:'Zamki',alarm_control_panel:'Alarmy',automation:'Automatyzacje',script:'Skrypty',scene:'Sceny',person:'Osoby',device_tracker:'Lokalizacja',update:'Aktualizacje',button:'Przyciski',event:'Zdarzenia',input_boolean:'Przełączniki pomocnicze',number:'Pola liczbowe',select:'Listy wyboru',humidifier:'Nawilżacze',water_heater:'Podgrzewacze wody',calendar:'Kalendarze',timer:'Minutniki',sun:'Słońce',counter:'Liczniki'};
const glyphFor = {light:'light',switch:'power',climate:'thermo',sensor:'sensor',binary_sensor:'sensor',weather:'weather',fan:'fan',lock:'door',cover:'door',camera:'shield',alarm_control_panel:'shield',automation:'bolt',event:'bell',input_boolean:'power',humidifier:'water',water_heater:'water',update:'arrow',button:'power',sun:'sun',scene:'spark'};
const stateLabels = {unavailable:'Niedostępne',unknown:'Nieznany stan',on:'Wł.',off:'Wył.',heat:'Grzanie',cool:'Chłodzenie',heat_cool:'Grzanie i chłodzenie',auto:'Auto',idle:'Bezczynne',heating:'Grzeje',cooling:'Chłodzi',dry:'Osuszanie',fan_only:'Nawiew',open:'Otwarte',closed:'Zamknięte',locked:'Zamknięty',unlocked:'Odblokowany',disarmed:'Rozbrojony',armed_home:'Uzbrojony w domu',armed_away:'Uzbrojony poza domem',armed_night:'Tryb nocny',triggered:'Alarm',playing:'Odtwarzanie',paused:'Wstrzymane',home:'W domu',not_home:'Poza domem',cloudy:'Pochmurno',partlycloudy:'Częściowe zachmurzenie',rainy:'Deszcz',pouring:'Ulewa',sunny:'Słonecznie','clear-night':'Pogodna noc',snowy:'Śnieg',fog:'Mgła',windy:'Wietrznie',docked:'W stacji',cleaning:'Sprząta',returning:'Wraca',active:'Aktywne',finished:'Zakończone',standby:'Czuwanie',online:'Online',offline:'Offline',excellent:'Doskonała',good:'Dobra',moderate:'Umiarkowana',fair:'Umiarkowana',poor:'Słaba',very_poor:'Bardzo słaba',finish:'Zakończony',failed:'Błąd',running:'Pracuje',printing:'Drukuje',prepare:'Przygotowanie',pause:'Pauza',ready:'Gotowe',recording:'Nagrywa',streaming:'Na żywo'};
const alarmShort = {disarmed:'Rozbrojony',armed_home:'W domu',armed_away:'Poza domem',armed_night:'Noc',armed_vacation:'Urlop',armed_custom_bypass:'Uzbrojony',arming:'Uzbrajanie',pending:'Oczekuje',triggered:'Alarm!'};
const groups = {lights:{label:'Światła',glyph:'light'}, climate:{label:'Klimat',glyph:'thermo'}, energy:{label:'Energia',glyph:'bolt'}, security:{label:'Ochrona',glyph:'shield'}};
const securityClasses = new Set(['door','window','opening','garage_door','lock','moisture','smoke','gas','carbon_monoxide','safety','tamper','motion','occupancy']);
const criticalClasses = new Set(['moisture','smoke','gas','carbon_monoxide','safety','tamper']);
const openingClasses = new Set(['door','window','opening','garage_door']);
const toggleDomains = new Set(['light','switch','fan','input_boolean']);
let number = new Intl.NumberFormat('pl-PL',{maximumFractionDigits:1});
const collator = new Intl.Collator('pl',{numeric:true,sensitivity:'base'});
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch]);
const icon = key => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"><path d="${glyphs[key] || glyphs.device}"/></svg>`;
function drawing(key,room=false) {
  const design = room && roomArt[key];
  const accent = room ? design?.[1] && `<path class="room-glow" d="${design[1]}"/>` : '<circle class="active-mark" cx="116" cy="28" r="2.7"/>';
  return `<svg class="tile-art" viewBox="0 0 148 82" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">${room ? '<path class="architect" d="M8 78h132m-6-57h6m-3-3v6M13 27h7m-3.5-3.5v7"/>' : ''}${accent || ''}<path pathLength="1" class="drawing" d="${design?.[0] || art[key] || art.rooms}"/></svg>`;
}
const fold = value => String(value ?? '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l');
const available = row => row && !['unknown','unavailable'].includes(row.state);
// liczba z jednostką; jednostka pochodzi z atrybutów HA, więc usuwamy z niej znaki HTML
// (wynik i tak trafia do HTML przez escapeHTML — to dodatkowe zabezpieczenie)
const format = (value, unit = '') => { const u = String(unit ?? '').replace(/[<>&"'`]/g,''); return value == null || value === '' || !Number.isFinite(Number(value)) ? '—' : `${number.format(Number(value))}${u ? (u === '°' ? '' : ' ') + u : ''}`; };
function roomIcon(name) {
  const plain = fold(name);
  const styles = [[/salon|living|lounge|family/,'sofa'],[/kuch|kitchen|dining|jadal/,'kitchen'],[/sypial|bed|dziec|kid|child/,'bed'],[/lazien|bath|toilet|(^| )wc( |$)/,'bath'],[/pral|laundry|utility/,'wash'],[/hall|korytar|przedpok/,'door'],[/ogrod|garden|outside/,'tree'],[/garaz|garage/,'home']];
  return styles.find(([match]) => match.test(plain))?.[1] || 'rooms';
}
function presetIcon(name) {
  const plain = fold(name);
  const styles = [[/rano|poran|morning|wake/,'sunrise'],[/wiecz|evening|relax/,'sofa'],[/film|movie|kino|tv/,'film'],[/noc|night|sleep|spa/,'moon'],[/wyj|away|leave|poza/,'out']];
  return styles.find(([match]) => match.test(plain))?.[1] || 'spark';
}

const listOf = value => (Array.isArray(value) ? value : value ? [value] : []).map(item=>typeof item === 'string' ? {entity:item} : item).filter(item=>item && typeof item.entity === 'string');
const pages = {home:'', rooms:'pokoje', climate:'klimat', heating:'ogrzewanie', weather:'pogoda', energy:'energia', security:'ochrona', bins:'kosze', f1:'f1', settings:'ustawienia'};
const tabNames = {rooms:'Pokoje',climate:'Klimat',heating:'Ogrzewanie',weather:'Pogoda',energy:'Energia',security:'Ochrona',bins:'Kosze',f1:'F1'};
/* F1: encje integracji F1 Sensor (jak w Home Pulse); nadpisywane przez `f1: {...}` w konfiguracji karty */
const F1_DEF = {next:'sensor.f1_next_race',drivers:'sensor.f1_driver_standings',teams:'sensor.f1_constructor_standings',last:'sensor.f1_last_race_results',
  weather:'sensor.f1_weather',season:'sensor.f1_current_season',week:'binary_sensor.f1_race_week',nospoil:'switch.f1_no_spoiler_mode',
  track:'sensor.f1_track_status',status:'sensor.f1_session_status',session:'sensor.f1_current_session',laps:'sensor.f1_race_lap_count',
  remain:'sensor.f1_session_session_time_remaining',positions:'sensor.f1_drivers_driver_positions',list:'sensor.f1_drivers_driver_list',
  rc:'sensor.f1_officials_race_control',tw:'sensor.f1_track_weather',led:''};
const F1_SES = [['first_practice_start','Trening 1','clock',60],['second_practice_start','Trening 2','clock',60],['third_practice_start','Trening 3','clock',60],
  ['sprint_qualifying_start','Kwalifikacje do sprintu','bolt',45],['sprint_start','Sprint','flag',60],['qualifying_start','Kwalifikacje','bolt',60],['race_start','Wyścig','flag',120]];
const F1_SNAME = {race:'Wyścig',qualifying:'Kwalifikacje',sprint:'Sprint','sprint qualifying':'Kwalifikacje do sprintu','sprint shootout':'Kwalifikacje do sprintu','practice 1':'Trening 1','practice 2':'Trening 2','practice 3':'Trening 3'};
const F1_TRACK = {CLEAR:['ok','Zielona flaga','tor czysty, ścigamy się'],GREEN:['ok','Zielona flaga','tor czysty, ścigamy się'],YELLOW:['warn','Żółta flaga','uwaga, zdarzenie na torze'],DOUBLE_YELLOW:['warn','Podwójna żółta','niebezpieczeństwo na torze'],
  VSC:['warn','Wirtualny SC','neutralizacja na całym torze'],VSC_ENDING:['warn','Koniec VSC','zaraz wracamy do ścigania'],SC:['warn','Safety car','stawka jedzie za samochodem bezpieczeństwa'],RED:['bad','Czerwona flaga','sesja przerwana']};
const F1_COUNTRY = {Australia:'Australia',China:'Chiny',Japan:'Japonia',Bahrain:'Bahrajn','Saudi Arabia':'Arabia Saudyjska',USA:'USA','United States':'USA',Italy:'Włochy',Monaco:'Monako',Spain:'Hiszpania',Canada:'Kanada',Austria:'Austria',UK:'Wielka Brytania','United Kingdom':'Wielka Brytania',Belgium:'Belgia',Hungary:'Węgry',Netherlands:'Holandia',Azerbaijan:'Azerbejdżan',Singapore:'Singapur',Mexico:'Meksyk',Brazil:'Brazylia',Qatar:'Katar',UAE:'ZEA','Abu Dhabi':'Abu Zabi'};
const F1_TEAM = {mercedes:'MER',ferrari:'FER',red_bull:'RBR',mclaren:'MCL',rb:'RB',aston_martin:'AMR',alpine:'ALP',williams:'WIL',haas:'HAA',sauber:'SAU',audi:'AUD',cadillac:'CAD'};
const F1_TEAM_COL = {mercedes:'#27f4d2',ferrari:'#e8002d',red_bull:'#3671c6',mclaren:'#ff8000',rb:'#6692ff',aston_martin:'#229971',alpine:'#ff87bc',williams:'#64c4ff',haas:'#b6babd',sauber:'#52e252',audi:'#c0c0c0',cadillac:'#d4af37'};
const plN = (n,a,b,c) => LANG === 'en' ? `${n} ${T(n === 1 ? a : c)}` : `${n} ${n === 1 ? a : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? b : c}`;
// bolid na stronie F1: statyczny szkic (obrazek od użytkownika), w ciemnym motywie odwracany przez CSS
const F1_CAR = 'data:image/webp;base64,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';
const f1Scene = () => `<div class="f1-art"><img src="${F1_CAR}" alt="" draggable="false"></div>`;
/* kosze: kolory z nazw wydarzeń kalendarza (Waste Collection Schedule), tak jak w Home Pulse */
const BIN_KIND = [[/black|czarn/i,'czarny','#26272b'],[/brown|brąz|braz/i,'brązowy','#9a5a28'],[/green|zielon/i,'zielony','#2f8a45'],[/blue|niebiesk/i,'niebieski','#2f6fd0'],[/yellow|żółt|zolt/i,'żółty','#e0b21b'],[/gr[ae]y|szar/i,'szary','#8a8a8a'],[/purple|fiolet/i,'fioletowy','#7a4fb0'],[/red|czerwon/i,'czerwony','#c0392b']];
const BIN_BY_NAME = [[/recycl|recykl/i,'recykling','#2f8a45'],[/garden|green waste|ogrod/i,'odpady ogrodowe','#9a5a28'],[/food|bio|kitchen|spożyw/i,'odpady spożywcze','#6d7d2a'],[/metal|plasti|tworzyw/i,'metale i tworzywa','#e0b21b'],[/glass|szkł/i,'szkło','#2a8a86'],[/paper|card|papier/i,'papier','#2f6fd0'],[/general|refuse|rubbish|residual|landfill|household|zmiesz/i,'odpady zmieszane','#26272b']];
const BIN_PRESETS = [[/peterborough/i,{czarny:'odpady zmieszane','brązowy':'odpady ogrodowe',zielony:'recykling'}]];
const W_ACC = {'poniedziałek':'w poniedziałek','wtorek':'we wtorek','środa':'w środę','czwartek':'w czwartek','piątek':'w piątek','sobota':'w sobotę','niedziela':'w niedzielę'};
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
/* prosty zapis do YAML (obiekty, listy, teksty, liczby) dla generatora konfiguracji */
const yamlStr = v => /^[\w.\-\/]+$/.test(v) && !/^(true|false|null|yes|no|on|off|~|-?\d[\d.e+\-]*)$/i.test(v) ? v : JSON.stringify(v);
const flowOk = o => o && typeof o === 'object' && !Array.isArray(o) && Object.values(o).every(v=>typeof v !== 'object' || v === null) && JSON.stringify(o).length < 110;
function toYaml(v,ind = '') {
  if (Array.isArray(v)) return v.map(x=>flowOk(x) ? `${ind}- {${Object.entries(x).map(([k,y])=>`${k}: ${typeof y === 'string' ? yamlStr(y) : y}`).join(', ')}}` : x && typeof x === 'object' ? `${ind}- ${toYaml(x,ind + '  ').trimStart()}` : `${ind}- ${typeof x === 'string' ? yamlStr(x) : x}`).join('\n');
  return Object.entries(v).filter(([,x])=>x !== undefined && x !== null).map(([k,x])=>Array.isArray(x) ? `${ind}${k}:\n${toYaml(x,ind + '  ')}` : x && typeof x === 'object' ? `${ind}${k}:\n${toYaml(x,ind + '  ')}` : `${ind}${k}: ${typeof x === 'string' ? yamlStr(x) : x}`).join('\n');
}
const andList = a => a.length <= 1 ? a.join('') : `${a.slice(0,-1).join(', ')} ${LANG === 'en' ? 'and' : 'i'} ${a.at(-1)}`;
const binArt = (k,i = 0) => `<svg viewBox="0 0 64 86" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="--bin:${k.col}" aria-hidden="true">
  <path class="lid" d="M7 15h50l-3-7H10z" fill="var(--bin)" fill-opacity=".95"/><path d="M27 8V5h10v3"/>
  <path class="bin-body" d="M10 17h44l-4.5 56a4 4 0 0 1-4 3.7H18.5a4 4 0 0 1-4-3.7z"/><path d="M22 28v38M32 28v38M42 28v38" stroke-opacity=".35"/>
  <circle cx="20" cy="79" r="5" fill="var(--base)"/><circle cx="20" cy="79" r="1.4" fill="currentColor"/></svg>`;
const weatherLabels = {'clear-night':'Pogodna noc',cloudy:'Pochmurno',exceptional:'Wyjątkowe warunki',fog:'Mgła',hail:'Grad',lightning:'Burza','lightning-rainy':'Burza z deszczem',partlycloudy:'Częściowe zachmurzenie',pouring:'Ulewa',rainy:'Deszcz',snowy:'Śnieg','snowy-rainy':'Deszcz ze śniegiem',sunny:'Słonecznie',windy:'Wietrznie','windy-variant':'Wietrznie, chmury'};
const weatherGlyph = {'clear-night':'moon',cloudy:'weather',exceptional:'spark',fog:'fog',hail:'snow',lightning:'storm','lightning-rainy':'storm',partlycloudy:'partly',pouring:'rain',rainy:'rain',snowy:'snow','snowy-rainy':'snow',sunny:'sun',windy:'wind','windy-variant':'wind'};
const windDirs = ['Pn','Pn-Wsch','Wsch','Pd-Wsch','Pd','Pd-Zach','Zach','Pn-Zach'], windDirsEn = ['N','NE','E','SE','S','SW','W','NW'];
const stl = state => stateLabels[state] ? T(stateLabels[state]) : state;
const country = c => LANG === 'en' ? c : F1_COUNTRY[c] || c;
const rnd = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const cloudPath = 'M-58 24c-14 0-23-10-21-21s13-18 25-16c4-16 20-26 38-24s30 14 32 30c12-4 26 2 30 14s-2 23-17 23z';
function weatherScene(cond,night,temp) {
  const c = cond || 'cloudy', is = (...k) => k.includes(c);
  const rain = is('rainy','pouring','lightning-rainy','snowy-rainy'), snow = is('snowy','snowy-rainy'), hail = is('hail'), storm = is('lightning','lightning-rainy');
  const fog = is('fog'), wind = is('windy','windy-variant'), clear = is('sunny','clear-night'), partly = is('partlycloudy','windy-variant');
  const sky = clear || partly || wind || is('exceptional');
  const dark = rain || snow || storm || hail;
  const clouds = clear ? 0 : partly ? 2 : wind ? 1 : fog ? 1 : 3;
  let s = '';
  if (sky && !night) s += `<circle class="halo" cx="250" cy="96" r="120" fill="url(#wx-glow)" stroke="none"/><g class="rays">${Array.from({length:12},(_,i)=>{ const a = i / 12 * Math.PI * 2; return `<path d="M${(250 + Math.cos(a) * 48).toFixed(1)} ${(96 + Math.sin(a) * 48).toFixed(1)}L${(250 + Math.cos(a) * 62).toFixed(1)} ${(96 + Math.sin(a) * 62).toFixed(1)}"/>`; }).join('')}</g><circle class="sun-core" cx="250" cy="96" r="36"/>`;
  if (sky && night) s += Array.from({length:16},(_,i)=>`<circle class="star" cx="${(70 + rnd(i) * 660).toFixed(0)}" cy="${(18 + rnd(i + 40) * 120).toFixed(0)}" r="${(1 + rnd(i + 80) * 1.4).toFixed(1)}" style="--dl:${(-rnd(i + 9) * 3).toFixed(2)}s"/>`).join('') + '<path class="moon" d="M262 58a40 40 0 1 0 34 60 33 33 0 1 1-34-60z"/>';
  const spots = [[340,96,1.25,26,34],[560,70,1,34,-44],[170,128,.9,30,38]];
  s += spots.slice(0,clouds).map(([x,y,k,d,dx])=>`<g transform="translate(${x} ${y}) scale(${k})"><path class="cloud${dark ? ' dark' : ''}" style="--dur:${d}s;--dx:${dx}px" d="${cloudPath}"/></g>`).join('');
  if (rain) { const n = is('pouring') ? 72 : 44, t = is('pouring') ? .55 : .95; s += Array.from({length:n},(_,i)=>{ const x = 120 + rnd(i) * 560, y = 118 + rnd(i + 99) * 40; return `<path class="drop" style="--t:${t}s;--dl:${(-rnd(i + 7) * t).toFixed(2)}s" d="M${x.toFixed(0)} ${y.toFixed(0)}l-4 13"/>`; }).join(''); }
  if (snow || hail) { const n = hail ? 50 : 46; s += Array.from({length:n},(_,i)=>{ const t = hail ? 1.3 + rnd(i) * .5 : 5 + rnd(i) * 4; return `<circle class="flake" style="--t:${t.toFixed(2)}s;--dl:${(-rnd(i + 3) * t).toFixed(2)}s" cx="${(110 + rnd(i + 21) * 580).toFixed(0)}" cy="${(110 + rnd(i + 61) * 40).toFixed(0)}" r="${(hail ? 1.6 : 2 + rnd(i + 5) * 2).toFixed(1)}"/>`; }).join(''); }
  if (storm) s += '<rect class="flash" x="-40" y="-40" width="880" height="380"/><path class="bolt" d="M372 132l-20 44h17l-11 38 36-52h-18l14-30z"/>';
  if (fog) s += [150,172,194,216,238].map((y,i)=>`<path class="fogline" style="--dur:${8 + i * 2}s;--dx:${i % 2 ? -36 : 36}px" d="M${60 + i * 18} ${y}q40-9 80 0t80 0t80 0t80 0t80 0t80 0t80 0"/>`).join('');
  if (wind) s += [[110,128],[150,162],[96,196]].map(([x,y],i)=>`<path class="gust" pathLength="1" style="--dl:${i * .55}s" d="M${x} ${y}h${260 - i * 40}c26 0 34-30 12-34s-26 18-10 22"/>`).join('');
  const smoke = temp != null && temp < 12 ? '<path class="smoke" pathLength="1" d="M587 150c-7-8 6-13 0-21s6-13 0-21"/>' : '';
  s += `<path class="far" d="M0 232c120-22 240-12 330-18s250-24 470-6"/>
    <path class="ground" d="M0 254c110-10 210-4 300-6s300-12 500 2"/>
    <g class="tree"><path d="M120 252v-34M104 218l16-34 16 34zM160 252v-24M148 228l12-26 12 26z"/><path d="M712 252v-30M698 222l14-30 14 30z"/></g>
    <path d="M488 198l62-46 62 46M500 189v63h100v-63M579 160v-14h14v25"/><rect class="window" x="515" y="205" width="24" height="20" rx="2"/><path d="M527 205v20M515 215h24" opacity=".6"/><rect x="560" y="216" width="20" height="36" rx="2"/>${smoke}`;
  return `<svg class="wx-scene" viewBox="0 0 800 270" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><defs><radialGradient id="wx-glow"><stop offset="0" stop-color="#f6b36b" stop-opacity=".38"/><stop offset="1" stop-color="#f6b36b" stop-opacity="0"/></radialGradient></defs>${s}</svg>`;
}
const boilerArt = `<svg class="boiler-art" viewBox="0 0 200 210" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="45" y="8" width="110" height="138" rx="12"/><rect x="72" y="24" width="56" height="20" rx="4"/><path d="M80 34h22" opacity=".6"/>
  <circle cx="80" cy="60" r="5"/><circle cx="120" cy="60" r="5"/><rect x="74" y="76" width="52" height="52" rx="9" opacity=".8"/>
  <path class="flame" d="M100 122c-12-5-12-18-1-31 1 8 7 9 6 17 3-2 5-5 5-9 7 9 3 21-10 23z"/>
  <path d="M65 146v26M88 146v26M112 146v26M135 146v26" opacity=".7"/>
  <path class="flow" d="M65 172v20h135M88 172v12h112M112 172v6h88"/>
  <circle class="pump" cx="150" cy="192" r="7"/><path class="pump" d="M150 186v12M144 192h12" opacity=".7"/>
</svg>`;
const pageOfHash = Object.fromEntries(Object.entries(pages).map(([k,v])=>[v,k]));
const sensorGlyph = {window:'door',door:'door',leak:'water',motion:'sensor',co:'shield',battery:'bolt',pm:'fan',aq:'fan',temperature:'thermo',humidity:'water'};
const deviceGlyph = {washer:'wash',dryer:'wash',purifier:'fan',printer:'device',pet_feeder:'device',litter_box:'device'};
const deviceLabels = {status:'Stan',stage:'Etap',remaining:'Pozostało',progress:'Postęp',end_time:'Koniec',layer:'Warstwa',total_layers:'Warstw',task:'Zadanie',nozzle:'Dysza',nozzle_target:'Dysza · cel',bed:'Stół',bed_target:'Stół · cel',pm25:'PM2.5',filter:'Filtr',portions:'Porcje',visits:'Wizyty dziś',weight:'Waga kota',duration:'Czas wizyty',uses:'Użycia',last:'Ostatnia porcja',battery:'Bateria',bin_full:'Pojemnik',water_full:'Zbiornik wody',program:'Program',temperature:'Temperatura',entity:'Urządzenie'};
const deviceActions = {clean:'Czyszczenie',feed:'Nakarm',pause:'Wstrzymaj',resume:'Wznów',stop:'Zatrzymaj',power:'Zasilanie',light:'Światło'};
const deviceSkip = new Set(['type','name','switches','problems','camera','image','style']);
const money = (row) => {
  const v = Number(row?.state);
  if (!available(row) || !Number.isFinite(v)) return '—';
  const unit = row.attrs.unit_of_measurement || '';
  return /gbp|£/i.test(unit) ? `£${v.toFixed(2)}` : /eur|€/i.test(unit) ? `${v.toFixed(2)} €` : format(v,unit);
};

class AuraDomu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.ui = {page:'home', area:'', event:null};
    this.events = [];
    this.pending = new Set();
    this.targets = new Map();
    this.powerLog = [];
    this.signatures = {};
    this.onPop = () => this.fromHash();
    this.darkQuery = matchMedia('(prefers-color-scheme: dark)');
    this.themeMode = 'auto';
    try { this.themeMode = localStorage.getItem('aura-domu:theme') || 'auto'; } catch {}
    this.darkQuery.addEventListener?.('change',() => { if (this.themeMode === 'auto') this.queue(); });
  }

  setConfig(config) {
    this.config = config || {};
    this.applyLang();
    this.invalidate();
    this.queue();
  }

  set hass(hass) {
    if (!hass) return;
    const old = this._hass;
    this._hass = hass;
    this.applyLang();
    if (old?.states && old.states !== hass.states && old.connected !== false && hass.connected !== false && this.isConnected) this.observeEvents(old.states, hass.states || {});
    if (old?.states !== hass.states || old?.areas !== hass.areas || old?.devices !== hass.devices || old?.entities !== hass.entities || old?.user?.id !== hass.user?.id) this.invalidate();
    this.queue();
  }

  getCardSize() { return 8; }

  // język: wybór tego urządzenia (Ustawienia, localStorage), potem `language: en|pl` z konfiguracji,
  // a domyślnie język profilu użytkownika HA (polski → pl, każdy inny → en)
  langPref() { try { const v = localStorage.getItem('aura-domu:lang'); return v === 'pl' || v === 'en' ? v : 'auto'; } catch { return 'auto'; } }
  applyLang() {
    const pref = this.langPref();
    const want = pref !== 'auto' ? pref : String(this.config?.language || 'auto').toLowerCase();
    const src = want !== 'auto' ? want : this._hass?.locale?.language || this._hass?.language || navigator.language || 'en';
    const lang = /^pl/.test(String(src).toLowerCase()) ? 'pl' : 'en';
    if (lang === this.lang) return;
    this.lang = lang;
    setLang(lang);
    if (this.root) { this.mount(); this.signatures = {}; this.visibleEvent = undefined; this.invalidate(); this.queue(); }
  }

  connectedCallback() {
    if (this.config?.load_font !== false && !document.querySelector('link[data-aura-font]')) {
      const link = Object.assign(document.createElement('link'),{rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;450;500;600&display=swap'});
      link.dataset.auraFont = '';
      document.head.append(link);
    }
    if (!this.root) this.mount();
    window.addEventListener('popstate',this.onPop);
    window.addEventListener('hashchange',this.onPop);
    this.onResize ||= () => this.revealTab();
    window.addEventListener('resize',this.onResize);
    this.fromHash(true);
    this.tick();
    this.clockTimer = setInterval(() => { this.tick(); if (this.ui.page === 'f1') this.queue(); }, 10000);
    this.queue();
  }

  disconnectedCallback() {
    this.unsubscribeForecast();
    window.removeEventListener('resize',this.onResize);
    clearInterval(this.clockTimer);
    clearTimeout(this.eventTimer);
    clearTimeout(this.toastTimer);
    window.removeEventListener('popstate',this.onPop);
    window.removeEventListener('hashchange',this.onPop);
    this.resetTileLight();
    this.ui.event = null;
  }

  invalidate() { this.model = null; }

  queue() {
    if (!this.isConnected || !this.root || this.frame) return;
    this.frame = requestAnimationFrame(() => { this.frame = null; if (this.isConnected) this.render(); });
  }

  mount() {
    this.shadowRoot.innerHTML = `<style>${AURA_CSS}</style><main class="aura">
      <header class="top"><div class="brand"><span class="brand-mark" aria-hidden="true"></span><span id="brand">Aura domu</span></div>
        <nav class="nav" aria-label="${T('Widoki dashboardu')}"><button data-go="home">${T('Dom')}</button><button data-go="rooms">${T('Pokoje')}</button><button data-go="climate">${T('Klimat')}</button><button data-go="heating" hidden>${T('Ogrzewanie')}</button><button data-go="weather" hidden>${T('Pogoda')}</button><button data-go="energy">${T('Energia')}</button><button data-go="security">${T('Ochrona')}</button><button data-go="bins" hidden>${T('Kosze')}</button><button data-go="f1" hidden>F1</button><button data-go="settings">${T('Ustawienia')}</button></nav>
        <div class="top-right"><span class="connection" id="connection"></span><button class="theme" data-act="theme"></button></div>
      </header>
      <section id="home"><div class="stage" aria-label="${T('Status domu')}"><div class="stage-copy"><span class="date"></span><time class="clock" aria-label="${T('Aktualny czas')}"></time><h1 class="headline">${T('Dom')}</h1><p id="summary" aria-live="polite"></p></div>
        <div class="orb-zone"><div class="orbit-halo" aria-hidden="true"></div><svg class="orbit" viewBox="0 0 360 360" aria-hidden="true" fill="none" stroke="currentColor" stroke-width=".65">
          <circle cx="180" cy="180" r="97" opacity=".43"/><circle cx="180" cy="180" r="119" opacity=".86"/><circle cx="180" cy="180" r="139" class="track"/><circle cx="180" cy="180" r="153" opacity=".37"/>
          <ellipse cx="180" cy="180" rx="158" ry="75" transform="rotate(-32 180 180)" opacity=".66"/><ellipse cx="180" cy="180" rx="157" ry="86" transform="rotate(33 180 180)" opacity=".32"/>
          <g class="ring-calibration"><circle cx="180" cy="180" r="165" stroke-dasharray="1 10" opacity=".78"/><path d="M180 13v16m0 302v17M13 180h16m302 0h17M62 62l13 13m210 210 13 13M298 62l-13 13M75 285l-13 13" opacity=".55"/></g>
          <path class="trace" pathLength="1" d="M180 61a119 119 0 1 1-119 119"/><circle cx="180" cy="61" r="3.5" class="point"/><circle cx="180" cy="319" r="2.1" class="point secondary"/><g id="room-signals"></g>
        </svg><div class="orb-contact" aria-hidden="true"></div><div class="scene" aria-hidden="true">${signalScenes}</div><button class="orb" data-act="orb" aria-label="${T('Pokaż zdarzenie lub stan domu')}" aria-pressed="false"></button><span class="orb-caption"></span></div>
        <div class="stage-foot"><span id="stage-weather" class="weather"></span><button data-act="power" class="quiet" hidden>${T('Pobór prądu')}</button><button data-act="close-event" class="quiet" hidden>${T('Zamknij podgląd')}</button></div><button class="close-x" data-act="close-event" aria-label="${T('Zamknij podgląd zdarzenia')}">×</button><span class="signal-progress" aria-hidden="true" hidden></span></div>
        <div class="presets" id="presets" role="group" aria-label="${T('Sceny')}" hidden></div>
        <section class="section" aria-labelledby="now-heading"><div class="section-head"><h2 id="now-heading">${T('Teraz')}</h2></div><div class="overview"></div></section>
        <section class="section"><div class="section-head"><h2>${T('Pokoje')}</h2><button class="quiet" data-go="rooms">${T('Wszystkie pokoje')}</button></div><div class="rooms" id="home-rooms"></div></section>
        <section class="section" id="activity" hidden><div class="section-head"><h2>${T('Ostatnie zdarzenia')}</h2></div><div class="activity"></div></section>
      </section>
      <section id="rooms" class="inner" hidden><h1 class="page-title">${T('Pokoje')}</h1><p class="intro" id="rooms-intro"></p><div class="rooms" id="all-rooms"></div></section>
      <section id="room" class="inner" hidden><div class="room-banner"></div><div id="room-body"></div><nav class="room-strip" aria-label="${T('Przełącz pokój')}"></nav></section>
      <section id="climate" class="inner" hidden><h1 class="page-title">${T('Klimat')}</h1><p class="intro" id="climate-intro"></p><div id="climate-body"></div></section>
      <section id="heating" class="inner" hidden><h1 class="page-title">${T('Ogrzewanie')}</h1><p class="intro" id="heating-intro"></p><div id="heating-body"></div></section>
      <section id="weather" class="inner" hidden><h1 class="page-title">${T('Pogoda')}</h1><p class="intro" id="weather-intro"></p><div id="weather-body"></div></section>
      <section id="energy" class="inner" hidden><h1 class="page-title">${T('Energia')}</h1><p class="intro" id="energy-intro"></p><div id="energy-body"></div></section>
      <section id="security" class="inner" hidden><h1 class="page-title">${T('Ochrona')}</h1><div id="security-body"></div></section>
      <section id="bins" class="inner" hidden><h1 class="page-title">${T('Kosze')}</h1><p class="intro" id="bins-intro"></p><div id="bins-body"></div></section>
      <section id="f1" class="inner" hidden><h1 class="page-title">${T('Formuła 1')}</h1><div class="heat-top" id="f1-pills"></div><div id="f1-body"></div></section>
      <section id="settings" class="inner" hidden><h1 class="page-title">${T('Ustawienia')}</h1><div id="settings-body"></div></section>
      <div class="toast" role="status" hidden></div><dialog class="demo-dialog"><h2></h2><p></p><form method="dialog"><button class="quiet">${T('Zamknij')}</button></form></dialog>
    </main>`;
    this.root = this.shadowRoot.querySelector('main');
    this.root.addEventListener('click', ev => this.click(ev));
    this.root.addEventListener('change', ev => { if (ev.target.matches('.dim')) void this.dim(ev.target.dataset.id,Number(ev.target.value)); });
    this.root.addEventListener('pointerdown',ev => { if (ev.target.matches?.('.dim')) this.dragging = true; });
    if (!this.pointerBound) { this.pointerBound = true; for (const type of ['pointerup','pointercancel']) window.addEventListener(type,() => { this.dragging = false; }); }
    this.root.addEventListener('pointermove',ev => this.lightTile(ev),{passive:true});
    this.root.addEventListener('pointerout',ev => {
      if (this.litTile && (!ev.relatedTarget || !this.litTile.contains(ev.relatedTarget))) this.resetTileLight();
    });
  }

  $(selector) { return this.shadowRoot.querySelector(selector); }

  lightTile(event) {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tile = event.target.closest('.tile');
    if (!tile) return;
    if (this.litTile !== tile) { this.resetTileLight(); this.litTile = tile; this.litBounds = tile.getBoundingClientRect(); }
    const {left,top,width,height} = this.litBounds;
    if (!width || !height) return;
    const clamp = v => Math.max(0,Math.min(1,v));
    const x = clamp((event.clientX-left)/width), y = clamp((event.clientY-top)/height);
    tile.style.setProperty('--light-x',`${Math.round(x*100)}%`);
    tile.style.setProperty('--light-y',`${Math.round(y*100)}%`);
    tile.style.setProperty('--tilt-x',`${(2-y*4).toFixed(1)}deg`);
    tile.style.setProperty('--tilt-y',`${(x*4-2).toFixed(1)}deg`);
  }

  resetTileLight() {
    if (!this.litTile) return;
    for (const name of ['--light-x','--light-y','--tilt-x','--tilt-y']) this.litTile.style.removeProperty(name);
    this.litTile = null;
    this.litBounds = null;
  }

  setHTML(selector, value) {
    if (this.signatures[selector] === value) return;
    const container = this.$(selector);
    const focus = this.shadowRoot.activeElement;
    // nie przerywaj przeciągania suwaka jasności
    if (focus?.matches?.('.dim') && container.contains(focus) && this.dragging) return;
    const key = focus && container.contains(focus) && focus.dataset.id;
    if (this.litTile && container.contains(this.litTile)) this.resetTileLight();
    this.signatures[selector] = value;
    container.innerHTML = value;
    if (key) [...container.querySelectorAll('[data-id]')].find(el => el.dataset.id === key && el.dataset.act === focus.dataset.act && el.dataset.step === focus.dataset.step)?.focus({preventScroll:true});
  }

  tick() {
    const now = new Date();
    const timeZone = this._hass?.config?.time_zone;
    this.$('.clock').textContent = new Intl.DateTimeFormat(loc(),{hour:'2-digit',minute:'2-digit',hour12:false,timeZone}).format(now);
    if (!this.ui.event) this.$('.date').textContent = new Intl.DateTimeFormat(loc(),{weekday:'long',day:'numeric',month:'long',timeZone}).format(now);
  }

  hour() { return Number(new Intl.DateTimeFormat('en-GB',{hour:'numeric',hourCycle:'h23',timeZone:this._hass?.config?.time_zone}).format(new Date())); }

  greeting() {
    const h = this.hour();
    const word = T(h < 5 || h >= 23 ? 'Spokojnej nocy' : h < 12 ? 'Dzień dobry' : h < 18 ? 'Miłego popołudnia' : 'Dobry wieczór');
    const name = String(this.config?.name ?? this._hass?.user?.name ?? '').trim().split(/\s+/)[0];
    return name ? `${word}, ${name}` : word;
  }

  /* ---------- model: pokoje z konfiguracji (jak Home Pulse) albo z obszarów HA ---------- */
  getModel() {
    if (this.model) return this.model;
    const hass = this._hass || {};
    const registry = hass.entities || {};
    const devices = hass.devices || {};
    const areas = new Map(Object.values(hass.areas || {}).filter(a=>a.area_id).map(a=>[a.area_id,{id:a.area_id,name:a.name || a.area_id,rows:[]}]));
    const unassigned = {id:'__unassigned',name:T('Bez pokoju'),rows:[]};
    const byId = new Map();
    const rows = Object.values(hass.states || {}).map(entity => {
      const id = entity.entity_id;
      const domain = id.split('.')[0];
      const entry = registry[id];
      const room = areas.get(entry?.area_id || devices[entry?.device_id]?.area_id) || unassigned;
      const attrs = entity.attributes || {};
      const name = attrs.friendly_name || entry?.name || entry?.original_name || id;
      const row = {id,domain,state:entity.state,attrs,room:room.id,roomName:room.name,name,search:fold(`${name} ${id} ${room.name} ${labels[domain] || domain}`)};
      room.rows.push(row);
      byId.set(id,row);
      return row;
    }).sort((a,b)=>collator.compare(a.name,b.name));

    // bez własnej konfiguracji karta sama dobiera pokoje, ochronę i ogrzewanie z obszarów HA
    this.auto = this.buildAuto(areas,registry,byId);
    const own = Array.isArray(this.config?.rooms);
    const roomsCfg = own ? this.config.rooms : this.auto.rooms;
    const configured = roomsCfg.length ? roomsCfg.filter(r=>r && r.id && !r.link && !r.hidden) : null;
    let rooms;
    if (configured) {
      this.lightIds = new Set();
      rooms = configured.map(cfg => {
        const room = {id:String(cfg.id),name:cfg.name || cfg.id,cfg,rows:[]};
        const ids = new Set();
        const add = id => { if (typeof id === 'string' && /^[a-z_]+\.[^#\s]+$/.test(id)) ids.add(id); };
        for (const item of listOf(cfg.lights)) { add(item.entity); if (item.type !== 'fan') this.lightIds.add(item.entity); }
        for (const key of ['climate','media','sensors','cameras']) for (const item of listOf(cfg[key])) add(item.entity);
        for (const device of cfg.devices || []) for (const [key,value] of Object.entries(device)) {
          if (key === 'switches') listOf(value).forEach(item=>add(item.entity));
          else if (key === 'problems') listOf(value).forEach(item=>add(item.entity));
          else if (!deviceSkip.has(key)) add(value);
        }
        for (const id of ids) {
          const row = byId.get(id);
          if (!row) continue;
          room.rows.push(row);
          if (this.lightIds.has(id) || row.room === '__unassigned') { row.room = room.id; row.roomName = room.name; }
        }
        return room;
      });
    } else {
      this.lightIds = null;
      rooms = [...areas.values()].sort((a,b)=>collator.compare(a.name,b.name));
      if (unassigned.rows.length) rooms.push(unassigned);
    }
    this.model = {rows,rooms,byId,configured:Boolean(configured),roomsCfg:configured || [],autoRooms:!own};
    return this.model;
  }

  /* ---------- tryb automatyczny: konfiguracja zbudowana z obszarów HA ---------- */
  buildAuto(areas,registry,byId) {
    const usable = row => { const e = registry[row.id]; return e && !e.entity_category && !e.hidden && !e.hidden_by && !e.disabled_by; };
    const short = (row,area) => {
      const name = String(row.name || row.id), a = fold(area || '');
      if (!a) return name;
      const f = fold(name);
      if (f.startsWith(a + ' ') || f.startsWith(a + ':') || f.startsWith(a + '-')) { const s = name.slice(area.length).replace(/^[\s:·\-–]+/,''); return s ? s.charAt(0).toUpperCase() + s.slice(1) : name; }
      return name;
    };
    const oid = row => row.id.split('.').slice(1).join('.');
    const isLightName = row => { const t = fold(`${row.name} ${oid(row)}`); return /light|swiatl|oswietl|lamp|(^|[\s_.\-])led([\s_.\-]|$)|sufit|kinkiet|zarowk|bulb|ceiling|zyrandol/.test(t) && !/standby|status|indicator|wskaznik|kontrolk|do not disturb|child lock/.test(t); };
    const isFanName = row => /(^|[\s_.])fan|wentyl/.test(fold(`${row.name} ${oid(row)}`));
    const SEC = {window:'window',door:'window',garage_door:'window',opening:'window',moisture:'leak',carbon_monoxide:'co',smoke:'co',gas:'co',motion:'motion',occupancy:'motion',presence:'motion'};
    const sec = {windows:[],leaks:[],co:[],motion:[],batteries:[]}, secDevices = new Set();
    const heat = [];
    const rooms = [];
    const isAC = row => (row.attrs.hvac_modes || []).some(m=>['cool','dry','fan_only'].includes(m));
    const list = [...areas.values()].sort((a,b)=>collator.compare(a.name,b.name));
    const temps = [], hums = [], cams = [];
    for (const area of list) {
      const cfg = {id:area.id,name:area.name,lights:[],climate:[],media:[],sensors:[],cameras:[]};
      for (const row of area.rows.filter(usable).sort((a,b)=>collator.compare(a.name,b.name))) {
        const item = {entity:row.id,name:short(row,area.name)};
        const dc = row.attrs.device_class;
        if (row.domain === 'light') cfg.lights.push(item);
        else if (row.domain === 'fan' && isFanName(row)) cfg.lights.push({...item,type:'fan'});
        else if (row.domain === 'fan' || row.domain === 'humidifier') (cfg.devices ||= []).push({type:/purif|oczysz|air|powietrz|core/.test(fold(`${row.name} ${row.id}`)) ? 'purifier' : 'fan',name:item.name,entity:row.id});
        else if (row.domain === 'switch' && isLightName(row)) cfg.lights.push(item);
        else if (row.domain === 'switch' && isFanName(row)) cfg.lights.push({...item,type:'fan'});
        else if (row.domain === 'climate') {
          cfg.climate.push(item);
          if ((row.attrs.hvac_modes || []).includes('heat') && !isAC(row)) heat.push({row,area});
        }
        else if (row.domain === 'media_player') cfg.media.push(item);
        else if (row.domain === 'camera') { cfg.cameras.push(item); cams.push({entity:row.id,name:item.name === area.name ? area.name : `${item.name} · ${area.name}`}); }
        else if (row.domain === 'binary_sensor' && SEC[dc]) {
          cfg.sensors.push({...item,type:SEC[dc]});
          const key = {window:'windows',leak:'leaks',co:'co',motion:'motion'}[SEC[dc]];
          sec[key].push({entity:row.id,name:`${item.name} · ${area.name}`});
          const dev = registry[row.id]?.device_id; if (dev) secDevices.add(dev);
        }
        else if (row.domain === 'sensor' && this.isRoomTemp(row)) temps.push(row);
        else if (row.domain === 'sensor' && dc === 'humidity' && available(row) && this.isRoomTemp({...row,attrs:{...row.attrs,device_class:'temperature'},state:'20'})) hums.push(row);
      }
      // temperatura pokoju: najlepiej z czujnika, który mierzy też wilgotność (prawdziwy czujnik pokojowy)
      const devOf = row => registry[row.id]?.device_id;
      const humDevs = new Set(hums.map(devOf).filter(Boolean));
      const t = temps.find(row=>humDevs.has(devOf(row))) || temps[0];
      if (t) cfg.temperature = t.id;
      else { const c = cfg.climate.map(x=>byId.get(x.entity)).find(row=>row?.attrs.current_temperature != null); if (c) cfg.temperature = c.id; }
      const h = hums.find(row=>t && devOf(row) === devOf(t)) || hums[0];
      if (h) cfg.humidity = h.id;
      temps.length = 0; hums.length = 0;
      for (const key of ['lights','climate','media','sensors','cameras']) if (!cfg[key].length) delete cfg[key];
      if (cfg.lights || cfg.climate || cfg.media || cfg.sensors || cfg.cameras || cfg.devices || cfg.temperature) rooms.push(cfg);
    }
    // baterie czujników ochrony (te encje bywają diagnostyczne, więc bez filtra kategorii)
    for (const row of byId.values()) {
      const e = registry[row.id];
      if (row.domain === 'sensor' && row.attrs.device_class === 'battery' && e?.device_id && secDevices.has(e.device_id) && !e.hidden && !e.disabled_by) sec.batteries.push({entity:row.id,name:row.name});
    }
    const alarm = [...byId.values()].find(row=>row.domain === 'alarm_control_panel' && usable(row));
    const anySec = sec.windows.length || sec.leaks.length || sec.co.length || sec.motion.length || cams.length || alarm;
    const security = anySec ? Object.fromEntries(Object.entries({...sec,cameras:cams,alarm:alarm?.id}).filter(([,v])=>Array.isArray(v) ? v.length : v)) : null;
    let heating = null;
    if (heat.length) {
      const floor = h => /podlog|floor|ufh/.test(fold(`${h.row.name} ${h.row.id}`));
      const thermo = h => /termostat|thermostat/.test(fold(`${h.row.name} ${h.row.id}`));
      // główny termostat: z konfiguracji, albo taki z trybem eco (np. Nest), albo pierwszy niepodłogowy
      const boilerPlatforms = /^(nest|ecobee|honeywell|evohome|opentherm_gw|ebusd|vaillant|viessmann|bosch|nibe|plugwise|netatmo|tado|google|homematicip_cloud|sensibo)$/;
      const roomPlatforms = /^(versatile_thermostat|better_thermostat|generic_thermostat|dual_smart_thermostat)$/;
      const score = h => { const p = registry[h.row.id]?.platform || ''; return (h.row.id === this.config?.climate_entity ? 100 : 0) + (boilerPlatforms.test(p) ? 20 : 0) - (roomPlatforms.test(p) ? 10 : 0) - (floor(h) ? 30 : 0) + ((h.row.attrs.preset_modes || []).includes('eco') ? 2 : 0); };
      const pick = [...heat].sort((a,b)=>score(b) - score(a))[0];
      // jeden obieg na pokój: termostat (albo głowica), podłogówka osobno
      const byArea = new Map();
      for (const h of heat) { if (!byArea.has(h.area.id)) byArea.set(h.area.id,[]); byArea.get(h.area.id).push(h); }
      const hRooms = [...byArea.values()].map(list=>{
        const area = list[0].area, floors = list.filter(floor), others = list.filter(h=>!floor(h));
        const main = others.find(h=>h.row.id === pick.row.id) || others.find(thermo) || others[0] || floors[0];
        const fl = floors.find(h=>h !== main);
        const room = rooms.find(r=>r.id === area.id);
        return {name:area.name,climate:main.row.id,sub:short(main.row,area.name),...(fl ? {floor_climate:fl.row.id} : {}),...(room?.humidity ? {humidity:room.humidity} : {})};
      });
      heating = {source:pick.row.id,source_name:short(pick.row,pick.area.name),rooms:hRooms};
    }
    return {rooms,security_page:security,heating_page:heating};
  }

  // konfiguracja, która faktycznie działa: własna albo dobrana automatycznie
  effective() {
    const m = this.getModel(), a = this.auto || {};
    const out = {rooms:m.roomsCfg};
    const sec = this.config?.security_page || this.config?.security || a.security_page;
    const heat = this.config?.heating_page || a.heating_page;
    if (sec) out.security_page = sec;
    if (heat) out.heating_page = heat;
    return out;
  }

  row(id) { return id ? this.getModel().byId.get(id) : undefined; }

  isLight(row) {
    if (this.config?.exclude_lights?.includes(row.id)) return false;
    if (this.lightIds) return this.lightIds.has(row.id);
    if (row.domain === 'light') return true;
    if (row.domain !== 'switch') return false;
    if (Array.isArray(this.config?.light_switches)) return this.config.light_switches.includes(row.id);
    return /light|oswietl|swiatl|lampa|lampka/.test(fold(`${row.name} ${row.id}`));
  }

  isRoomTemp(row) {
    if (row.domain !== 'sensor' || row.attrs.device_class !== 'temperature' || !available(row)) return false;
    if (this._hass?.entities?.[row.id]?.entity_category) return false;
    if (/battery|bateria|cpu|mcu|soc|process|nozzle|dysz|bed temp|stolu|floor temp|podlog|ema|slope|forecast|light|switch|plug|socket|fan|radiator|_in_|_out_|floor|ams|printer|drukark|chamber|komor|fridge|lodow|freezer|zamraz|oven|piekarn|water|woda|boiler|kociol|outdoor|zewn|outside/.test(row.search)) return false;
    const value = Number(row.state);
    return Number.isFinite(value) && value > -30 && value < 45;
  }

  // wartość z encji: "sensor.x", "climate.y" (current_temperature) albo "climate.y#atrybut"
  reading(ref, attr = 'current_temperature') {
    if (!ref) return null;
    const [id,key] = String(ref).split('#');
    const row = this.row(id);
    if (!available(row)) return null;
    const value = key ? row.attrs[key] : row.domain === 'climate' ? row.attrs[attr] : row.state;
    return Number.isFinite(Number(value)) ? Number(value) : null;
  }

  roomTemp(room) {
    if (room.cfg) return this.reading(room.cfg.temperature);
    const climate = room.rows.find(row=>row.domain === 'climate' && available(row) && row.attrs.current_temperature != null);
    if (climate) return Number(climate.attrs.current_temperature);
    const temp = room.rows.find(row=>this.isRoomTemp(row));
    return temp ? Number(temp.state) : null;
  }

  roomLights(room) { return room.rows.filter(row=>this.isLight(row) && available(row)); }

  priceInPence(row) {
    const value = Number(row?.state);
    if (!Number.isFinite(value)) return null;
    return /gbp|£|eur|€/i.test(row.attrs.unit_of_measurement || '') ? value * 100 : value;
  }

  securityConfig() { return this.config?.security_page || this.config?.security || (this.getModel() && this.auto?.security_page) || null; }

  securityRows(rows) {
    const cfg = this.securityConfig();
    if (!cfg) return rows.filter(row=>['alarm_control_panel','lock','camera'].includes(row.domain) || securityClasses.has(row.attrs.device_class));
    const ids = new Set([cfg.alarm,...['windows','motion','leaks','co'].flatMap(key=>listOf(cfg[key]).map(item=>item.entity))].filter(Boolean));
    return [...ids].map(id=>this.row(id)).filter(Boolean);
  }

  stateText(row) {
    if (!row) return T('Brak encji');
    if ((row.domain === 'event' || row.domain === 'scene' || row.attrs.device_class === 'timestamp') && available(row) && !Number.isNaN(Date.parse(row.state))) return `${row.attrs.device_class === 'timestamp' && Date.parse(row.state) > Date.now() ? T('O') : T('Ostatnio')} ${this.time(Date.parse(row.state))}`;
    if (row.domain === 'binary_sensor' && row.state === 'on') {
      if (openingClasses.has(row.attrs.device_class)) return T('Otwarte');
      if (criticalClasses.has(row.attrs.device_class)) return T('Wykryto');
      if (['motion','occupancy','presence'].includes(row.attrs.device_class)) return T('Wykryto obecność');
      if (row.attrs.device_class === 'problem') return 'Problem';
    }
    if (row.domain === 'binary_sensor' && row.state === 'off') {
      if (securityClasses.has(row.attrs.device_class) || row.attrs.device_class === 'presence') return T(openingClasses.has(row.attrs.device_class) ? 'Zamknięte' : 'Brak wykrycia');
      if (row.attrs.device_class === 'problem') return 'OK';
    }
    if (row.domain === 'climate' && row.attrs.current_temperature != null) return `${format(row.attrs.current_temperature,this.tempUnit())} · ${stl(row.attrs.hvac_action || row.state)}`;
    if (row.domain === 'weather' && row.attrs.temperature != null) return `${format(row.attrs.temperature,row.attrs.temperature_unit || '°C')} · ${stl(row.state)}`;
    if (row.domain === 'media_player' && available(row) && row.attrs.media_title) return `${stl(row.state)} · ${row.attrs.media_title}`;
    if (row.domain === 'light' && row.state === 'on' && row.attrs.brightness != null) return `${T('Wł.')} · ${Math.round(row.attrs.brightness / 2.55)}%`;
    if (row.attrs.unit_of_measurement && available(row) && Number.isFinite(Number(row.state))) return /gbp|£|eur|€/i.test(row.attrs.unit_of_measurement) ? money(row) : format(row.state,row.attrs.unit_of_measurement);
    return stateLabels[row.state] ? stl(row.state) : row.state || T('Brak stanu');
  }

  tempUnit() { return this._hass?.config?.unit_system?.temperature || '°C'; }

  /* ---------- moc: historia + wykres ---------- */
  trackPower(row) {
    if (this.powerId !== row.id) { this.powerId = row.id; this.powerLog = []; void this.loadPowerHistory(row.id); }
    const v = Number(row.state);
    if (!Number.isFinite(v)) return;
    const last = this.powerLog.at(-1);
    if (last && last.v === v && Date.now() - last.t < 60000) return;
    this.powerLog.push({t:Date.now(),v});
    if (this.powerLog.length > 120) this.powerLog.shift();
  }

  async loadPowerHistory(id) {
    if (!this._hass?.callWS) return;
    try {
      const res = await this._hass.callWS({type:'history/history_during_period',start_time:new Date(Date.now() - 3 * 3600e3).toISOString(),entity_ids:[id],minimal_response:true,no_attributes:true,significant_changes_only:false});
      const pts = (res?.[id] || []).map(p=>({t:(p.lu ?? p.lc) * 1000,v:Number(p.s)})).filter(p=>Number.isFinite(p.v) && Number.isFinite(p.t));
      if (this.powerId !== id || !pts.length) return;
      const step = Math.ceil(pts.length / 90);
      this.powerLog = [...pts.filter((_,i)=>i % step === 0),...this.powerLog].sort((a,b)=>a.t - b.t).slice(-120);
      this.queue();
    } catch {}
  }

  spark() {
    const log = this.powerLog;
    if (log.length < 3) return '';
    const vs = log.map(p=>p.v), min = Math.min(...vs), span = Math.max(...vs) - min || 1;
    const t0 = log[0].t, tspan = log.at(-1).t - t0 || 1;
    const d = log.map((p,i)=>`${i ? 'L' : 'M'}${((p.t - t0) / tspan * 100).toFixed(2)} ${(38 - (p.v - min) / span * 34).toFixed(2)}`).join('');
    return `<svg class="spark" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--hot)" stop-opacity=".32"/><stop offset="1" stop-color="var(--hot)" stop-opacity="0"/></linearGradient></defs><path d="${d}L100 40L0 40Z" fill="url(#spark-fill)"/><path class="line" d="${d}"/></svg>`;
  }

  powerRow(rows) {
    const id = this.config?.power_entity || this.config?.energy_page?.power || this.config?.energy?.power;
    return this.row(id) || rows.find(row=>row.attrs.device_class === 'power' && /^(sensor\.)((house|home|mains|grid)_(power|active_power)|power_(house|home|mains|grid))$/.test(row.id) && available(row));
  }

  /* ---------- karty „Teraz” ---------- */
  overview(rows,rooms) {
    const lights = rows.filter(row => this.isLight(row));
    const lightsOn = lights.filter(row=>row.state === 'on');
    const climate = rows.filter(row=>row.domain === 'climate' && available(row));
    const climateRow = climate.find(row=>row.id === this.config?.climate_entity) || climate[0];
    const energy = this.powerRow(rows);
    const priceId = this.config?.price_entity || this.config?.energy_page?.el_rate;
    const price = this.row(priceId) || rows.find(row=>row.domain === 'sensor' && available(row) && row.attrs.unit_of_measurement && /agile|tariff|taryfa|octopus.*(rate|price)/.test(row.search));
    const power = available(energy) ? format(energy.state,energy.attrs.unit_of_measurement || 'W') : '';
    const security = this.securityRows(rows);
    const urgent = security.filter(row=>(criticalClasses.has(row.attrs.device_class) && row.state === 'on') || row.state === 'triggered');
    const alarm = security.find(row=>row.domain === 'alarm_control_panel' && available(row));
    const openings = security.filter(row=>row.domain === 'binary_sensor' && openingClasses.has(row.attrs.device_class));
    const open = openings.filter(row=>row.state === 'on');
    const weather = rows.find(row=>row.id === this.config?.weather_entity && row.domain === 'weather' && available(row)) || rows.find(row=>row.domain === 'weather' && available(row));
    const heating = climate.some(row=>row.attrs.hvac_action === 'heating');
    const unit = this.tempUnit();
    const temperature = climateRow?.attrs.current_temperature;
    const powerUnit = energy?.attrs.unit_of_measurement || 'W';
    const watts = available(energy) && Number.isFinite(Number(energy.state)) ? Number(energy.state) * (/^kW$/i.test(powerUnit) ? 1000 : 1) : null;
    if (available(energy)) this.trackPower(energy);

    // nastrój kuli: kolor = temperatura w pokojach, tempo = pobór, alarm = czerwień
    const temps = rooms.map(room=>this.roomTemp(room)).filter(Number.isFinite).map(t=>unit === '°F' ? (t - 32) * 5 / 9 : t);
    const avg = temps.length ? temps.reduce((a,b)=>a + b,0) / temps.length : 21;
    const h = this.hour();
    const mood = urgent.length ? 'alert' : (h >= 23 || h < 6) && !lightsOn.length ? 'night' : heating || (watts ?? 0) > 1500 ? 'active' : 'calm';
    const chips = [];
    if (urgent.length) chips.push(['shield',T('Wykryto alarm')]);
    if (lights.some(available)) chips.push(['light',`${lightsOn.length} ${T('wł.')}`]);
    if (temperature != null) chips.push(['thermo',`${format(temperature,unit)}${heating ? ` · ${T('grzeje')}` : ''}`]);
    if (power) chips.push(['bolt',power]);
    const f1c = this.f1Chip();
    if (f1c) chips.push(['flag',f1c]);
    const binNext = this.tabVisible('bins') ? this.binCollections()[0] : null;
    if (binNext && binNext.n <= 1) chips.push(['bin',`${T(binNext.n === 0 ? 'Kosze dziś' : 'Kosze jutro')}: ${andList(binNext.bins.map(b=>b.adj))}`]);
    const brief = [lights.some(available) && `${T('Światła')} · ${lightsOn.length} ${T('wł.')}`,heating && T('Ogrzewanie pracuje'),urgent.length && T('Wykryto alarm')].filter(Boolean).join(' / ');
    this.snapshot = {
      brief:brief || T('Stan urządzeń i pomieszczeń'), weather:weather ? this.stateText(weather) : '', power, chips, mood,
      hue:mood === 'alert' ? 6 : Math.round(210 + Math.min(1,Math.max(0,(avg - 16) / 6)) * 175) % 360,
      tempo:mood === 'alert' ? 1.6 : watts == null ? 6.5 : Math.round(Math.max(2.2,Math.min(6.5,6.5 - watts / 700)) * 4) / 4,
      caption:T({alert:'Uwaga',night:'Dom odpoczywa',active:'Dom pracuje',calm:'Spokojnie'}[mood]),
    };

    const roomsOn = [...new Set(lightsOn.map(row=>row.roomName).filter(name=>name !== T('Bez pokoju')))];
    const lightsBody = `<span class="value">${lights.some(available) ? `${lightsOn.length} ${T('wł.')}` : '—'}</span><small>${T('{n} w pokojach',{n:plN(lights.length,'światło','światła','świateł')})}</small>
      ${roomsOn.length ? `<div class="tags">${roomsOn.slice(0,4).map(name=>`<span class="tag">${escapeHTML(name)}</span>`).join('')}</div>` : ''}
      ${lightsOn.length ? `<button class="mini" data-act="all-off" ${this.pending.has('all-off') ? 'disabled' : ''}>${icon('power')}${T('Zgaś wszystkie')}</button>` : ''}`;

    const pence = this.priceInPence(price);
    const cheap = this.config?.price_cheap ?? 15, dear = this.config?.price_expensive ?? 25;
    const priceLevel = pence != null && pence < cheap ? ['var(--good)',T('tanio')] : pence != null && pence < dear ? ['var(--warn)',T('średnio')] : ['var(--bad)',T('drogo')];
    const energyBody = `<span class="value">${escapeHTML(power || '—')}</span>${this.spark()}${price && pence != null ? `<span class="price" style="color:${priceLevel[0]}"><i></i>${escapeHTML(format(pence,'p/kWh'))} · ${priceLevel[1]}</span>` : `<small>${escapeHTML(energy?.name || T('Brak czujnika mocy'))}</small>`}`;

    const missing = security.filter(row=>!available(row));
    const openingsMissing = openings.filter(row=>!available(row)).length;
    const nameOf = row => this.labelFor(row);
    const securityNote = urgent.length ? urgent.map(nameOf).join(', ') : open.length ? `${T('Otwarte')}: ${open.map(nameOf).join(', ')}`
      : !openings.length ? plN(security.length,'czujnik','czujniki','czujników') : T(!openingsMissing ? 'Okna zamknięte' : openingsMissing < openings.length ? 'Pozostałe okna zamknięte' : 'Brak odczytu okien');
    const missingNote = missing.length ? `<small class="warn">${T('Brak odczytu')}: ${escapeHTML(missing.slice(0,3).map(nameOf).join(', '))}${missing.length > 3 ? ` ${T('i {n} więcej',{n:missing.length - 3})}` : ''}</small>` : '';
    const guard = this.row(this.securityConfig()?.guard);
    const guardName = guard && available(guard) ? this.securityConfig()?.guard_options?.[guard.state]?.name || guard.state : '';
    const securityValue = urgent.length ? 'Alarm!' : guardName || (alarm ? (alarmShort[alarm.state] ? T(alarmShort[alarm.state]) : this.stateText(alarm)) : security.length ? T('Ochrona') : '—');
    const securityBody = `<span class="value">${escapeHTML(securityValue)}</span><small>${escapeHTML(securityNote)}</small>${missingNote}`;

    return [
      this.card('lights',lightsOn.length > 0,lightsBody,drawing('light'),true),
      this.card('climate',heating,this.climateBody(climateRow),'',false),
      this.card('energy',available(energy),energyBody,'',true),
      this.card('security',urgent.length > 0 || open.length > 0 || missing.length > 0,securityBody,drawing('shield'),true),
    ].join('');
  }

  // nazwa z konfiguracji (jak w Home Pulse), a dopiero potem friendly_name
  labelFor(row) {
    if (!row) return '';
    if (!this.nameMap) {
      this.nameMap = new Map();
      const put = list => listOf(list).forEach(item=>{ if (item.name && !this.nameMap.has(item.entity)) this.nameMap.set(item.entity,item.name); });
      for (const room of this.getModel().roomsCfg) for (const key of ['lights','climate','media','sensors','cameras']) put(room[key]);
      const sec = this.securityConfig() || {};
      for (const key of ['windows','motion','leaks','co','batteries']) put(sec[key]);
      put(this.config?.climate);
    }
    return this.nameMap.get(row.id) || row.name;
  }

  card(group,active,body,artwork,clickable) {
    const {glyph} = groups[group], label = T(groups[group].label);
    return `<article class="tile card${active ? ' active' : ''}"${clickable ? ` data-card="${group}"` : ''}><span class="label">${icon(glyph)}${label}</span><button class="arrow" data-group="${group}" aria-label="${T('Pokaż')}: ${label}">${icon('arrow')}</button><div class="card-body">${body}</div>${artwork}</article>`;
  }

  climateBody(row) {
    if (!row) return `<span class="value">—</span><small>${T('Brak termostatu')}</small>`;
    const a = row.attrs, unit = this.tempUnit();
    const pending = this.targets.get(row.id);
    if (pending && (pending.value === a.temperature || Date.now() - pending.at > 8000)) this.targets.delete(row.id);
    const target = this.targets.get(row.id)?.value ?? a.temperature;
    const current = Number(a.current_temperature);
    const min = unit === '°F' ? 59 : 15, max = unit === '°F' ? 82 : 28;
    const f = v => Math.min(1,Math.max(0,(v - min) / (max - min)));
    const len = 2 * Math.PI * 48 * .75;
    const off = row.state === 'off' || target == null;
    const action = stateLabels[a.hvac_action] ? stl(a.hvac_action) : stl(row.state);
    const id = escapeHTML(row.id);
    return `<div class="climate-row">
      <button class="round" data-act="temp" data-step="-1" data-id="${id}" aria-label="${T('Obniż temperaturę')}" ${off ? 'disabled' : ''}>−</button>
      <div class="dial"><svg viewBox="0 0 118 100" fill="none" stroke-linecap="round" aria-hidden="true">
        <defs><linearGradient id="dial-heat" x1="0" x2="1"><stop offset="0" stop-color="#7aa7e0"/><stop offset=".55" stop-color="#e9a56b"/><stop offset="1" stop-color="#e9643f"/></linearGradient></defs>
        <circle cx="59" cy="59" r="48" class="trk" stroke-width="8" stroke-dasharray="${len.toFixed(1)} 999" transform="rotate(135 59 59)"/>
        <circle cx="59" cy="59" r="48" class="val" stroke="url(#dial-heat)" stroke-width="8" stroke-dasharray="${len.toFixed(1)} 999" stroke-dashoffset="${(len * (1 - f(current))).toFixed(1)}" transform="rotate(135 59 59)"/>
        ${off ? '' : `<circle cx="107" cy="59" r="6" class="knob" style="transform:rotate(${(135 + f(target) * 270).toFixed(1)}deg)"/>`}
      </svg><div class="mid"><b>${format(current,'°')}</b><span>${off ? T('wyłączone') : `${T('cel')} ${format(target,'°')}`}</span></div></div>
      <button class="round" data-act="temp" data-step="1" data-id="${id}" aria-label="${T('Podwyższ temperaturę')}" ${off ? 'disabled' : ''}>+</button>
    </div><small>${escapeHTML(this.labelFor(row))} · ${escapeHTML(action)}</small>`;
  }

  presets(rows) {
    const configured = Array.isArray(this.config?.scenes) ? this.config.scenes.map(item=>typeof item === 'string' ? {entity:item} : item) : rows.filter(row=>row.domain === 'scene').slice(0,6).map(row=>({entity:row.id}));
    const list = configured.map(item=>{
      const row = this.row(item.entity);
      if (!row) return null;
      const name = item.name || row.name;
      return {id:row.id,name,glyph:item.icon || presetIcon(name),at:Date.parse(row.state) || 0};
    }).filter(Boolean);
    const recent = list.filter(item=>Date.now() - item.at < 4 * 3600e3).sort((a,b)=>b.at - a.at)[0];
    const active = this.lastPreset && Date.now() - this.lastPreset.at < 5000 ? this.lastPreset.id : recent?.id;
    return list.map(item=>`<button class="preset" data-act="scene" data-id="${escapeHTML(item.id)}" aria-pressed="${item.id === active}">${icon(item.glyph)}${escapeHTML(item.name)}</button>`).join('');
  }

  roomStatus(room) {
    const lights = this.roomLights(room);
    const on = lights.filter(row=>row.state === 'on').length;
    const temp = this.roomTemp(room);
    const status = [];
    if (lights.length) status.push(on ? plN(on,'światło','światła','świateł') : T('Zgaszone'));
    if (temp != null) status.push(format(temp,this.tempUnit()));
    if (!status.length && room.cfg?.devices?.length) {
      const device = room.cfg.devices.find(d=>this.row(d.status)) || room.cfg.devices[0];
      const st = this.row(device.status);
      status.push(st ? `${device.name}: ${this.stateText(st)}` : device.name);
    }
    return {lights,on,text:status.join(' · ') || (room.cfg ? T('Brak urządzeń') : plN(room.rows.length,'encja','encje','encji'))};
  }

  roomTiles(rooms) {
    if (!rooms.length) return `<p class="empty">${T('Brak pomieszczeń. Dodaj listę „rooms” w konfiguracji karty.')}</p>`;
    return rooms.map(room=>{
      const {lights,on,text} = this.roomStatus(room);
      const note = room.cfg?.subtitle || '';
      const glyph = roomIcon(room.name);
      const ig = this.igniteAt?.id === room.id && on > 0 ? this.igniteAt : null;
      if (ig) this.igniteAt = null;
      const cls = `tile room${on ? ' active' : ''}${ig ? ' ignite' : ''}`;
      const style = ig ? ` style="--cx:${ig.x}px;--cy:${ig.y}px"` : '';
      const id = escapeHTML(room.id), name = escapeHTML(room.name);
      const inner = `<span class="label">${icon(glyph)}${name}</span><span><span class="value">${escapeHTML(text)}</span>${note ? `<span class="note">${escapeHTML(note)}</span>` : ''}</span>${drawing(glyph,true)}`;
      if (!lights.length) return `<button class="${cls}" data-room="${id}">${inner}<span class="arrow">${icon('arrow')}</span></button>`;
      return `<article class="${cls}"${style}><button class="room-hit" data-room="${id}" aria-label="${T('Otwórz')}: ${name}"></button>${inner}<button class="bulb" data-act="room" data-id="${id}" aria-pressed="${on > 0}" aria-label="${T(on ? 'Zgaś światła' : 'Zapal światła')}: ${name}" ${this.pending.has(`room:${room.id}`) ? 'disabled' : ''}>${icon('light')}</button></article>`;
    }).join('');
  }

  roomSignals(rooms) {
    const shown = rooms.slice(0,18);
    return shown.map((room,index)=>{
      const angle = (index / shown.length - .25) * Math.PI * 2;
      const active = room.rows.some(row=>this.isLight(row) && row.state === 'on');
      return `<circle class="room-signal${active ? ' active' : ''}" cx="${(180 + 153 * Math.cos(angle)).toFixed(1)}" cy="${(180 + 153 * Math.sin(angle)).toFixed(1)}" r="${active ? 4 : 2.8}"/>`;
    }).join('');
  }

  // czy zakładka ma dane w HA (bez tego jest ukryta zawsze)
  tabAvailable(key) {
    switch (key) {
      case 'heating': return Boolean(this.heatCfg());
      case 'weather': return Boolean(this.weatherRow());
      case 'bins': return Boolean(this.binSource());
      case 'f1': return Boolean(this.row(this.f1E().next));
      case 'security': return Boolean(this.securityConfig());
      case 'energy': return Boolean(this.config?.energy_page || this.config?.energy || this.config?.power_entity);
      default: return true;
    }
  }
  // ukryte zakładki: `hidden_tabs` z konfiguracji to ustawienie domyślne, a przełączniki w Ustawieniach
  // zapisują wybór tego urządzenia w localStorage (jak motyw) — karta nigdy nie zapisuje konfiguracji pulpitu
  tabPrefs() { try { return JSON.parse(localStorage.getItem('aura-domu:tabs') || '{}') || {}; } catch { return {}; } }
  hiddenTabs() {
    const base = Array.isArray(this.config?.hidden_tabs) ? this.config.hidden_tabs : [], prefs = this.tabPrefs();
    return Object.keys(tabNames).filter(key=>typeof prefs[key] === 'boolean' ? prefs[key] : base.includes(key));
  }
  toggleTab(key) {
    const prefs = this.tabPrefs();
    prefs[key] = !this.hiddenTabs().includes(key);
    try { localStorage.setItem('aura-domu:tabs',JSON.stringify(prefs)); } catch {}
    this.queue();
  }
  tabVisible(key) { return this.tabAvailable(key) && !this.hiddenTabs().includes(key); }

  render() {
    setLang(this.lang || 'pl');
    this.nameMap = null;
    const {rows,rooms} = this.getModel();
    const tabKey = this.ui.page === 'room' ? 'rooms' : this.ui.page;
    if (tabNames[tabKey] && !this.tabVisible(tabKey)) Object.assign(this.ui,{page:'home',area:''});
    const {page} = this.ui;
    this.theme = this.themeMode === 'auto' ? (this.darkQuery.matches ? 'dark' : 'light') : this.themeMode;
    this.root.dataset.theme = this.theme;
    this.$('#brand').textContent = this.config?.title || 'Aura domu';
    const online = Boolean(this._hass && this._hass.connected !== false);
    this.$('#connection').toggleAttribute('data-offline',!online);
    this.setHTML('#connection',`<span class="led"></span>${T(this.config?.demo ? 'Dane demonstracyjne' : online ? 'Połączono z HA' : 'Brak połączenia')}`);
    this.setHTML('.theme',icon(this.theme === 'dark' ? 'sun' : 'moon'));
    this.$('.theme').setAttribute('aria-label',T(this.theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'));
    const tab = page === 'room' ? 'rooms' : page;
    this.shadowRoot.querySelectorAll('.nav [data-go]').forEach(button=>button.dataset.go === tab ? button.setAttribute('aria-current','page') : button.removeAttribute('aria-current'));
    for (const section of ['home','rooms','room','climate','heating','weather','energy','security','bins','f1','settings']) this.$(`#${section}`).hidden = section !== page;
    for (const key of Object.keys(tabNames)) this.$(`.nav [data-go=${key}]`).hidden = !this.tabVisible(key);
    const named = rooms.filter(room=>room.id !== '__unassigned');
    if (page === 'home') {
      this.setHTML('.overview',this.overview(rows,named));
      const presets = this.presets(rows);
      this.$('#presets').hidden = !presets;
      this.setHTML('#presets',presets);
      this.setHTML('#home-rooms',this.roomTiles(named.length ? named : rooms));
      this.setHTML('#room-signals',this.roomSignals(named));
      this.$('#activity').hidden = this.events.length === 0;
      this.setHTML('.activity',this.events.slice(0,6).map((event,i)=>`<button data-index="${i}"><span class="led"></span><span class="entry">${escapeHTML(event.title)}</span><time>${escapeHTML(this.time(event.at))}</time></button>`).join(''));
      this.renderStage();
    } else {
      this.overview(rows,named); // odświeża snapshot i historię mocy
    }
    if (page === 'rooms') {
      const lightsOn = rows.filter(row=>this.isLight(row) && row.state === 'on').length;
      this.$('#rooms-intro').textContent = `${plN(named.length,'pomieszczenie','pomieszczenia','pomieszczeń')} · ${lightsOn ? T('{n} wł. świateł',{n:lightsOn}) : T('wszystkie światła zgaszone')}`;
      this.setHTML('#all-rooms',this.roomTiles(rooms));
    }
    if (page === 'room') this.renderRoom(rooms);
    if (page === 'settings') this.renderSettings(named,rows);
    if (page === 'heating') { if (this.heatCfg()) this.renderHeating(); else this.navigate('climate'); }
    if (page === 'climate') this.renderClimate(named);
    if (page === 'energy') this.renderEnergy(rows);
    if (page === 'security') this.renderSecurity();
    if (page === 'weather') this.renderWeather();
    if (page === 'bins') this.renderBins();
    if (page === 'f1') this.renderF1();
    if (this.playEnter) { this.playEnter = false; this.playSectionEnter(page); }
    this.revealTab();
  }

  // aktywna zakładka zawsze widoczna w przewijanym pasku (także po obróceniu ekranu)
  revealTab() {
    const nav = this.$('.nav'), cur = nav?.querySelector('[aria-current=page]');
    if (!cur || nav.scrollWidth <= nav.clientWidth) return;
    const left = cur.offsetLeft - nav.scrollLeft, right = left + cur.offsetWidth;
    if (left < 8 || right > nav.clientWidth - 8) nav.scrollLeft = cur.offsetLeft - (nav.clientWidth - cur.offsetWidth) / 2;
  }

  time(at) { return new Intl.DateTimeFormat(loc(),{hour:'2-digit',minute:'2-digit',timeZone:this._hass?.config?.time_zone}).format(at); }

  renderStage() {
    const evt = this.ui.event;
    const stage = this.$('.stage');
    const awake = Boolean(evt);
    const s = this.snapshot;
    stage.dataset.awake = awake;
    stage.dataset.kind = evt?.kind || (awake ? 'status' : 'idle');
    stage.dataset.mood = s.mood;
    stage.style.setProperty('--orb-hue',s.hue);
    stage.style.setProperty('--orb-tempo',`${s.tempo}s`);
    this.$('.orb').setAttribute('aria-pressed',String(awake));
    this.$('.orb').setAttribute('aria-label',T(awake ? 'Zamknij podgląd zdarzenia' : 'Pokaż zdarzenie lub stan domu'));
    this.$('.orb-caption').textContent = s.caption;
    this.$('.stage-copy').classList.toggle('is-event',awake);
    this.$('.stage-foot [data-act=close-event]').hidden = !awake;
    this.$('[data-act=power]').hidden = awake || !s.power;
    this.$('.headline').textContent = evt?.livePower ? s.power || T('Brak odczytu') : evt?.title || this.greeting();
    const status = evt?.text || (this._hass?.connected === false ? T('Brak połączenia z Home Assistantem') : '');
    const chips = s.chips.map(([glyph,text])=>`<span class="state-chip">${icon(glyph)}${escapeHTML(text)}</span>`).join('');
    this.setHTML('#summary',status ? escapeHTML(status) : chips || escapeHTML(s.brief));
    this.setHTML('#stage-weather',s.weather ? `${icon('weather')}${escapeHTML(s.weather)}` : '');
    if (evt) this.$('.date').textContent = evt.at ? `${T('Zdarzenie')} · ${this.time(evt.at)}` : T(evt.kind === 'energy' ? 'Energia · na żywo' : 'Stan domu');
    const progress = this.$('.signal-progress');
    progress.hidden = !awake;
    if (evt !== this.visibleEvent) {
      progress.classList.remove('run');
      if (evt) { void progress.offsetWidth; progress.classList.add('run'); }
      this.visibleEvent = evt;
    }
    this.tick();
  }

  /* ---------- wspólne klocki ---------- */
  block(title,glyph,body,head = '') {
    if (!body) return '';
    return `<section class="block"><div class="block-head"><h2>${icon(glyph)}${escapeHTML(T(title))}</h2>${head}</div>${body}</section>`;
  }

  entityTile(row,item = {},extra = '') {
    if (!row) return item.entity ? `<article class="entity" data-warn="true"><div class="entity-main"><span class="entity-icon">${icon('device')}</span><span class="entity-text"><span class="entity-name">${escapeHTML(item.name || item.entity)}</span><span class="entity-state">${T('Brak encji w HA')}</span></span></div></article>` : '';
    const id = escapeHTML(row.id);
    const label = escapeHTML(item.name || this.labelFor(row));
    const isOn = row.state === 'on' || row.state === 'playing' || ['heating','cooling'].includes(row.attrs.hvac_action);
    const canToggle = item.toggle !== false && toggleDomains.has(row.domain) && ['on','off'].includes(row.state);
    const dimmable = row.domain === 'light' && row.state === 'on' && row.attrs.brightness != null && !(row.attrs.supported_color_modes || []).every(mode=>mode === 'onoff');
    const warn = item.warn ?? (!available(row) || (row.domain === 'binary_sensor' && row.state === 'on' && (criticalClasses.has(row.attrs.device_class) || row.attrs.device_class === 'problem')));
    const glyph = item.glyph || (item.type && sensorGlyph[item.type]) || glyphFor[row.domain];
    return `<article class="entity${dimmable ? ' has-dim' : ''}" data-on="${isOn}" data-warn="${Boolean(warn)}"><button class="entity-main" data-act="details" data-id="${id}" title="${id}">
      <span class="entity-icon">${icon(glyph)}</span><span class="entity-text"><span class="entity-name">${label}</span><span class="entity-state">${escapeHTML(item.state || this.stateText(row))}</span></span></button>
      ${extra}${canToggle ? `<button class="toggle" data-act="toggle" data-id="${id}" aria-label="${T('Zasilanie')} · ${label}" aria-pressed="${row.state === 'on'}" ${this.pending.has(row.id) ? 'disabled' : ''}>${icon('power')}</button>` : ''}
      ${dimmable ? `<input class="dim" type="range" min="1" max="100" value="${Math.round(row.attrs.brightness / 2.55)}" data-id="${id}" aria-label="${T('Jasność')} · ${label}">` : ''}</article>`;
  }

  // podgląd odświeżany co 30 s (token z entity_picture HA zmienia się sam); stuknięcie = okno HA z obrazem na żywo
  cameraTile(item,note = '',alert = false) {
    const row = this.row(item.entity);
    if (!row) return this.entityTile(null,item);
    const name = escapeHTML(item.name || this.labelFor(row));
    const pic = available(row) && row.attrs.entity_picture ? `${row.attrs.entity_picture}${String(row.attrs.entity_picture).includes('?') ? '&' : '?'}t=${Math.floor(Date.now() / 30000)}` : '';
    const off = !available(row) || row.state === 'off';
    return `<button class="tile cam" data-act="details" data-id="${escapeHTML(row.id)}" data-alert="${alert}">${pic && !off ? `<img src="${escapeHTML(pic)}" alt="" loading="lazy" onerror="this.remove()">` : `<span class="cam-off">${icon('shield')}${escapeHTML(T(off ? 'Kamera wyłączona' : 'Brak podglądu'))}</span>`}<span class="cam-label">${icon('shield')}${name}<small>${escapeHTML(note || (row.state === 'idle' ? '' : this.stateText(row)))}</small></span></button>`;
  }
  cams(items) { const html = items.map(item=>this.cameraTile(item)).join(''); return html ? `<div class="cams">${html}</div>` : ''; }

  grid(items,map) { const html = items.map(map).join(''); return html ? `<div class="entity-grid">${html}</div>` : ''; }

  /* ---------- widok pokoju ---------- */
  renderRoom(rooms) {
    const room = rooms.find(item=>item.id === this.ui.area);
    if (!room) { this.navigate('rooms'); return; }
    const cfg = room.cfg || {};
    const {lights,on} = this.roomStatus(room);
    const temp = this.roomTemp(room);
    const humidity = this.reading(cfg.humidity);
    const chips = [
      temp != null && ['thermo',format(temp,this.tempUnit())],
      humidity != null && ['water',`${format(humidity)}%`],
      lights.length && ['light',on ? T('{on} z {n} wł.',{on,n:lights.length}) : T('Zgaszone')],
    ].filter(Boolean).map(([g,t])=>`<span class="state-chip">${icon(g)}${escapeHTML(t)}</span>`).join('');
    this.setHTML('.room-banner',`<button class="quiet back" data-go="rooms">← ${T('Pokoje')}</button><h1 class="page-title">${escapeHTML(room.name)}</h1><p>${escapeHTML(cfg.subtitle || '')}</p><div class="chips">${chips}</div>${drawing(roomIcon(room.name),true)}`);

    let body = '';
    if (room.cfg) {
      const lightItems = listOf(cfg.lights);
      const allBtn = lights.length ? `<button class="mini" data-act="room" data-id="${escapeHTML(room.id)}" aria-pressed="${on > 0}" ${this.pending.has(`room:${room.id}`) ? 'disabled' : ''}>${icon('power')}${T(on ? 'Zgaś wszystkie' : 'Zapal wszystkie')}</button>` : '';
      body += this.block('Światła','light',this.grid(lightItems,item=>this.entityTile(this.row(item.entity),{...item,glyph:item.type === 'fan' ? 'fan' : 'light'})),allBtn);
      body += this.block('Klimat','thermo',this.climateCards(listOf(cfg.climate)));
      body += this.block('Multimedia','film',this.grid(listOf(cfg.media),item=>this.mediaTile(item)));
      body += this.block('Czujniki','sensor',this.grid(listOf(cfg.sensors),item=>this.entityTile(this.row(item.entity),item)));
      body += this.block('Kamery','shield',this.cams(listOf(cfg.cameras)));
      const devices = (cfg.devices || []).map(device=>this.deviceCard(device)).join('');
      body += this.block('Urządzenia','device',devices ? `<div class="cards">${devices}</div>` : '');
      if (!body) body = `<p class="empty">${T('Ten pokój nie ma jeszcze przypisanych urządzeń w konfiguracji karty.')}</p>`;
    } else {
      // tryb bez konfiguracji: tylko światła i klimat z obszaru, bez tysięcy encji diagnostycznych
      body += this.block('Światła','light',this.grid(lights,row=>this.entityTile(row)));
      body += this.block('Klimat','thermo',this.climateCards(room.rows.filter(row=>row.domain === 'climate').map(row=>({entity:row.id}))));
      body += this.block('Kamery','shield',this.cams(room.rows.filter(row=>row.domain === 'camera').map(row=>({entity:row.id}))));
      if (!body) body = `<p class="empty">${T('Dodaj listę „rooms” w konfiguracji karty, aby wybrać urządzenia tego pokoju.')}</p>`;
    }
    this.setHTML('#room-body',body);
    this.setHTML('.room-strip',rooms.filter(r=>r.id !== '__unassigned').map(r=>{
      const lit = r.rows.some(row=>this.isLight(row) && row.state === 'on');
      return `<button data-room="${escapeHTML(r.id)}" data-on="${lit}"${r.id === room.id ? ' aria-current="page"' : ''}>${icon(roomIcon(r.name))}${escapeHTML(r.name)}</button>`;
    }).join(''));
  }

  // kafelki zakładki po kolei „wyrastają” z wklęsłego kółka; tylko przy wejściu, nie przy każdej zmianie stanu
  playSectionEnter(page) {
    const section = this.$(`#${page}`);
    if (!section || page === 'home') return;
    section.classList.remove('enter');
    void section.offsetWidth;
    [...section.querySelectorAll('.page-title, .intro, .heat-top, .block-head, .entity, .tile, .hour, .day, .bin-row')].forEach((el,i)=>el.style.setProperty('--i',Math.min(i,16)));
    section.classList.add('enter');
    clearTimeout(this.enterTimer);
    this.enterTimer = setTimeout(()=>section.classList.remove('enter'),2200);
  }

  climateCards(items) {
    const html = items.map(item=>{
      const row = this.row(item.entity);
      if (!row) return '';
      const heating = row.attrs.hvac_action === 'heating' || row.attrs.hvac_action === 'cooling';
      return `<article class="tile${heating ? ' active' : ''}"><span class="label">${icon('thermo')}${escapeHTML(item.name || this.labelFor(row))}</span><div class="card-body">${available(row) ? this.climateBody(row) : `<span class="value">—</span><small>${T('Niedostępne')}</small>`}${item.note ? `<p class="note-line">${escapeHTML(item.note)}</p>` : ''}</div></article>`;
    }).join('');
    return html ? `<div class="cards">${html}</div>` : '';
  }

  mediaTile(item) {
    const row = this.row(item.entity);
    if (!row) return this.entityTile(null,item);
    const vol = this.row(item.volume_entity) || row;
    const id = escapeHTML(row.id), vid = escapeHTML(vol.id);
    const live = available(row) && !['off','standby'].includes(row.state);
    const extra = live ? `<span class="entity-extra">
        ${item.speaker || row.attrs.supported_features == null || row.attrs.supported_features & 1 ? `<button class="round" data-act="media" data-cmd="media_play_pause" data-id="${id}" aria-label="${T('Odtwórz / pauza')}">${row.state === 'playing' ? '❚❚' : '▶'}</button>` : ''}
        <button class="round" data-act="media" data-cmd="volume_down" data-id="${vid}" aria-label="${T('Ciszej')}">−</button><button class="round" data-act="media" data-cmd="volume_up" data-id="${vid}" aria-label="${T('Głośniej')}">+</button></span>` : '';
    return this.entityTile(row,{...item,glyph:'film',toggle:false},extra);
  }

  deviceCard(device) {
    const status = this.row(device.status) || this.row(device.entity);
    const main = this.row(device.entity);
    const rowsHTML = Object.entries(device).filter(([key,value])=>!deviceSkip.has(key) && key !== 'status' && key !== 'entity' && !deviceActions[key] && typeof value === 'string').map(([key,id])=>{
      const row = this.row(id);
      if (!row || ['button','switch','light'].includes(row.domain)) return '';
      const text = row.domain === 'binary_sensor' ? T(row.state === 'on' ? (key === 'bin_full' ? 'Pełny' : key === 'water_full' ? 'Pełny' : 'Tak') : (key === 'bin_full' || key === 'water_full') ? 'OK' : 'Nie') : this.stateText(row);
      return `<div><span>${escapeHTML(deviceLabels[key] ? T(deviceLabels[key]) : key)}</span><b>${escapeHTML(text)}</b></div>`;
    }).join('');
    const problems = listOf(device.problems).map(item=>this.row(item.entity)).filter(row=>row?.state === 'on');
    const actions = [
      ...(main && toggleDomains.has(main.domain) ? [{key:'entity',row:main,name:T('Zasilanie')}] : []),
      ...Object.entries(device).filter(([key,value])=>deviceActions[key] && typeof value === 'string').map(([key,id])=>({key,row:this.row(id),name:T(deviceActions[key])})),
      ...listOf(device.switches).map(item=>({key:'switch',row:this.row(item.entity),name:item.name})),
    ].filter(a=>a.row).map(({row,name})=>{
      const id = escapeHTML(row.id);
      if (row.domain === 'button') return `<button class="mini" data-act="press" data-id="${id}" ${!available(row) || this.pending.has(row.id) ? 'disabled' : ''}>${icon('arrow')}${escapeHTML(name)}</button>`;
      if (toggleDomains.has(row.domain)) return `<button class="mini" data-act="toggle" data-id="${id}" aria-pressed="${row.state === 'on'}" ${!['on','off'].includes(row.state) || this.pending.has(row.id) ? 'disabled' : ''}>${icon('power')}${escapeHTML(name)}</button>`;
      return '';
    }).join('');
    const busy = status && available(status) && !/^(off|idle|standby|finished|zakonczony|gotowa|gotowy|ready|none|unknown)$/i.test(fold(status.state));
    const glyph = deviceGlyph[device.type] || 'device';
    return `<article class="tile${busy ? ' active' : ''}"><span class="label">${icon(glyph)}${escapeHTML(device.name || T('Urządzenie'))}</span>
      <div class="card-body"><span class="big-value">${escapeHTML(status ? this.stateText(status) : '—')}</span>${problems.length ? `<small class="warn">Problem: ${escapeHTML(problems.map(r=>this.labelFor(r)).join(', '))}</small>` : ''}
      ${rowsHTML ? `<div class="device-rows">${rowsHTML}</div>` : ''}${actions ? `<div class="device-actions">${actions}</div>` : ''}</div></article>`;
  }

  /* ---------- zakładka Klimat ---------- */
  renderClimate(rooms) {
    const unit = this.tempUnit();
    const tiles = rooms.map(room=>{
      const temp = this.roomTemp(room);
      const humidity = this.reading(room.cfg?.humidity);
      if (temp == null && humidity == null) return '';
      const windows = listOf(room.cfg?.sensors).filter(item=>item.type === 'window').map(item=>this.row(item.entity)).filter(Boolean);
      const open = windows.filter(row=>row.state === 'on');
      const climates = listOf(room.cfg?.climate).map(item=>this.row(item.entity)).filter(available);
      const heating = climates.some(row=>row.attrs.hvac_action === 'heating');
      const note = [humidity != null && `${T('wilgotność')} ${format(humidity)}%`,heating && T('grzeje'),open.length && T('okno otwarte')].filter(Boolean).join(' · ');
      return `<button class="tile room${heating ? ' active' : ''}" data-room="${escapeHTML(room.id)}"><span class="label">${icon(roomIcon(room.name))}${escapeHTML(room.name)}</span><span><span class="value">${temp != null ? escapeHTML(format(temp,unit)) : '—'}</span>${note ? `<span class="note">${escapeHTML(note)}</span>` : ''}</span><span class="arrow">${icon('arrow')}</span></button>`;
    }).join('');
    const seen = new Set();
    const items = [...listOf(this.config?.climate),...rooms.flatMap(room=>listOf(room.cfg?.climate))].filter(item=>!seen.has(item.entity) && seen.add(item.entity));
    if (!items.length && !this.getModel().configured) this.getModel().rows.filter(row=>row.domain === 'climate').forEach(row=>items.push({entity:row.id}));
    const temps = rooms.map(room=>this.roomTemp(room)).filter(Number.isFinite);
    this.$('#climate-intro').textContent = temps.length ? T('Średnio {t} w {n}',{t:format(temps.reduce((a,b)=>a + b,0) / temps.length,unit),n:plN(temps.length,'pomieszczeniu','pomieszczeniach','pomieszczeniach')}) : T('Brak odczytów temperatury');
    const weather = this.getModel().rows.find(row=>row.domain === 'weather' && available(row) && (!this.config?.weather_entity || row.id === this.config.weather_entity));
    const head = weather ? `<span class="state-chip">${icon('weather')}${T('Na zewnątrz')} · ${escapeHTML(this.stateText(weather))}</span>` : '';
    this.setHTML('#climate-body',this.block('Pomieszczenia','rooms',tiles ? `<div class="rooms">${tiles}</div>` : '',head) + this.block('Termostaty i klimatyzacja','thermo',this.climateCards(items)));
  }

  /* ---------- zakładka Energia ---------- */
  renderEnergy(rows) {
    const e = this.config?.energy_page || this.config?.energy || {};
    const r = key => this.row(e[key]);
    const energy = this.powerRow(rows);
    const price = r('el_rate') || this.row(this.config?.price_entity);
    const pence = this.priceInPence(price), next = this.priceInPence(r('el_next'));
    const tile = (glyph,label,value,lines,active = false,extra = '') => `<article class="tile${active ? ' active' : ''}"><span class="label">${icon(glyph)}${escapeHTML(T(label))}</span><div class="card-body"><span class="big-value">${escapeHTML(value)}</span>${extra}${lines.filter(Boolean).length ? `<div class="device-rows">${lines.filter(Boolean).map(([k,v])=>`<div><span>${escapeHTML(T(k))}</span><b>${escapeHTML(v)}</b></div>`).join('')}</div>` : ''}</div></article>`;
    const val = key => r(key) ? this.stateText(r(key)) : null;
    const cards = [
      energy && tile('bolt','Moc teraz',available(energy) ? this.stateText(energy) : '—',[],available(energy),this.spark()),
      r('el_today') && tile('power','Prąd dziś',val('el_today'),[r('el_cost') && ['Koszt',money(r('el_cost'))],r('el_yday_cost') && ['Wczoraj',money(r('el_yday_cost'))],r('el_standing') && ['Opłata stała',money(r('el_standing'))]]),
      price && tile('spark','Cena prądu',pence != null ? format(pence,'p/kWh') : '—',[next != null && ['Następna',format(next,'p/kWh')],r('cheap_heating') && ['Tanie grzanie',this.stateText(r('cheap_heating'))]]),
      r('gas_today_kwh') && tile('thermo','Gaz dziś',val('gas_today_kwh'),[r('gas_today_m3') && ['Objętość',val('gas_today_m3')],r('gas_cost') && ['Koszt',money(r('gas_cost'))],r('gas_rate') && ['Stawka',(()=>{ const p = this.priceInPence(r('gas_rate')); return p != null ? format(p,'p/kWh') : '—'; })()]]),
      r('water_yday') && tile('water','Woda wczoraj',val('water_yday'),[r('water_cost') && ['Woda',money(r('water_cost'))],r('sewer_cost') && ['Ścieki',money(r('sewer_cost'))],r('water_reading') && ['Odczyt',val('water_reading')]]),
    ].filter(Boolean).join('');
    const devices = (e.devices || []).map(d=>{
      const today = this.row(d.today), power = this.row(d.power);
      if (!today && !power) return '';
      const row = today || power;
      return this.entityTile(row,{name:d.name,glyph:'bolt',toggle:false,state:[today && `${T('dziś')} ${this.stateText(today)}`,power && this.stateText(power)].filter(Boolean).join(' · ')});
    }).join('');
    this.$('#energy-intro').textContent = energy && available(energy) ? T('Dom pobiera teraz {p}',{p:this.stateText(energy)}) : T('Zużycie i koszty z liczników');
    const body = this.block('Liczniki','bolt',cards ? `<div class="cards">${cards}</div>` : '') + this.block('Urządzenia','device',devices ? `<div class="entity-grid">${devices}</div>` : '');
    this.setHTML('#energy-body',body || `<p class="empty">${T(this.config?.energy_page || this.config?.energy ? 'Nie znalazłem w Home Assistant encji wpisanych w „energy_page”.' : 'Dodaj sekcję „energy_page” w konfiguracji karty.')}</p>`);
  }

  /* ---------- zakładka Ochrona ---------- */
  renderSecurity() {
    const cfg = this.securityConfig() || {};
    const groupOf = key => listOf(cfg[key]).map(item=>({item,row:this.row(item.entity)}));
    const windows = groupOf('windows'), motion = groupOf('motion'), leaks = groupOf('leaks'), co = groupOf('co'), batteries = groupOf('batteries');
    const alerts = [...leaks,...co].filter(({row})=>row?.state === 'on');
    const open = windows.filter(({row})=>row?.state === 'on');
    const lowBattery = batteries.filter(({row})=>available(row) && Number(row.state) < (cfg.battery_low ?? 20));
    const offline = [...windows,...motion,...leaks,...co].filter(({row})=>!available(row));
    const bad = alerts.length > 0;
    const title = bad ? `${T('Uwaga')}: ${alerts.map(({item,row})=>item.name || this.labelFor(row)).join(', ')}` : open.length ? `${T('Otwarte')}: ${open.map(({item,row})=>item.name || this.labelFor(row)).join(', ')}` : T('Wszystko w porządku');
    const sub = [offline.length && T('{n} bez odczytu',{n:offline.length}),lowBattery.length && plN(lowBattery.length,'słaba bateria','słabe baterie','słabych baterii')].filter(Boolean).join(' · ') || T('Czujniki działają, nie ma alarmów');
    let body = `<div class="status-banner" data-bad="${bad}">${icon('shield')}<div><b>${escapeHTML(title)}</b><span>${escapeHTML(sub)}</span></div></div>`;
    const guard = this.row(cfg.guard);
    if (guard) {
      const options = cfg.guard_options ? Object.keys(cfg.guard_options) : guard.attrs.options || [];
      const modes = options.map(option=>{
        const meta = cfg.guard_options?.[option] || {};
        return `<button class="preset" data-act="select" data-id="${escapeHTML(guard.id)}" data-option="${escapeHTML(option)}" aria-pressed="${guard.state === option}" ${this.pending.has(guard.id) ? 'disabled' : ''}>${icon(option === 'Disarmed' ? 'power' : 'shield')}<span>${escapeHTML(meta.name || option)}${meta.desc ? `<small>${escapeHTML(meta.desc)}</small>` : ''}</span></button>`;
      }).join('');
      body += this.block('Tryb ochrony','shield',`<div class="modes">${modes}</div>`);
    }
    const sensorGrid = list => this.grid(list,({item,row,type})=>this.entityTile(row,{...item,type}));
    const typed = (list,type) => list.map(x=>({...x,type}));
    body += this.block('Okna','door',sensorGrid(typed(windows,'window')));
    body += this.block('Wycieki i czad','water',sensorGrid([...typed(leaks,'leak'),...typed(co,'co')]));
    body += this.block('Ruch i obecność','sensor',sensorGrid(typed(motion,'motion')));
    const cams = (cfg.cameras || []).map(cam=>{
      const states = [['ring','Dzwonek'],['person','Osoba'],['motion','Ruch']].map(([key,label])=>{ const row = this.row(cam[key]); return row?.state === 'on' ? T(label) : null; }).filter(Boolean);
      const enabled = this.row(cam.enabled);
      const note = states.length ? `${T('Wykryto')}: ${states.join(', ')}` : enabled?.state === 'off' ? T('Kamera wyłączona') : '';
      if (this.row(cam.entity)) return this.cameraTile({entity:cam.entity,name:cam.name},note,states.length > 0);
      const row = this.row(cam.motion) || this.row(cam.person) || enabled;
      if (!row) return '';
      return this.entityTile(row,{name:cam.name,glyph:'shield',toggle:false,state:states.length ? `${T('Wykryto')}: ${states.join(', ')}` : T(enabled?.state === 'off' ? 'Kamera wyłączona' : 'Spokój')});
    }).join('');
    body += this.block('Kamery','shield',cams ? `<div class="${(cfg.cameras || []).some(c=>this.row(c.entity)) ? 'cams' : 'entity-grid'}">${cams}</div>` : '');
    body += this.block('Baterie czujników','bolt',this.grid(batteries.sort((a,b)=>Number(a.row?.state ?? 999) - Number(b.row?.state ?? 999)),({item,row})=>this.entityTile(row,{...item,type:'battery',warn:!available(row) || Number(row?.state) < (cfg.battery_low ?? 20)})));
    if (!this.securityConfig()) body += `<p class="empty">${T('Dodaj sekcję „security_page” w konfiguracji karty.')}</p>`;
    this.setHTML('#security-body',body);
  }

  /* ---------- zakładka F1 (integracja F1 Sensor, jak w Home Pulse; tylko odczyt) ---------- */
  f1E() { return {...F1_DEF,...(this.config?.f1 || {})}; }
  f1Sessions(A) {
    const now = Date.now();
    const list = F1_SES.map(([k,n,g,dur])=>A[k] ? {k,n:T(n),g,t:Date.parse(A[k]),end:Date.parse(A[k]) + dur * 60e3} : null).filter(s=>s && !Number.isNaN(s.t)).sort((a,b)=>a.t - b.t);
    list.forEach(s=>{ s.st = now >= s.end ? 'done' : now >= s.t ? 'now' : 'todo'; });
    const nx = list.find(s=>s.st !== 'done');
    if (nx) nx.next = true;
    return list;
  }
  f1Live() { const s = this.row(this.f1E().status), v = available(s) ? String(s.state).toLowerCase() : ''; return {live:['live','suspended','started'].includes(v),pre:v === 'pre'}; }
  f1Track() { const s = this.row(this.f1E().track); if (!available(s)) return null; const tr = F1_TRACK[String(s.state).toUpperCase().replace(/\s+/g,'_')]; return tr ? [tr[0],T(tr[1]),T(tr[2])] : ['warn',s.state,T('stan toru')]; }
  f1Until(ms) { if (ms <= 0) return ''; const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5), m = Math.round(ms / 6e4); return d >= 1 ? T('za {x}',{x:plN(d,'dzień','dni','dni')}) : h >= 1 ? T('za {n} godz.',{n:h}) : T('za {n} min',{n:Math.max(1,m)}); }
  f1Day(t,long = false) { return new Date(t).toLocaleDateString(loc(),long ? {weekday:'long',day:'numeric',month:'long',timeZone:this._hass?.config?.time_zone} : {weekday:'short',day:'numeric',month:'short',timeZone:this._hass?.config?.time_zone}).replace(/\./g,''); }
  f1SessionName(s) { const k = F1_SNAME[String(s || '').toLowerCase()]; return k ? T(k) : s || T('Sesja'); }
  // krótka informacja na ekran główny: w tygodniu wyścigowym i na żywo
  f1Chip() {
    if (!this.tabVisible('f1')) return null;
    const E = this.f1E(), nr = this.row(E.next), lv = this.f1Live(), wk = this.row(E.week);
    if (!nr || (!lv.live && !lv.pre && wk?.state !== 'on')) return null;
    if (lv.live) return `${T('Na żywo')} · ${this.f1SessionName(this.row(E.session)?.state)}${this.f1Track() ? ` · ${this.f1Track()[1]}` : ''}`;
    const nx = this.f1Sessions(nr.attrs).find(s=>s.next);
    return `${String(nr.attrs.race_name || 'F1').replace(/ Grand Prix$/,' GP')}${nx ? ` · ${nx.st === 'now' ? T('{s} trwa',{s:nx.n}) : `${nx.n} ${this.f1Until(nx.t - Date.now())}`}` : ''}`;
  }

  renderF1() {
    const E = this.f1E(), nr = this.row(E.next), A = nr?.attrs || {}, S = this.f1Sessions(A), lv = this.f1Live(), spoil = this.row(E.nospoil)?.state === 'on';
    const num = x => { const v = parseFloat(x); return Number.isNaN(v) ? null : v; };
    const tile = (g,title,sub,body,cls = '') => `<article class="tile${cls ? ` ${cls}` : ''}"><span class="label">${icon(g)}${escapeHTML(T(title))}${sub ? `<small style="font-weight:400;color:var(--muted);margin-left:4px">${escapeHTML(T(sub))}</small>` : ''}</span><div class="card-body">${body}</div></article>`;
    const muted = x => `<p class="note-line">${escapeHTML(T(x))}</p>`;
    // pigułki u góry
    const season = this.row(E.season), wk = this.row(E.week), ds = this.row(E.drivers), L = ds?.attrs.driver_standings || [];
    const chip = (g,t) => `<span class="state-chip">${icon(g)}${escapeHTML(t)}</span>`;
    const pills = [];
    if (A.round) pills.push(chip('flag',`${T('Runda')} ${A.round}${Array.isArray(season?.attrs.races) ? ` ${T('z')} ${season.attrs.races.length}` : ''}`));
    if (lv.live) pills.push(chip('bolt',`${T('Na żywo')} · ${this.f1SessionName(this.row(E.session)?.state)}`));
    else if (wk?.state === 'on') pills.push(chip('spark',T('Tydzień wyścigowy')));
    else if (S[0]) { const d = Math.floor((S[0].t - Date.now()) / 864e5); pills.push(chip('clock',d <= 0 ? T('Pierwszy trening już blisko') : T('Pierwszy trening za {x}',{x:plN(d,'dzień','dni','dni')}))); }
    if (!spoil && L.length > 1) pills.push(chip('trophy',T('Lider {n} +{p} pkt',{n:L[0].Driver?.familyName || L[0].Driver?.code || '',p:Math.round((num(L[0].points) || 0) - (num(L[1].points) || 0))})));
    this.setHTML('#f1-pills',pills.join(''));
    if (!nr) { this.setHTML('#f1-body',`<p class="empty">${T('Nie widzę integracji F1 Sensor w Home Assistant.')}</p>`); return; }

    // góra: odliczanie albo stan na żywo
    let top;
    if (lv.live) {
      const tk = this.f1Track() || ['ok',T('Brak danych'),T('czekam na stan toru')], col = {ok:'#3fcf7a',warn:'#ffae42',bad:'#ff5a4a'}[tk[0]];
      const lap = this.row(E.laps), tot = lap?.attrs.total_laps, rem = this.row(E.remain);
      const remTxt = available(rem) ? (/^\d+(\.\d+)?$/.test(rem.state) ? (s=>`${Math.floor(s / 3600) ? `${Math.floor(s / 3600)}:` : ''}${String(Math.floor(s % 3600 / 60)).padStart(Math.floor(s / 3600) ? 2 : 1,'0')}:${String(s % 60).padStart(2,'0')}`)(Math.round(+rem.state)) : rem.state) : null;
      const tw = this.row(E.tw), twA = available(tw) ? tw.attrs : null, air = twA ? num(twA.air_temperature ?? twA.air_temp) : null, trk = twA ? num(twA.track_temperature ?? twA.track_temp) : null;
      const asList = x => Array.isArray(x) ? x : x && typeof x === 'object' ? Object.entries(x).map(([k,v])=>v && typeof v === 'object' ? {_k:k,...v} : null).filter(Boolean) : [];
      const D = new Map(asList(this.row(E.list)?.attrs.drivers).map(d=>[String(d.racing_number ?? d._k ?? '').trim(),d]));
      const rows = asList(this.row(E.positions)?.attrs.drivers).map(p=>{ const rn = String(p.racing_number ?? (String(p._k || '').match(/\d+/) || [''])[0]).trim(), d = D.get(rn) || {}; const pos = parseInt(p.current_position ?? p.position ?? d.position,10); const c = String(d.team_color || p.team_color || '').replace(/^#?/,'#');
        return {pos:Number.isNaN(pos) ? null : pos,tla:p.tla || d.tla || rn,name:d.last_name || d.full_name || '',team:d.team || d.team_name || '',col:/^#[0-9a-f]{6}$/i.test(c) ? c : '',gap:pos === 1 ? T('lider') : String(p.gap_to_leader ?? p.interval ?? '').replace('.',LANG === 'en' ? '.' : ',')}; }).filter(r=>r.pos != null).sort((a,b)=>a.pos - b.pos);
      const rc = this.row(E.rc), msgs = available(rc) ? (Array.isArray(rc.attrs.history) && rc.attrs.history.length ? rc.attrs.history.slice(-4).reverse() : [{message:rc.attrs.message || rc.state,utc:rc.attrs.utc}]) : [];
      const led = this.row(E.led), tvRoom = this.getModel().roomsCfg.find(r=>listOf(r.media).length);
      top = `<div class="f1-grid">
        ${tile('flag','Stan na torze',A.race_name || '',`<div class="flag-ring" style="--fc:${col}"><svg viewBox="0 0 300 300"><circle class="r0" cx="150" cy="150" r="140"/><circle class="r1" cx="150" cy="150" r="118"/><circle class="r0" cx="150" cy="150" r="98"/></svg><div><small>${T('Stan toru')}</small><b>${escapeHTML(tk[1])}</b><small>${escapeHTML(tk[2])}</small></div></div>
          <div class="device-rows">${available(lap) ? `<div><span>${T('Okrążenie')}</span><b>${escapeHTML(lap.state)}${tot ? ` / ${escapeHTML(tot)}` : ''}</b></div>` : ''}${remTxt ? `<div><span>${T('Do końca')}</span><b>${escapeHTML(remTxt)}</b></div>` : ''}${air != null ? `<div><span>${T('Na torze')}</span><b>${format(air,'°C')}${trk != null ? ` · ${T('tor')} ${format(trk,'°')}` : ''}</b></div>` : ''}</div>`,'active')}
        ${tile('trophy','Pozycje','',rows.length ? `<div class="std">${rows.slice(0,10).map(r=>`<div class="std-row"><span class="p">${r.pos}</span><span class="cd" style="--tc:${r.col || 'var(--hot)'}">${escapeHTML(r.tla)}</span><span class="n">${escapeHTML(r.name)}${r.team ? `<small>${escapeHTML(r.team)}</small>` : ''}</span><span class="pt">${escapeHTML(r.gap)}</span></div>`).join('')}</div>` : muted('Pozycje pojawią się, gdy sesja ruszy.'))}
        ${tile('bell','Dyrekcja wyścigu','',msgs.filter(m=>m?.message).length ? `<div class="rc">${msgs.filter(m=>m?.message).map(m=>`<div><time>${m.utc ? this.time(Date.parse(m.utc)) : ''}</time><span>${escapeHTML(m.message)}</span></div>`).join('')}</div>` : muted('Brak komunikatów.'))}
        ${led || tvRoom ? tile('home','Dom w trakcie wyścigu','tylko podgląd',`${led ? `<div class="f1-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45"><path d="${glyphs.light}"/></svg><div><b>${escapeHTML(led.attrs.friendly_name || T('Automatyzacja F1'))}</b><small>${T(led.state === 'on' ? 'automatyzacja włączona' : 'automatyzacja wyłączona')}</small></div></div>` : ''}${tvRoom ? `<button class="f1-row" data-room="${escapeHTML(tvRoom.id)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45"><path d="${glyphs.film}"/></svg><div><b>${escapeHTML(tvRoom.name)}</b><small>${T('otwórz pokój z telewizorem')}</small></div></button>` : ''}`) : ''}</div>`;
    } else {
      const rs = Date.parse(A.race_start), left = rs - Date.now(), nx = S.find(s=>s.next);
      const badge = lv.pre ? `${T('Sesja zaraz się zacznie')}${nx ? ` · ${nx.n}` : ''}` : wk?.state === 'on' && nx ? `${T('Tydzień wyścigowy')} · ${T(nx.st === 'now' ? 'trwa' : 'najbliżej')} ${nx.n}` : '';
      const cd = left > 0 ? `<div class="f1-cd" aria-label="${T('Do wyścigu')}"><div><b>${Math.floor(left / 864e5)}</b><small>${T('dni')}</small></div><div><b>${Math.floor(left % 864e5 / 36e5)}</b><small>${T('godz.')}</small></div><div><b>${Math.floor(left % 36e5 / 6e4)}</b><small>min</small></div></div>` : '';
      const sub = [Number.isNaN(rs) ? '' : T('Wyścig {d} o {h}',{d:this.f1Day(rs,true),h:this.time(rs)}),num(A.scheduled_laps) ? T('{n} okrążeń',{n:A.scheduled_laps}) : '',A.sprint_start ? T('weekend ze sprintem') : ''].filter(Boolean).join(' · ');
      top = `<div class="f1-hero"><div class="f1-copy">${badge ? `<span class="f1-badge"><i></i>${escapeHTML(badge)}</span>` : ''}<span class="f1-eye">${A.country_flag_url ? `<img src="${escapeHTML(A.country_flag_url)}" alt="" onerror="this.remove()">` : ''}${T('Runda')} ${escapeHTML(A.round || '—')} · ${escapeHTML(A.circuit_name || '')}</span>
        <span class="f1-name">${escapeHTML(A.race_name || T('Następny wyścig'))}</span><span class="f1-sub">${escapeHTML(sub)}</span>${cd}</div>${f1Scene()}</div>`;
    }
    // plan weekendu
    const plan = tile('clock','Plan weekendu','Twój czas',S.length ? S.map(s=>{ const rel = s.st === 'now' ? T('trwa') : s.st === 'done' ? T('zakończona') : s.next ? this.f1Until(s.t - Date.now()) : '';
      return `<div class="f1-row ${s.st}${s.next ? ' next' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"><path d="${glyphs[s.g]}"/></svg><div><b>${escapeHTML(s.n)}</b><small>${escapeHTML(this.f1Day(s.t))}</small></div><div class="t">${escapeHTML(this.time(s.t))}${rel ? `<small>${escapeHTML(rel)}</small>` : ''}</div></div>`; }).join('') : muted('Brak planu sesji.'));
    // ostatni wyścig
    const last = this.row(E.last), LA = last?.attrs || {}, R = Array.isArray(LA.results) ? LA.results : [];
    const where = `${(LA.circuit_country && country(LA.circuit_country)) || LA.race_name || ''}${LA.round ? ` · ${T('runda')} ${LA.round}` : ''}`;
    const podium = !available(last) ? muted('Brak wyników.') : spoil ? muted('Wyniki ukryte, bo tryb bez spoilerów jest włączony.')
      : `<div class="podium">${[[R[1],'p2'],[R[0],'p1'],[R[2],'p3']].map(([r,c])=>r ? `<div class="${c}"><b>${escapeHTML(r.driver?.code || '')}</b><small>${escapeHTML(r.constructor?.name || '')}</small><em>${escapeHTML(String(r.time || r.status || '').replace('.',LANG === 'en' ? '.' : ','))}</em><span class="step">${escapeHTML(r.position)}</span></div>` : '<div></div>').join('')}</div>`;
    // klasyfikacje
    const standings = kind => {
      const s = this.row(kind === 'd' ? E.drivers : E.teams), title = kind === 'd' ? 'Kierowcy' : 'Zespoły';
      if (!available(s)) return tile('trophy',title,'',muted('Brak klasyfikacji.'));
      const list = (kind === 'd' ? s.attrs.driver_standings : s.attrs.constructor_standings) || [];
      const sub = s.attrs.round ? T('po {x}',{x:plN(+s.attrs.round,'rundzie','rundach','rundach')}) : '';
      if (spoil) return tile('trophy',title,sub,muted('Klasyfikacja ukryta, bo tryb bez spoilerów jest włączony.'));
      const max = num(list[0]?.points) || 1;
      return tile('trophy',title,sub,`<div class="std">${list.slice(0,5).map(r=>{ const pts = num(r.points) || 0, team = kind === 'd' ? r.Constructors?.[0] : r.Constructor;
        const code = kind === 'd' ? r.Driver?.code : F1_TEAM[team?.constructorId] || (team?.name || '').slice(0,3).toUpperCase();
        return `<div class="std-row"><span class="p">${escapeHTML(r.position)}</span><span class="cd" style="--tc:${F1_TEAM_COL[team?.constructorId] || 'var(--hot)'}">${escapeHTML(code || '')}</span><span class="n">${escapeHTML(kind === 'd' ? r.Driver?.familyName || '' : team?.name || '')}${kind === 'd' && team?.name ? `<small>${escapeHTML(team.name)}</small>` : ''}<span class="bar"><i style="width:${Math.max(2,pts / max * 100).toFixed(1)}%"></i></span></span><span class="pt">${escapeHTML(r.points)}</span></div>`; }).join('')}</div>`);
    };
    // o torze
    const facts = [];
    if (A.defending_winner?.driver_name) facts.push(`<div><small>${T('Broni zwycięstwa')}</small><b>${escapeHTML(A.defending_winner.driver_name)}</b> · ${escapeHTML(A.defending_winner.constructor_name || '')}${A.defending_winner.grid ? `, ${T('start z')} P${escapeHTML(A.defending_winner.grid)}` : ''}</div>`);
    if (Array.isArray(A.last_5_winners) && A.last_5_winners.length) facts.push(`<div><small>${T('Ostatni zwycięzcy')}</small><span class="wins">${A.last_5_winners.map(w=>`<span>${escapeHTML(w.season)} ${escapeHTML(w.driver_code || '')}</span>`).join('')}</span></div>`);
    if (num(A.pole_to_win_conversion_last_5) != null) facts.push(`<div><small>${T('Pole position → zwycięstwo')}</small><b>${format(A.pole_to_win_conversion_last_5)}%</b> ${T('w ostatnich wyścigach tutaj')}</div>`);
    if (num(A.dnf_rate_last_5) != null) facts.push(`<div><small>${T('Nie dojeżdża do mety')}</small><b>${format(A.dnf_rate_last_5)}%</b> ${T('kierowców w ostatnich latach')}</div>`);
    const held = num(A.races_held_here);
    const about = tile('flag','O torze',[A.circuit_locality,held ? plN(held,'wyścig','wyścigi','wyścigów') : ''].filter(Boolean).join(' · '),`<div class="track-about">${A.circuit_outline_url ? `<img src="${escapeHTML(A.circuit_outline_url)}" alt="${T('Obrys toru')} ${escapeHTML(A.circuit_name || '')}" onerror="this.remove()">` : ''}<div class="facts">${facts.join('') || muted('Brak danych o torze.')}</div></div>`,'wide');
    // pogoda na wyścig
    const fw = this.row(E.weather), FW = fw?.attrs || {}, rt = num(FW.race_temperature);
    const wmo = k => { k = +k; return k === 0 ? 'bezchmurnie' : k <= 2 ? 'małe zachmurzenie' : k === 3 ? 'pochmurno' : k === 45 || k === 48 ? 'mgła' : k >= 51 && k <= 57 ? 'mżawka' : k >= 61 && k <= 67 ? 'deszcz' : k >= 71 && k <= 77 ? 'śnieg' : k >= 80 && k <= 82 ? 'przelotny deszcz' : k >= 95 ? 'burza' : ''; };
    const fwGlyph = +FW.race_weather_code >= 51 ? 'rain' : +FW.race_weather_code >= 2 ? 'weather' : 'sun';
    const wx = tile(fwGlyph,'Pogoda na wyścig',FW.circuit_locality || '',rt == null ? muted('Prognoza pojawi się bliżej wyścigu.') : `<span class="big-value">${format(rt,'°C')}</span><small>${escapeHTML([T(wmo(FW.race_weather_code)),FW.race_precipitation_probability != null ? `${T('deszcz')} ${format(FW.race_precipitation_probability)}%` : '',num(FW.race_wind_speed) != null ? `${T('wiatr')} ${format(FW.race_wind_speed)} m/s` : ''].filter(Boolean).join(' · '))}</small>`);
    const rest = `<div class="f1-grid">${lv.live ? plan : ''}${tile('trophy','Ostatni wyścig',where,podium)}${standings('d')}${standings('t')}${wx}${about}</div>`;
    this.setHTML('#f1-body',`${top}<div class="block">${lv.live ? '' : `<div class="f1-grid">${plan}${tile('flag','Szybko',`${A.circuit_country ? country(A.circuit_country) : ''}`,`<div class="device-rows"><div><span>${T('Kwalifikacje')}</span><b>${A.qualifying_start ? `${escapeHTML(this.f1Day(Date.parse(A.qualifying_start)))} ${escapeHTML(this.time(Date.parse(A.qualifying_start)))}` : '—'}</b></div><div><span>${T('Wyścig')}</span><b>${A.race_start ? `${escapeHTML(this.f1Day(Date.parse(A.race_start)))} ${escapeHTML(this.time(Date.parse(A.race_start)))}` : '—'}</b></div><div><span>${T('Okrążenia')}</span><b>${escapeHTML(A.scheduled_laps || '—')}</b></div><div><span>${T('Tryb bez spoilerów')}</span><b>${T(spoil ? 'włączony' : 'wyłączony')}</b></div></div>`)}</div>`}</div><div class="block">${rest}</div>`);
  }

  /* ---------- zakładka Kosze (Waste Collection Schedule, jak w Home Pulse) ---------- */
  binSource() {
    const B = this.config?.bins || {}, S = this._hass?.states || {}, R = this._hass?.entities || {};
    const wcs = id => R[id]?.platform === 'waste_collection_schedule' || /waste_collection_schedule/.test(id);
    const calendar = B.calendar || Object.keys(S).find(id=>id.startsWith('calendar.') && wcs(id)) || '';
    const sensor = B.sensor || (S['sensor.waste_collection_schedule_bin'] ? 'sensor.waste_collection_schedule_bin' : '');
    const manual = Array.isArray(B.schedule) ? B.schedule.filter(x=>x && typeof x === 'object') : [];
    return (calendar && S[calendar]) || (sensor && S[sensor]) || manual.length ? {calendar:S[calendar] ? calendar : '',sensor:S[sensor] ? sensor : '',manual} : null;
  }
  binKind(text) {
    const txt = String(text || '').trim(), src = this.binSource();
    const types = this.config?.bins?.types || BIN_PRESETS.find(([re])=>re.test(src?.calendar || ''))?.[1] || {};
    const k = BIN_KIND.find(([re])=>re.test(txt));
    if (k) return {key:k[1],adj:T(k[1]),name:T('{c} kosz',{c:cap(T(k[1]))}),col:k[2],type:T(types[k[1]] || '')};
    const w = BIN_BY_NAME.find(([re])=>re.test(txt));
    return {key:txt.toLowerCase(),adj:txt,name:txt,col:w ? w[2] : '#8a8a8a',type:w ? T(w[1]) : ''};
  }
  binManual(item,i) {
    const text = String(item.color || item.colour || item.name || '');
    const kind = this.binKind(text), known = BIN_KIND.some(([re])=>re.test(text));
    const hex = /^#[0-9a-f]{3,8}$/i.test(String(item.color || '')) ? item.color : null;
    const named = item.name ? String(item.name) : null;
    return {key:`manual-${i}`,adj:known ? kind.adj : named || kind.adj,name:named || kind.name,col:hex || kind.col,type:item.type != null ? String(item.type) : kind.type};
  }
  dayKey(d) { return new Date(d).toLocaleDateString('en-CA',{timeZone:this._hass?.config?.time_zone}); }
  dayDiff(k) { const n = s => { const [y,m,d] = s.split('-').map(Number); return Date.UTC(y,m - 1,d) / 864e5; }; return n(k) - n(this.dayKey(Date.now())); }
  async loadBinCalendar() {
    const src = this.binSource();
    if (!src?.calendar || !this._hass?.callApi || this.binBusy || (this.binCal && this.binCalFor === src.calendar && Date.now() - this.binCalAt < 30 * 60e3)) return;
    this.binBusy = true;
    try {
      const a = new Date(); a.setHours(0,0,0,0);
      const b = new Date(a.getTime() + 70 * 864e5);
      this.binCal = await this._hass.callApi('GET',`calendars/${src.calendar}?start=${encodeURIComponent(a.toISOString())}&end=${encodeURIComponent(b.toISOString())}`);
      this.binCalFor = src.calendar;
    } catch { this.binCal = this.binCal || []; }
    this.binCalAt = Date.now();
    this.binBusy = false;
    this.queue();
  }
  binCollections() {
    const src = this.binSource();
    if (!src) return [];
    void this.loadBinCalendar();
    const by = {};
    const add = (k,txt) => { if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) return; String(txt).split(',').map(x=>x.trim()).filter(Boolean).forEach(t=>{ const b = this.binKind(t); (by[k] ||= {})[b.key] = b; }); };
    const s = this.row(src.sensor);
    if (s) Object.entries(s.attrs).forEach(([k,v])=>add(k,v));
    if (Array.isArray(this.binCal) && this.binCalFor === src.calendar) this.binCal.forEach(ev=>{ const st = ev.start?.date || ev.start?.dateTime; if (st) add(String(st).slice(0,10),ev.summary || ''); });
    // własny harmonogram (bins.schedule): kolor, rodzaj, pierwszy odbiór i co ile dni, albo lista dat
    src.manual.forEach((item,i)=>{
      const b = this.binManual(item,i), days = [];
      const ymd = v => { const m = String(v ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? Date.UTC(+m[1],+m[2] - 1,+m[3]) : null; };
      const key = t => new Date(t).toISOString().slice(0,10);
      const step = Math.round(Number(item.every) || Number(item.weeks) * 7 || 0);
      const first = ymd(item.start), today = ymd(this.dayKey(Date.now()));
      if (first != null && step > 0) {
        const skip = Math.max(0,Math.ceil((today - first) / 864e5 / step));
        for (let n = skip; days.length < 12; n++) { const t = first + n * step * 864e5; if (t - today > 70 * 864e5) break; days.push(key(t)); }
      }
      (Array.isArray(item.dates) ? item.dates : []).map(ymd).filter(t=>t != null).forEach(t=>days.push(key(t)));
      days.forEach(k=>{ (by[k] ||= {})[b.key] = b; });
    });
    return Object.keys(by).filter(k=>this.dayDiff(k) >= 0).sort().map(k=>({k,n:this.dayDiff(k),bins:Object.values(by[k])}));
  }
  binRel(n) { return n === 0 ? T('dziś') : n === 1 ? T('jutro') : T('za {n} dni',{n}); }
  binDate(k,opts) { const [y,m,d] = k.split('-').map(Number); return new Date(Date.UTC(y,m - 1,d,12)).toLocaleDateString(loc(),{...opts,timeZone:'UTC'}); }
  binWhat(bins) { return bins.length > 1 ? cap(andList(bins.map(b=>b.adj))) : bins[0].name; }
  binDots(bins) { return `<span class="bin-dots">${bins.map(b=>`<span class="bin-dot" style="--bin:${b.col}">${icon('bin')}</span>`).join('')}</span>`; }

  renderBins() {
    const src = this.binSource(), list = this.binCollections(), x = list[0];
    const sourceName = !src?.calendar && !src?.sensor ? T('Własny harmonogram') : String(this.row(src?.calendar)?.attrs.friendly_name || 'Waste Collection Schedule').replace(/^Waste Collection Schedule\s*/i,'') || 'Waste Collection Schedule';
    this.$('#bins-intro').textContent = x ? `${T('Najbliższy odbiór {r}',{r:this.binRel(x.n)})} · ${sourceName}` : sourceName;
    if (!x) { this.setHTML('#bins-body',`<p class="empty">${T(src?.calendar && (this.binBusy || !this.binCalAt) ? 'Wczytuję harmonogram odbiorów…' : 'Kalendarz nie ma żadnych przyszłych odbiorów.')}</p>`); return; }
    const types = bins => cap(andList(bins.map(b=>b.type).filter(Boolean)));
    const [y,m,d] = x.k.split('-').map(Number);
    const eve = new Date(Date.UTC(y,m - 1,d - 1,12)).toLocaleDateString(loc(),{weekday:'long',timeZone:'UTC'});
    const tip = x.n === 0 ? T('Odbiór jest dziś. Kosze powinny już stać przy drodze.') : x.n === 1 ? T('Wystaw dziś wieczorem.') : LANG === 'en' ? `Put them out on ${eve} evening.` : `Wystaw ${W_ACC[eve] || 'dzień wcześniej'} wieczorem.`;
    const next = `<article class="tile bins-next${x.n <= 1 ? ' active' : ''}"><div class="bin-art">${x.bins.map((b,i)=>binArt(b,i)).join('')}</div><div class="card-body">
      <span class="label">${icon('bin')}${T('Co wystawić jako następne')} · ${escapeHTML(this.binRel(x.n))}</span>
      <span class="big-value">${escapeHTML(this.binWhat(x.bins))}</span>${types(x.bins) ? `<span class="bin-type">${escapeHTML(types(x.bins))}</span>` : ''}
      <small>${escapeHTML(cap(this.binDate(x.k,{weekday:'long',day:'numeric',month:'long'})))}</small><span class="bin-tip">${icon('clock')}${escapeHTML(tip)}</span></div></article>`;
    const kinds = {};
    list.forEach(d=>d.bins.forEach(b=>{ if (!kinds[b.key]) kinds[b.key] = {b,d}; }));
    const per = `<div class="bin-rows">${Object.values(kinds).map(({b,d})=>`<div class="bin-row${d.n <= 1 ? ' soon' : ''}">${this.binDots([b])}<div><b>${escapeHTML(b.name)}</b><small>${escapeHTML([b.type ? cap(b.type) : '',cap(this.binDate(d.k,{weekday:'long',day:'numeric',month:'long'}))].filter(Boolean).join(' · '))}</small></div><span class="when">${escapeHTML(this.binRel(d.n))}</span></div>`).join('')}</div>`;
    const later = list.slice(1,9);
    const upcoming = later.length ? `<div class="bin-rows">${later.map(d=>`<div class="bin-row"><span class="bin-date"><b>${escapeHTML(this.binDate(d.k,{day:'numeric'}))}</b><small>${escapeHTML(this.binDate(d.k,{month:'short'}).replace('.',''))}</small></span>${this.binDots(d.bins)}<div><b>${escapeHTML(this.binWhat(d.bins))}</b><small>${escapeHTML([types(d.bins),cap(this.binDate(d.k,{weekday:'long'})),this.binRel(d.n)].filter(Boolean).join(' · '))}</small></div></div>`).join('')}</div>` : `<p class="empty">${T('Kolejne terminy pojawią się, gdy rada je opublikuje.')}</p>`;
    this.setHTML('#bins-body',`${next}${this.block('Najbliższe terminy dla każdego kosza','bin',per)}${this.block('Nadchodzące odbiory','clock',upcoming)}<p class="note-line">${T('Źródło')}: ${escapeHTML(sourceName)}</p>`);
  }

  /* ---------- zakładka Pogoda ---------- */
  weatherRow() {
    const r = this.row(this.config?.weather_entity);
    return r?.domain === 'weather' ? r : this.getModel().rows.find(x=>x.domain === 'weather' && available(x));
  }
  isNight() {
    const sun = this.row('sun.sun');
    if (sun && available(sun)) return sun.state === 'below_horizon';
    const h = this.hour();
    return h < 7 || h >= 19;
  }
  subscribeForecast(w) {
    const conn = this._hass?.connection;
    if (!w || !conn?.subscribeMessage || this.fcFor === w.id) return;
    this.unsubscribeForecast();
    this.fcFor = w.id;
    this.forecast = {};
    const sf = Number(w.attrs.supported_features) || 0;
    this.fcUnsubs = [sf & 2 && 'hourly',sf & 1 && 'daily'].filter(Boolean).map(type=>
      Promise.resolve(conn.subscribeMessage(ev=>{ this.forecast[type] = ev?.forecast || []; this.queue(); },{type:'weather/subscribe_forecast',entity_id:w.id,forecast_type:type})).catch(()=>null));
  }
  unsubscribeForecast() {
    (this.fcUnsubs || []).forEach(p=>p.then(u=>{ if (typeof u === 'function') u(); }).catch(()=>{}));
    this.fcUnsubs = [];
    this.fcFor = null;
  }

  renderWeather() {
    const w = this.weatherRow();
    if (!w) { this.setHTML('#weather-body',`<p class="empty">${T('Brak encji pogody w Home Assistant.')}</p>`); return; }
    this.subscribeForecast(w);
    const a = w.attrs, unit = a.temperature_unit || this.tempUnit(), night = this.isNight();
    const tz = this._hass?.config?.time_zone;
    const now = Date.now();
    const daily = this.forecast?.daily || [], hourly = (this.forecast?.hourly || []).filter(h=>Date.parse(h.datetime) + 3600e3 > now).slice(0,24);
    // met.no wylicza stan główny inaczej niż prognozę godzinową; gdy ta godzina ma opady, a stan ich nie ma, scena pokazuje opady z prognozy
    const wet = new Set(['rainy','pouring','snowy','snowy-rainy','hail','lightning','lightning-rainy']);
    const hourNow = hourly.find(h=>Date.parse(h.datetime) <= now);
    const fromHour = Boolean(hourNow && wet.has(hourNow.condition) && !wet.has(w.state));
    const base = fromHour ? hourNow.condition : w.state;
    const cond = base === 'sunny' && night ? 'clear-night' : base;
    const label = weatherLabels[cond] ? T(weatherLabels[cond]) : stl(cond);
    const today = daily[0];
    const deg = v => v == null || !Number.isFinite(Number(v)) ? '—' : `${format(v)}°`;
    const dir = Number.isFinite(Number(a.wind_bearing)) ? (LANG === 'en' ? windDirsEn : windDirs)[Math.round(Number(a.wind_bearing) / 45) % 8] : '';
    const chip = (g,t) => `<span class="state-chip">${icon(g)}${escapeHTML(t)}</span>`;
    const date = new Intl.DateTimeFormat(loc(),{weekday:'long',day:'numeric',month:'long',timeZone:tz}).format(new Date());
    this.$('#weather-intro').textContent = `${label}, ${format(a.temperature,unit)}${a.wind_speed != null ? ` · ${T('wiatr')} ${format(a.wind_speed,a.wind_speed_unit || 'km/h')}${dir ? ` ${T('z kierunku {d}',{d:dir})}` : ''}` : ''}`;
    const hero = `<div class="weather-hero" data-night="${night}"><div class="wx-copy"><span class="date">${escapeHTML(date)}</span><span class="wx-temp">${deg(a.temperature)}</span><span class="wx-cond">${escapeHTML(label)}</span>${fromHour ? `<small class="note-line">${escapeHTML(`${T('wg prognozy na tę godzinę')}${Number(hourNow.precipitation) > 0 ? ` · ${format(hourNow.precipitation,'mm')}` : ''}`)}</small>` : ''}
      <div class="chips">${today ? chip('thermo',`${deg(today.temperature)} / ${deg(today.templow)}`) : ''}${a.humidity != null ? chip('water',`${format(a.humidity)}%`) : ''}${a.wind_speed != null ? chip('wind',`${format(a.wind_speed,a.wind_speed_unit || 'km/h')}`) : ''}</div></div>
      ${weatherScene(cond,night,Number(a.temperature))}</div>`;
    const row = (k,v) => `<div><span>${escapeHTML(k)}</span><b>${escapeHTML(v)}</b></div>`;
    const tile = (g,title,value,rows,extra = '') => `<article class="tile"><span class="label">${icon(g)}${escapeHTML(T(title))}</span>${extra}<div class="card-body"><span class="big-value">${escapeHTML(value)}</span>${rows ? `<div class="device-rows">${rows}</div>` : ''}</div></article>`;
    const sun = this.row('sun.sun'), at = v => v && !Number.isNaN(Date.parse(v)) ? this.time(Date.parse(v)) : '—';
    const compass = Number.isFinite(Number(a.wind_bearing)) ? `<svg class="compass" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="22" fill="none" stroke="currentColor" stroke-width="1"/><path d="M26 6v4M26 42v4M6 26h4M42 26h4" stroke="currentColor" stroke-width="1"/><path class="needle" style="transform:rotate(${(Number(a.wind_bearing) + 180).toFixed(0)}deg)" d="M26 10l5 16h-10z"/></svg>` : '';
    const stats = `<div class="wx-stats">
      ${tile('wind','Wiatr',a.wind_speed != null ? format(a.wind_speed,a.wind_speed_unit || 'km/h') : '—',dir ? row(T('Kierunek'),`${T('z kierunku {d}',{d:dir})} (${format(a.wind_bearing)}°)`) : '',compass)}
      ${tile('water','Wilgotność',a.humidity != null ? `${format(a.humidity)}%` : '—',a.dew_point != null ? row(T('Punkt rosy'),deg(a.dew_point)) : '')}
      ${tile('sensor','Ciśnienie',a.pressure != null ? format(a.pressure,a.pressure_unit || 'hPa') : '—',[a.cloud_coverage != null && row(T('Zachmurzenie'),`${format(a.cloud_coverage)}%`),a.uv_index != null && row(T('Indeks UV'),format(a.uv_index)),a.visibility != null && row(T('Widoczność'),format(a.visibility,a.visibility_unit || 'km'))].filter(Boolean).join(''))}
      ${tile(night ? 'moon' : 'sun','Słońce',sun ? (night ? `${T('wschód')} ${at(sun.attrs.next_rising)}` : `${T('zachód')} ${at(sun.attrs.next_setting)}`) : '—',sun ? row(T('Wschód'),at(sun.attrs.next_rising)) + row(T('Zachód'),at(sun.attrs.next_setting)) : '')}</div>`;
    let hours = '';
    if (hourly.length) {
      const temps = hourly.map(h=>Number(h.temperature)), min = Math.min(...temps), span = (Math.max(...temps) - min) || 1, step = 84;
      const pts = temps.map((t,i)=>[i * step + 37,52 - (t - min) / span * 40]);
      const d = pts.map(([x,y],i)=>`${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
      const fmt = new Intl.DateTimeFormat(loc(),{hour:'2-digit',minute:'2-digit',timeZone:tz});
      hours = `<div class="hours"><div class="hours-track" style="width:${hourly.length * step - 10}px"><svg class="temp-curve" width="${hourly.length * step - 10}" viewBox="0 0 ${hourly.length * step - 10} 64"><path class="line" d="${d}"/>${pts.map(([x,y])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/>`).join('')}</svg>
        <div class="hour-row">${hourly.map((h,i)=>`<div class="hour${i === 0 ? ' now' : ''}"><time>${i === 0 ? T('Teraz') : fmt.format(new Date(h.datetime))}</time>${icon(weatherGlyph[h.condition] || 'weather')}<b>${deg(h.temperature)}</b><small>${Number(h.precipitation) > 0 ? format(h.precipitation,'mm') : Number(h.precipitation_probability) > 0 ? `${format(h.precipitation_probability)}%` : ''}</small></div>`).join('')}</div></div></div>`;
    }
    let days = '';
    if (daily.length) {
      const list = daily.slice(0,7), lo = Math.min(...list.map(d=>Number(d.templow ?? d.temperature))), hi = Math.max(...list.map(d=>Number(d.temperature))), span = (hi - lo) || 1;
      const name = (d,i) => i === 0 ? T('Dziś') : i === 1 ? T('Jutro') : new Intl.DateTimeFormat(loc(),{weekday:'long',timeZone:tz}).format(new Date(d.datetime)).replace(/^./,ch=>ch.toUpperCase());
      days = `<div class="days">${list.map((d,i)=>{ const l = Number(d.templow ?? d.temperature), h = Number(d.temperature);
        return `<div class="day"><b>${escapeHTML(name(d,i))}</b>${icon(weatherGlyph[d.condition] || 'weather')}<span class="muted label-col">${escapeHTML(weatherLabels[d.condition] ? T(weatherLabels[d.condition]) : d.condition || '')}</span><span class="rain">${Number(d.precipitation) > 0 ? format(d.precipitation,'mm') : ''}</span><span class="lo">${deg(d.templow)}</span><span class="range"><i style="left:${((l - lo) / span * 100).toFixed(1)}%;right:${(100 - (h - lo) / span * 100).toFixed(1)}%"></i></span><b>${deg(d.temperature)}</b></div>`; }).join('')}</div>`;
    }
    const wait = `<p class="empty">${T('Czekam na prognozę z Home Assistant…')}</p>`;
    this.setHTML('#weather-body',`${hero}<div class="block">${stats}</div>${this.block('Najbliższe godziny','clock',hours || wait)}${this.block('Kolejne dni','weather',days || wait)}<p class="note-line">${escapeHTML(a.attribution || '')}</p>`);
  }

  /* ---------- zakładka Ogrzewanie (jak w Home Pulse: kocioł, obiegi, tryby, czas pracy) ---------- */
  heatCfg() { const p = this.config?.heating_page || (this.getModel() && this.auto?.heating_page); return p && p.source ? p : null; }
  heatRooms() { return Array.isArray(this.heatCfg()?.rooms) ? this.heatCfg().rooms : []; }
  heatBoilerId() { const p = this.heatCfg(); return p.boiler && this.row(p.boiler) ? p.boiler : p.source; }
  heatOnState(domain,state,attrs = {}) {
    if (['unknown','unavailable','',undefined,null].includes(state)) return false;
    if (domain === 'climate' || domain === 'water_heater') return attrs.hvac_action === 'heating';
    if (domain === 'sensor' || domain === 'number') { const n = Number(state); return Number.isFinite(n) ? n > 0 : /^(on|heating|burning|true)$/i.test(state); }
    return state === 'on';
  }
  heatOn() { const r = this.row(this.heatBoilerId()); return Boolean(r) && this.heatOnState(r.domain,r.state,r.attrs); }
  heatRoomState(r) {
    const p = this.heatCfg(), row = this.row(r.climate), a = row?.attrs || {}, main = r.climate === p.source;
    const valve = a.valve_open_percent != null ? Number(a.valve_open_percent) : null;
    const wants = Boolean(row) && row.state !== 'off' && (main ? a.hvac_action === 'heating' : a.hvac_action === 'heating' || valve > 0);
    const boiler = this.heatOn(), flow = boiler && (main || wants), v = valve != null ? `${valve}% ` : '';
    const note = !available(row) ? T('brak połączenia') : row.state === 'off' ? T('wyłączone') : main ? T(boiler ? 'grzeje – kocioł pracuje' : 'temperatura osiągnięta')
      : wants && boiler ? T('zawór {v}otwarty – grzeje',{v}) : wants ? T('zawór {v}otwarty – czeka na kocioł',{v}) : T('zawór zamknięty');
    return {row,main,wants,flow,note};
  }
  heatModesCfg() { const p = this.heatCfg(); return {comfort:{main:22,rooms:21,...p.comfort},eco:{main:18,rooms:18,...p.eco},boost:Number(p.boost) || 1}; }
  heatPresets(id) { return this.row(id)?.attrs.preset_modes || []; }
  heatModes() {
    const pr = this.heatPresets(this.heatCfg().source);
    return [['auto','Auto','clock'],['comfort','Komfort','sun'],['eco','Eco','moon'],['boost','Boost','fire']].filter(([k])=>k !== 'auto' || (pr.includes('none') && pr.includes('eco')));
  }
  heatCurrent() {
    const p = this.heatCfg(), M = this.heatModesCfg(), n = this.row(p.source);
    if (!n) return null;
    const near = (a,b) => Math.abs(Number(a) - Number(b)) < .05;
    const others = this.heatRooms().filter(r=>r.climate !== p.source).map(r=>this.row(r.climate)).filter(Boolean);
    const all = t => others.length && others.every(row=>near(row.attrs.temperature,t));
    const pr = this.heatPresets(p.source);
    const ecoMain = pr.includes('eco') ? n.attrs.preset_mode === 'eco' : near(n.attrs.temperature,M.eco.main);
    if (ecoMain && all(M.eco.rooms)) return 'eco';
    if (near(n.attrs.temperature,M.comfort.main) && all(M.comfort.rooms) && n.attrs.preset_mode !== 'eco') return 'comfort';
    if (pr.includes('none') && n.attrs.preset_mode !== 'eco') return 'auto';
    return null;
  }
  heatPlan(k) {
    const p = this.heatCfg(), M = this.heatModesCfg(), src = p.source, srcN = p.source_name || T('termostat główny');
    const others = this.heatRooms().filter(r=>r.climate !== src), pr = this.heatPresets(src);
    const none = pr.includes('none') ? [['set_preset_mode',{entity_id:src,preset_mode:'none'}]] : [];
    const set = (id,t) => ['set_temperature',{entity_id:id,temperature:t}];
    if (k === 'auto') return [T('Auto: {s} wraca do swojego harmonogramu. Pokoje bez zmian.',{s:srcN}),none];
    if (k === 'comfort') return [T('Komfort: {s} {a}°, pozostałe pokoje {b}°.',{s:srcN,a:M.comfort.main,b:M.comfort.rooms}),[...none,set(src,M.comfort.main),...others.map(r=>set(r.climate,M.comfort.rooms))]];
    if (k === 'eco') return [T('Eco: {s} oszczędnie, pozostałe pokoje {b}°.',{s:srcN,b:M.eco.rooms}),[pr.includes('eco') ? ['set_preset_mode',{entity_id:src,preset_mode:'eco'}] : set(src,M.eco.main),...others.map(r=>set(r.climate,M.eco.rooms))]];
    return [T('Boost: wszystkie pokoje +{b}° od obecnej zadanej, bez automatycznego powrotu.',{b:M.boost}),[...none,...this.heatRooms().map(r=>{ const t = this.row(r.climate)?.attrs.temperature; return t != null ? set(r.climate,Math.round((Number(t) + M.boost) * 2) / 2) : null; }).filter(Boolean)]];
  }
  // tryb zmienia termostaty dopiero po drugim stuknięciu (jak w Home Pulse)
  async heatMode(k) {
    if (this.heatArm !== k) {
      this.heatArm = k;
      clearTimeout(this.heatArmTimer);
      this.heatArmTimer = setTimeout(()=>{ this.heatArm = null; this.queue(); },6000);
      return this.queue();
    }
    this.heatArm = null;
    clearTimeout(this.heatArmTimer);
    const [text,calls] = this.heatPlan(k);
    let ok = true;
    for (const [service,data] of calls) ok = await this.call(`heat:${k}`,'climate',service,data,'Termostat nie przyjął zmiany.') && ok;
    if (ok) this.toast(T('{m} ustawiony',{m:text.split(':')[0]}));
  }
  async heatHistory() {
    if (!this._hass?.callWS || Date.now() - (this.heatHistAt || 0) < 300000) return;
    this.heatHistAt = Date.now();
    const id = this.heatBoilerId(), domain = id.split('.')[0];
    const start = new Date(); start.setHours(0,0,0,0);
    try {
      const res = await this._hass.callWS({type:'history/history_during_period',start_time:start.toISOString(),entity_ids:[id],minimal_response:false,no_attributes:false,significant_changes_only:false});
      const list = res?.[id] || [];
      let ms = 0;
      list.forEach((p,i)=>{
        const t0 = Math.max(start.getTime(),(p.lu ?? p.lc) * 1000), t1 = i + 1 < list.length ? (list[i + 1].lu ?? list[i + 1].lc) * 1000 : Date.now();
        if (this.heatOnState(domain,p.s,p.a || {})) ms += Math.max(0,t1 - t0);
      });
      this.heatRunMs = list.length ? ms : null;
      this.queue();
    } catch { this.heatRunMs = null; }
  }

  renderHeating() {
    const p = this.heatCfg(), on = this.heatOn(), src = this.row(p.source), sa = src?.attrs || {}, srcN = p.source_name || src?.name || T('Termostat');
    void this.heatHistory();
    const unit = this.tempUnit();
    const weather = this.getModel().rows.find(row=>row.domain === 'weather' && available(row) && (!this.config?.weather_entity || row.id === this.config.weather_entity));
    const out = p.outdoor ? this.reading(p.outdoor) : weather ? Number(weather.attrs.temperature) : null;
    const mode = !src ? '—' : T(src.state === 'off' ? 'Wyłączone' : sa.preset_mode === 'eco' ? 'Eco' : 'Ogrzewanie');
    const chip = (g,t) => `<span class="state-chip">${icon(g)}${escapeHTML(t)}</span>`;
    this.$('#heating-intro').textContent = [p.boiler_name,srcN].filter(Boolean).join(' · ') + ` · ${T('instalacja na żywo')}`;
    const rooms = this.heatRooms(), states = rooms.map(r=>this.heatRoomState(r)), open = states.filter(x=>x.flow).length;
    const row = (k,v) => `<div><span>${escapeHTML(k)}</span><b>${escapeHTML(v)}</b></div>`;
    const boiler = `<article class="tile boiler${on ? ' heating active' : ''}"><span class="label">${icon('fire')}${escapeHTML(p.boiler_name || T('Kocioł'))}</span><div class="card-body">
      ${boilerArt}<span class="big-value">${T(on ? 'Grzeje' : 'Czuwa')}</span>
      <div class="device-rows">${row(srcN,`${src ? format(sa.current_temperature,'°') : '—'} → ${src && sa.temperature != null ? format(sa.temperature,'°') : '—'}`)}${row(T('Żądanie ciepła'),T(on ? 'TAK – grzeje' : 'Nie – czuwa'))}${row(T('Aktywne obiegi'),`${open} / ${rooms.length}`)}${row(T('Pompa obiegowa'),T(on ? 'pracuje' : 'stop'))}</div></div></article>`;
    const roomTiles = rooms.map((r,i)=>{
      const x = states[i], fl = this.row(r.floor_climate), flOn = Boolean(fl) && available(fl) && fl.state !== 'off';
      const ft = r.floor ? this.reading(r.floor) : fl?.attrs.current_temperature != null ? Number(fl.attrs.current_temperature) : null;
      const hum = this.reading(r.humidity) ?? (x.row?.attrs.current_humidity != null ? Number(x.row.attrs.current_humidity) : null);
      const sub = r.sub ?? (x.main ? p.source_name || T('termostat główny') : T('grzejnik'));
      return `<article class="tile heat-room${x.flow ? ' flow active' : ''}${x.wants && !x.flow ? ' wait' : ''}"><span class="label">${icon(roomIcon(r.name))}${escapeHTML(r.name)}<small>${escapeHTML(sub)}</small></span><div class="card-body">
        ${available(x.row) ? this.climateBody(x.row) : '<span class="value">—</span>'}
        <span class="heat-note">${escapeHTML(x.note)}${hum != null ? ` · ${T('wilgotność')} ${format(hum)}%` : ''}</span>
        ${ft != null || fl ? `<span class="floor${flOn ? ' on' : ''}">${icon('thermo')}${T('Podłogówka')}${ft != null ? ` ${escapeHTML(format(ft,unit))}` : ''} · ${T(flOn ? 'włączona' : 'wył.')}</span>` : ''}</div></article>`;
    }).join('') || `<p class="empty">${T('Dodaj pokoje w „heating_page → rooms”.')}</p>`;
    const gasKwh = this.row(p.gas_kwh || this.config?.energy_page?.gas_today_kwh), gasCost = this.row(p.gas_cost || this.config?.energy_page?.gas_cost);
    const cur = this.heatCurrent();
    const modes = this.heatModes().map(([k,n,g])=>`<button class="preset${this.heatArm === k ? ' arm' : ''}" data-act="heat-mode" data-mode="${k}" aria-pressed="${cur === k}" ${this.pending.has(`heat:${k}`) ? 'disabled' : ''}>${icon(g)}${T(n)}</button>`).join('');
    const note = this.heatArm ? `${this.heatPlan(this.heatArm)[0]} ${T('Stuknij ponownie, aby ustawić.')}` : T('Tryb zmienia termostaty dopiero po drugim stuknięciu.');
    const m = this.heatRunMs != null ? Math.round(this.heatRunMs / 60000) : null;
    const foot = `<div class="heat-foot">
      <article class="tile"><span class="label">${icon('fire')}${T('Gaz dziś')}</span><div class="card-body"><span class="big-value">${gasKwh ? escapeHTML(this.stateText(gasKwh)) : '—'}</span>${gasCost ? `<small>${T('koszt')} ${escapeHTML(money(gasCost))}</small>` : ''}</div></article>
      <article class="tile"><span class="label">${icon('thermo')}${T('Tryb ogrzewania')}</span><div class="card-body"><div class="modes">${modes}</div><p class="note-line">${escapeHTML(note)}</p></div></article>
      <article class="tile"><span class="label">${icon('clock')}${T('Praca kotła dziś')}</span><div class="card-body"><span class="big-value">${m == null ? '—' : `${Math.floor(m / 60)} h ${m % 60} min`}</span><small>${T(p.boiler && this.row(p.boiler) ? 'według kotła' : 'według żądań termostatu')}</small></div></article></div>`;
    const top = `<div class="heat-top">${chip('weather',`${T('Na zewnątrz')} ${out != null && Number.isFinite(out) ? format(out,unit) : '—'}`)}${chip('thermo',`${T('Tryb systemu')}: ${mode}`)}${chip('fire',`${T('Kocioł')}: ${T(on ? 'grzeje' : 'czuwa')}`)}</div>`;
    this.setHTML('#heating-body',`${top}<div class="heat-grid">${boiler}<div class="heat-rooms">${roomTiles}</div></div>${foot}`);
  }

  /* ---------- zakładka Ustawienia (jak w Home Pulse: wyjście do HA tylko stąd) ---------- */
  renderSettings(rooms,rows) {
    const user = this._hass?.user;
    const admin = Boolean(user?.is_admin);
    const online = Boolean(this._hass && this._hass.connected !== false);
    const lights = rows.filter(row=>this.isLight(row)).length;
    const devices = rooms.reduce((n,room)=>n + (room.cfg?.devices?.length || 0),0);
    const here = location.pathname;
    const mode = (key,label,glyph) => `<button class="preset" data-act="theme-mode" data-mode="${key}" aria-pressed="${this.themeMode === key}">${icon(glyph)}${T(label)}</button>`;
    const row = (k,v) => `<div><span>${escapeHTML(T(k))}</span><b>${escapeHTML(v)}</b></div>`;
    const tile = (glyph,title,body) => `<article class="tile"><span class="label">${icon(glyph)}${escapeHTML(T(title))}</span><div class="card-body">${body}</div></article>`;
    const pref = this.langPref();
    const lang = (key,label) => `<button class="preset" data-act="lang-mode" data-mode="${key}" aria-pressed="${pref === key}">${icon(key === 'auto' ? 'settings' : 'spark')}${label}</button>`;
    const screen = tile('sun','Ten ekran',`<p class="note-line">${T('Motyw i język zapamiętuje to urządzenie. Inne ekrany mają własny wybór.')}</p><div class="modes">${mode('light','Jasny','sun')}${mode('dark','Ciemny','moon')}${mode('auto','Jak w systemie','spark')}</div>
      <p class="note-line">${T('Język')}</p><div class="modes">${lang('auto',T('Jak w Home Assistant'))}${lang('pl','Polski')}${lang('en','English')}</div>`);
    const dash = tile('rooms','Pulpit',`<div class="device-rows">${row('Pokoje',String(rooms.length))}${row('Światła',String(lights))}${row('Urządzenia',String(devices))}</div>
      <p class="note-line">${T(admin ? 'Pokoje i urządzenia zmieniasz w konfiguracji karty (lista „rooms”).' : 'Pulpit może zmieniać tylko administrator.')}</p>
      <div class="device-actions">${admin ? `<button class="mini" data-act="ha-nav" data-to="${escapeHTML(here)}?disable_km&edit=1">${icon('arrow')}${T('Edytuj pulpit')}</button>` : ''}<button class="mini" data-act="ha-nav" data-to="${escapeHTML(here)}?disable_km">${icon('arrow')}${T('Pokaż menu HA')}</button></div>`);
    const ha = tile('settings','Home Assistant',`<div class="device-rows">${row('Konto',`${user?.name || '—'} · ${T(admin ? 'administrator' : 'użytkownik')}`)}${row('Połączenie',T(online ? 'Połączono' : 'Brak połączenia'))}${row('Wersja HA',this._hass?.config?.version || '—')}</div>
      <p class="note-line">${T('Urządzenia, integracje, użytkownicy i pozostałe pulpity ustawia się w Home Assistant.')}</p>
      <div class="device-actions"><button class="mini" data-act="ha-nav" data-to="/config/dashboard">${icon('settings')}${T('Otwórz ustawienia Home Assistant')}</button></div>`);
    const hidden = this.hiddenTabs();
    const toggles = Object.entries(tabNames).map(([key,name])=>{
      const avail = this.tabAvailable(key), on = avail && !hidden.includes(key);
      return `<div class="f1-row${on ? '' : ' done'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"><path d="${glyphs[{rooms:'rooms',climate:'thermo',heating:'fire',weather:'weather',energy:'bolt',security:'shield',bins:'bin',f1:'flag'}[key]]}"/></svg><div><b>${escapeHTML(T(name))}</b><small>${T(avail ? (on ? 'widoczna w menu' : 'ukryta') : 'brak danych w Home Assistant')}</small></div>
        <button class="toggle" data-act="tab-toggle" data-tab="${key}" aria-pressed="${on}" aria-label="${T(on ? 'Ukryj zakładkę {n}' : 'Pokaż zakładkę {n}',{n:escapeHTML(T(name))})}" ${!avail ? 'disabled' : ''}>${icon('power')}</button></div>`;
    }).join('');
    const tabs = `<article class="tile wide-tile"><span class="label">${icon('rooms')}${T('Zakładki w menu')}</span><div class="card-body"><p class="note-line">${T('Wybierz, które zakładki mają być widoczne na tym urządzeniu. Wybór zapamiętuje przeglądarka, jak motyw. Dla wszystkich urządzeń ustawisz to w konfiguracji karty (<code>hidden_tabs</code>). Dom i Ustawienia są zawsze widoczne.')}</p><div class="tab-toggles">${toggles}</div></div></article>`;
    // gotowa konfiguracja: to, co karta teraz pokazuje, jako YAML do skopiowania (karta nie zapisuje pulpitu sama)
    const eff = this.effective(), m = this.getModel();
    const yaml = `type: custom:aura-domu\n${toYaml(eff)}`;
    const autoParts = [m.autoRooms && T('pokoje'), !this.config?.security_page && !this.config?.security && eff.security_page && T('ochrona'), !this.config?.heating_page && eff.heating_page && T('ogrzewanie')].filter(Boolean);
    const count = eff.rooms.reduce((n,r)=>n + ['lights','climate','media','sensors','cameras'].reduce((k,key)=>k + listOf(r[key]).length,0),0);
    const gen = `<article class="tile wide-tile"><span class="label">${icon('spark')}${T('Gotowa konfiguracja')}</span><div class="card-body">
      <p class="note-line">${autoParts.length ? T('Karta sama dobrała z obszarów Home Assistanta: {parts} ({rooms}, {ents}). Skopiuj YAML, wklej go w edytorze pulpitu (⋮ → Edytuj pulpit → ⋮ → Edytor kodu) w miejsce tej karty, popraw nazwy i dopisz urządzenia.',{parts:escapeHTML(andList(autoParts)),rooms:plN(eff.rooms.length,'pokój','pokoje','pokoi'),ents:plN(count,'encja','encje','encji')}) : T('Pulpit używa Twojej konfiguracji. Poniżej to, co karta z niej odczytała.')}</p>
      <div class="device-actions"><button class="mini" data-act="gen-toggle" aria-pressed="${Boolean(this.showGen)}">${icon('arrow')}${T(this.showGen ? 'Ukryj YAML' : 'Pokaż YAML')}</button><button class="mini" data-act="gen-copy">${icon('spark')}${T('Kopiuj')}</button></div>
      ${this.showGen ? `<pre class="gen-yaml">${escapeHTML(yaml)}</pre>` : ''}</div></article>`;
    this.genYaml = yaml;
    this.setHTML('#settings-body',`<div class="cards">${screen}${dash}${ha}${tabs}${gen}</div>`);
  }

  async copyText(text) {
    try { await navigator.clipboard.writeText(text); this.toast(T('Skopiowano YAML do schowka')); }
    catch {
      // http bez HTTPS: schowek bywa zablokowany, wtedy pokazujemy YAML do zaznaczenia
      this.showGen = true; this.queue();
      this.toast(T('Przeglądarka nie pozwala na schowek. Zaznacz YAML poniżej i skopiuj ręcznie.'));
    }
  }

  // pełne przejście: kiosk-mode zostawia ukryte menu HA po nawigacji bez przeładowania,
  // a po przeładowaniu ustawienia HA otwierają się już z normalnym menu bocznym
  haNav(path) {
    if (path) location.assign(path);
  }

  /* ---------- nawigacja ---------- */
  fromHash(initial = false) {
    const hash = decodeURIComponent(location.hash.replace(/^#/,''));
    const [head,sub] = hash.split('/');
    let page = pageOfHash[head] ?? (initial ? 'home' : null);
    if (page == null) return;
    let area = '';
    if (page === 'rooms' && sub) { page = 'room'; area = sub; }
    if (page === this.ui.page && area === this.ui.area) return;
    this.playEnter = true;
    Object.assign(this.ui,{page,area,event:null});
    if (!initial) this.render();
  }

  navigate(page,area = '') {
    this.resetTileLight();
    this.playEnter = true;
    Object.assign(this.ui,{page,area,event:null});
    clearTimeout(this.eventTimer);
    const hash = page === 'room' ? `#pokoje/${encodeURIComponent(area)}` : pages[page] ? `#${pages[page]}` : '';
    if (location.hash !== hash) history.pushState(null,'',hash || location.pathname + location.search);
    this.render();
    this.scrollToCard();
  }

  // po zmianie zakładki pokaż początek karty, ale nie wsuwaj go pod pasek Home Assistanta
  // (bez kiosk-mode pasek HA ma 56 px i zasłaniał menu karty, więc nie dało się wybrać kolejnej zakładki)
  scrollToCard() {
    const head = parseFloat(getComputedStyle(this).getPropertyValue('--header-height')) || 0;
    if (this.getBoundingClientRect().top >= head) return;
    this.root.style.scrollMarginTop = `${head}px`;
    this.root.scrollIntoView({block:'start',behavior:'instant'});
  }

  click(ev) {
    const button = ev.target.closest('button');
    if (!button) {
      const card = ev.target.closest('[data-card]');
      if (card) this.openGroup(card.dataset.card);
      return;
    }
    const {go,room,group,index,act,id,step} = button.dataset;
    if (go) this.navigate(go);
    if (room) this.navigate('room',room);
    if (group) this.openGroup(group);
    if (index != null && this.events[index]) this.showEvent(this.events[index]);
    if (act === 'theme' || act === 'theme-mode') {
      this.themeMode = act === 'theme' ? (this.theme === 'dark' ? 'light' : 'dark') : button.dataset.mode;
      try { localStorage.setItem('aura-domu:theme',this.themeMode); } catch {}
      this.queue();
    }
    if (act === 'lang-mode') {
      try { if (button.dataset.mode === 'auto') localStorage.removeItem('aura-domu:lang'); else localStorage.setItem('aura-domu:lang',button.dataset.mode); } catch {}
      this.applyLang();
      this.queue();
    }
    if (act === 'ha-nav') this.haNav(button.dataset.to);
    if (act === 'heat-mode') void this.heatMode(button.dataset.mode);
    if (act === 'gen-toggle') { this.showGen = !this.showGen; this.queue(); }
    if (act === 'gen-copy') void this.copyText(this.genYaml);
    if (act === 'tab-toggle') this.toggleTab(button.dataset.tab);
    if (act === 'orb') this.ui.event ? this.showEvent(null) : this.showEvent(this.events[0] || {title:T('Stan domu'),text:this.snapshot.brief,kind:'status'});
    if (act === 'power' && this.snapshot.power) this.showEvent({text:T('Chwilowy pobór mocy domu'),kind:'energy',livePower:true});
    if (act === 'close-event') this.showEvent(null);
    if (act === 'details') this.details(id);
    if (act === 'toggle') void this.toggle(id);
    if (act === 'room') void this.toggleRoom(id,ev);
    if (act === 'all-off') void this.allOff();
    if (act === 'temp') this.stepTemp(id,Number(step));
    if (act === 'scene') void this.activateScene(id);
    if (act === 'press') void this.call(id,'button','press',{entity_id:id},'Urządzenie nie przyjęło polecenia.');
    if (act === 'media') void this.call(`${id}:${button.dataset.cmd}`,'media_player',button.dataset.cmd,{entity_id:id},'Odtwarzacz nie przyjął polecenia.');
    if (act === 'select') void this.call(id,'select','select_option',{entity_id:id,option:button.dataset.option},'Nie udało się zmienić trybu.');
  }

  openGroup(group) { this.navigate({lights:'rooms',climate:'climate',energy:'energy',security:'security'}[group] || 'home'); }

  details(id) {
    if (this.config?.demo) {
      const row = this.row(id);
      if (!row) return;
      this.$('.demo-dialog h2').textContent = row.name;
      this.$('.demo-dialog p').textContent = `${this.stateText(row)} · ${row.id}`;
      this.$('.demo-dialog').showModal();
      return;
    }
    this.dispatchEvent(new CustomEvent('hass-more-info',{detail:{entityId:id},bubbles:true,composed:true}));
  }

  async call(key,domain,service,data,error) {
    this.pending.add(key);
    this.queue();
    try { await this._hass.callService(domain,service,data); return true; }
    catch { this.toast(T(error)); return false; }
    finally { this.pending.delete(key); this.queue(); }
  }

  async toggle(id) {
    const entity = this._hass?.states?.[id];
    const domain = id.split('.')[0];
    if (!toggleDomains.has(domain) || !['on','off'].includes(entity?.state) || this.pending.has(id)) return;
    await this.call(id,domain,entity.state === 'on' ? 'turn_off' : 'turn_on',{entity_id:id},'Home Assistant nie przyjął polecenia.');
  }

  async dim(id,pct) {
    if (!id || !Number.isFinite(pct)) return;
    await this.call(id,'light','turn_on',{entity_id:id,brightness_pct:Math.max(1,Math.min(100,Math.round(pct)))},'Nie udało się zmienić jasności.');
  }

  async toggleRoom(id,ev) {
    const room = this.getModel().rooms.find(item=>item.id === id);
    const key = `room:${id}`;
    if (!room || this.pending.has(key)) return;
    const lights = this.roomLights(room);
    if (!lights.length) return this.navigate('room',id);
    const turnOn = !lights.some(row=>row.state === 'on');
    const ids = (turnOn ? lights : lights.filter(row=>row.state === 'on')).map(row=>row.id);
    const tile = ev?.target.closest('.room');
    if (turnOn && tile) {
      const box = tile.getBoundingClientRect();
      this.igniteAt = {id,x:Math.round(ev.clientX - box.left),y:Math.round(ev.clientY - box.top)};
      setTimeout(()=>{ if (this.igniteAt?.id === id) this.igniteAt = null; },4000);
    }
    await this.call(key,'homeassistant',turnOn ? 'turn_on' : 'turn_off',{entity_id:ids},`${T(turnOn ? 'Nie udało się zapalić świateł' : 'Nie udało się zgasić świateł')}: ${room.name}.`);
  }

  async allOff() {
    const ids = this.getModel().rows.filter(row=>this.isLight(row) && row.state === 'on').map(row=>row.id);
    if (!ids.length || this.pending.has('all-off')) return;
    if (await this.call('all-off','homeassistant','turn_off',{entity_id:ids},'Nie udało się zgasić świateł.')) this.toast(T('Zgaszono {n}',{n:plN(ids.length,'światło','światła','świateł')}));
  }

  stepTemp(id,dir) {
    const entity = this._hass?.states?.[id];
    if (!entity || !dir) return;
    const a = entity.attributes || {};
    const step = a.target_temp_step || (this.tempUnit() === '°F' ? 1 : .5);
    const current = this.targets.get(id)?.value ?? a.temperature;
    if (current == null) return;
    const value = Math.min(a.max_temp ?? 35,Math.max(a.min_temp ?? 7,Math.round((Number(current) + dir * step) / step) * step));
    this.targets.set(id,{value,at:Date.now()});
    this.queue();
    clearTimeout(this.tempTimer);
    this.tempTimer = setTimeout(async ()=>{
      if (!await this.call(`temp:${id}`,'climate','set_temperature',{entity_id:id,temperature:value},'Termostat nie przyjął temperatury.')) { this.targets.delete(id); this.queue(); }
    },650);
  }

  async activateScene(id) {
    if (this.pending.has(id)) return;
    this.lastPreset = {id,at:Date.now()};
    this.queue();
    await this.call(id,'scene','turn_on',{entity_id:id},'Nie udało się włączyć sceny.');
  }

  toast(message) {
    const toast = this.$('.toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(()=>{toast.hidden = true;},3200);
  }

  showEvent(event) {
    this.ui.event = event;
    clearTimeout(this.eventTimer);
    this.queue();
    if (event) this.eventTimer = setTimeout(()=>this.showEvent(null),12000);
  }

  observeEvents(previous,current) {
    const next = [];
    for (const [id,state] of Object.entries(current)) {
      const before = previous[id];
      if (!before || before === state || before.state === state.state || !available(state)) continue;
      const domain = id.split('.')[0];
      const {device_class:deviceClass,friendly_name:name = id} = state.attributes || {};
      const custom = this.config?.event_entities?.[id];
      const detected = domain === 'binary_sensor' && state.state === 'on';
      const priority = (detected && criticalClasses.has(deviceClass)) || domain === 'alarm_control_panel' && state.state === 'triggered';
      const doorbell = (deviceClass === 'doorbell' || /doorbell|dzwonek/.test(fold(id))) && (domain === 'event' || detected);
      const matched = typeof custom?.to === 'string' && fold(state.state) === fold(custom.to);
      const laundry = domain === 'sensor' && /pralka|washer|suszarka|dryer/.test(fold(`${id} ${name}`)) && /(?:^|[_. ])(?:status|state|stan|phase|faza|job_state)(?:[_. ]|$)/.test(fold(`${id} ${name}`)) && /^(finished|complete|completed|program_finished|end|ended|zakonczono|koniec)$/.test(fold(state.state));
      if ((!available(before) && !priority && !(domain === 'event' && doorbell)) || (!priority && !doorbell && !matched && !laundry)) continue;
      const at = Date.parse(state.last_changed) || Date.now();
      const laundryTitle = T(/dryer|suszarka/.test(fold(`${id} ${name}`)) ? 'Suszenie zakończone' : 'Pranie zakończone');
      const title = custom?.title || (doorbell ? T('Dzwonek do drzwi') : laundry ? laundryTitle : name);
      const details = priority ? T('Czujnik wykrył zdarzenie alarmowe') : doorbell ? T('Zarejestrowano naciśnięcie dzwonka') : laundry ? T('Program dobiegł końca') : `${name} · ${stl(state.state)}`;
      const kind = priority ? 'alert' : doorbell ? 'bell' : laundry || custom?.kind === 'laundry' ? 'laundry' : custom?.kind === 'energy' ? 'energy' : 'status';
      next.push({title,text:custom?.text || details,at,priority,kind});
    }
    if (!next.length) return;
    next.sort((a,b)=>b.at-a.at);
    this.events = [...next,...this.events].slice(0,24);
    if (this.ui.page === 'home') this.showEvent(next.find(event=>event.priority) || next[0]);
  }
}

console.info('%c AURA-DOMU %c v0.12.1 ','background:#e68768;color:#fff;border-radius:3px 0 0 3px','background:#20252a;color:#fff;border-radius:0 3px 3px 0');
if (!customElements.get('aura-domu')) {
  customElements.define('aura-domu',AuraDomu);
  window.customCards = window.customCards || [];
  window.customCards.push({type:'aura-domu',name:'Aura domu',description:'Full-screen dashboard: rooms, climate, heating, weather, energy, security, bins and F1 (English / Polski).'});
}
