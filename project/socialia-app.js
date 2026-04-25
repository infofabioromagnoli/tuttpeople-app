/* TuttiPeople app - extracted JS for v3 */
(() => {
  'use strict';

  const PROFILES = window.PROFILES_DATA;
  const LUNA3_B64 = window.LUNA3_B64;
  const LUNA3_SQ  = 'data:image/jpeg;base64,' + window.LUNA3_SELFIE2_SQ;
  const LUNA3_P   = 'data:image/jpeg;base64,' + window.LUNA3_SELFIE2_P;

  // Resolve avatar URL — AI-generated faces via DiceBear (no copyright)
  const avUrl = (p) => {
    if (p.luna === 3) return 'data:image/jpeg;base64,' + LUNA3_B64;
    if (p.luna === 1) return `https://api.dicebear.com/9.x/personas/svg?seed=luna-milano-1&gender=female&backgroundColor=b6e3f4,d1d4f9`;
    if (p.luna === 2) return `https://api.dicebear.com/9.x/personas/svg?seed=luna-torino-2&gender=female&backgroundColor=ffd5dc,ffdfbf`;
    if (p.isMe)      return 'stefano-avatar.png';
    const seed = encodeURIComponent(p.n);
    const gender = p.g === 'women' ? 'female' : 'male';
    const bg = p.g === 'women'
      ? 'ffd5dc,ffdfbf,c0aede,d1d4f9'
      : 'b6e3f4,c0aede,d1d4f9,b6f0d4';
    return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}&gender=${gender}&backgroundColor=${bg}`;
  };

  // ME object - find Stefano in profiles
  const ME = PROFILES.find(p => p.isMe) || { n:'Stefano', c:'Roma', r:'Sviluppatore', g:'men', p:33 };

  // Build LUNAS list from profiles flagged with luna
  const LUNAS = [1,2,3].map(i => {
    const p = PROFILES.find(x => x.luna === i);
    const data = {
      id: 'luna' + i,
      name: p.n, city: p.c, role: p.r,
      av: avUrl(p),
      friendsCount: i===1?328 : i===2?512 : 186,
      mutual: i===1?4 : i===2?1 : 0,
    };
    if (i === 1) {
      data.bio = 'Designer. Caffè, tipografia, libri usati. Milano, ovviamente.';
      data.work = 'Senior Designer presso Studio Forme';
      data.school = 'IED — Istituto Europeo di Design';
      data.from = 'Bergamo';
      data.posts = [
        { t:'Nuova identità per un piccolo torrefattore di quartiere. Finalmente consegnata.\nGrazie a chi ha avuto pazienza con i miei mille tentativi.', w:'2 giorni fa', likes:142, com:27, shares:6,
          mediaSeed: 'milanocafe', mediaWide:true },
        { t:'Helvetica vs. Neue Haas Grotesk: la storia di un equivoco tipografico durato cinquantanni.', w:'1 settimana fa', likes:78, com:13, shares:9 },
        { t:'Milano a novembre è un Pantone 432C.', w:'3 settimane fa', likes:264, com:41, shares:12, mediaSeed:'milanograigia' }
      ];
      data.cover = { seed:'milanocover' };
      data.photos = ['p1','p2','p3','p4','p5','p6'];
    } else if (i === 2) {
      data.bio = 'Studentessa di Lettere. Libri, concerti, gatti.\nVivo a Torino dal 2022.';
      data.work = 'Tirocinio @ Salone del Libro';
      data.school = 'Università degli Studi di Torino';
      data.from = 'Cuneo';
      data.posts = [
        { t:'Finita la sessione. Ora tre giorni di sonno e romanzi russi.', w:'ieri', likes:173, com:34, shares:2 },
        { t:'Stasera concerto ai Murazzi. Se ci siete fatevi sentire.', w:'4 giorni fa', likes:51, com:15, shares:3, mediaSeed:'torinoconcert' },
        { t:'A Torino piove sempre, ma ci si fa il caratterino.', w:'1 settimana fa', likes:89, com:7, shares:0 }
      ];
      data.cover = { seed:'torinocover' };
      data.photos = ['t1','t2','t3','t4','t5','t6'];
    } else {
      data.bio = ‘Artigiana. Decoro cuori sacri e oggetti votivi.\nMare e mani.’;
      data.work = "Bottega d’arte sacra · Fossacesia";
      data.school = "Accademia di Belle Arti — L’Aquila";
      data.from = ‘Fossacesia’;
      data.posts = [
        { t:’Nuova serie di cuori votivi in lavorazione. Rame, smalti, pazienza.’, w:’3 giorni fa’, likes:38, com:9, shares:3, mediaSeed:’cuorivotivi’ },
        { t:’La bottega è aperta sabato mattina. Venite a vedere.’, w:’1 settimana fa’, likes:21, com:5, shares:1, mediaUrl: LUNA3_P },
        { t:"Il mare d’inverno è l’unico maestro che conosco.", w:’2 settimane fa’, likes:54, com:8, shares:2, mediaSeed:’mareinverno’ }
      ];
      data.cover = { seed:’fossacesiacover’ };
      data.photos = [{ url: LUNA3_SQ }, { url:’data:image/jpeg;base64,’+LUNA3_B64 }, ‘c3’,’c4’,’c5’,’c6’];
    }
    return data;
  });

  // Build feed: pick a few realistic Italian profiles for posts
  const pickFriend = (i) => {
    // Stable picks from profiles
    const indices = [3, 14, 27, 41, 56, 72];
    const fi = indices[i % indices.length] + i;
    return PROFILES[fi % (PROFILES.length - 4)] || PROFILES[0];
  };

  const FEED = [
    {
      person: PROFILES[12],
      meta:'2 ore fa',
      text:'Appena finito di leggere "Le otto montagne" di Cognetti. Mi è rimasto addosso per giorni. Qualcuno ha consigli per il prossimo?',
      media: null, likes:67, com:24, shares:2 },
    {
      person: PROFILES[33],
      meta:'4 ore fa',
      text:'Passeggiata lunga al porto stamattina. A volte bastano due ore di cammino per rimettere le cose a posto.',
      media:'porto', mediaWide:true, likes:154, com:31, shares:8 },
    {
      person: PROFILES[58],
      meta:'ieri',
      text:'Torta di mele della nonna, terza volta in un mese. Nessuno si lamenta.\nRicetta nei commenti per chi me la chiede sempre.',
      media:'tortamele', likes:312, com:74, shares:18 },
    {
      person: PROFILES[91],
      meta:'ieri alle 18:42',
      text:'Finalmente ho sistemato la bici. Domani si parte presto, direzione entroterra. Si accettano compagni di viaggio.',
      media:'bici', mediaWide:true, likes:88, com:16, shares:1 },
    {
      person: PROFILES[124],
      meta:'2 giorni fa',
      text:'Piccolo aggiornamento dal laboratorio: tre pezzi nuovi quasi pronti per la mostra di maggio.',
      media:'studio', likes:45, com:9, shares:0 },
    {
      person: PROFILES[167],
      meta:'2 giorni fa',
      text:'Buon compleanno al mio piccolo grande Bruno 🎂\n12 anni e ancora corre come un cucciolo.',
      media:'cane', likes:421, com:88, shares:3, isBirthday:true }
  ];

  const STORIES = [
    { create:true, name:'Crea storia' },
    { name:'Marta',    person: PROFILES[12], bg: 'st1' },
    { name:'Giovanni', person: PROFILES[33], bg: 'st2' },
    { name:'Chiara',   person: PROFILES[58], bg: 'st3' },
    { name:'Luca',     person: PROFILES[91], bg: 'st4' },
    { name:'Silvia',   person: PROFILES[124], bg: 'st5' },
    { name:'Fabio',    person: PROFILES[167], bg: 'st6' }
  ];

  // People you may know
  const SUGGESTIONS = [PROFILES[7], PROFILES[19], PROFILES[44], PROFILES[81], PROFILES[103], PROFILES[145], PROFILES[188]];

  // Image helpers - picsum.photos with seed
  const picsum = (seed, w, h) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

  // Recent searches
  const RECENTS = [
    { type:'person', label:'Andrea Rossi' },
    { type:'person', label:'Silvia De Santis' },
    { type:'place', label:'Fossacesia, spiaggia' },
    { type:'person', label:'Pasticceria Bertolini' }
  ];

  const app = document.getElementById('app');
  let screen = 'home';
  let currentProfile = null;
  let likedPosts = new Set();
  let lastSearchQuery = '';

  const icon = (id, cls='') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
  const escapeHTML = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const avatarHTML = (url, cls='') => `<div class="avatar ${cls}"><img src="${url}" alt="" loading="lazy"></div>`;

  const storageKey = (p) => 'tp3_' + p.id;
  const loadMsgs = (p) => { try { return JSON.parse(localStorage.getItem(storageKey(p)) || '[]'); } catch(e){ return []; } };
  const saveMsgs = (p, arr) => { try { localStorage.setItem(storageKey(p), JSON.stringify(arr)); } catch(e){} };

  const show = (name, opts={}) => {
    screen = name;
    if (name === 'profile' || name === 'chat') currentProfile = opts.profile || currentProfile;
    render();
  };

  // ===== Topbar / Tabnav =====
  const topbar = () => `
    <div class="topbar">
      <div class="brand" data-action="home">
        <div class="brand-mark">${icon('i-logo')}</div>
        <div class="brand-text">TuttiPeople</div>
      </div>
      <div class="topbar-spacer"></div>
      <button class="top-icon" data-action="go-search" aria-label="Cerca">${icon('i-search')}</button>
      <button class="top-icon" data-action="noop" aria-label="Messaggi">
        ${icon('i-msg-fill')}
        <span class="badge">3</span>
      </button>
    </div>
  `;

  const tabnav = (active='home') => `
    <nav class="tabnav">
      <button class="${active==='home'?'active':''}" data-action="home" aria-label="Home">${icon(active==='home'?'i-home':'i-home-o')}</button>
      <button data-action="noop" aria-label="Amici">${icon('i-friends')}<span class="ind">8</span></button>
      <button data-action="noop" aria-label="Video">${icon('i-video')}</button>
      <button data-action="noop" aria-label="Notifiche">${icon('i-bell')}<span class="ind">12</span></button>
      <button data-action="noop" aria-label="Menu">${icon('i-menu')}</button>
    </nav>
  `;

  // ===== HOME =====
  const renderHome = () => {
    const composer = `
      <div class="composer">
        <div class="composer-row">
          ${avatarHTML(avUrl(ME))}
          <div class="composer-input">A cosa stai pensando, ${ME.n.split(' ')[0]}?</div>
          <button class="top-icon" style="background:transparent;" data-action="noop" aria-label="Foto">${icon('i-image')}</button>
        </div>
        <div class="composer-actions">
          <button data-action="noop"><span class="ca-live">${icon('i-video')}</span> Diretta</button>
          <button data-action="noop"><span class="ca-photo">${icon('i-image')}</span> Foto</button>
          <button data-action="noop"><span class="ca-feeling">${icon('i-emoji')}</span> Stato</button>
        </div>
      </div>`;

    const stories = `
      <div class="stories">
        ${STORIES.map((s, idx) => {
          if (s.create) {
            return `<div class="story create">
              <div class="top"><img src="${avUrl(ME)}" alt=""></div>
              <div class="plus">+</div>
              <div class="bottom">Crea storia</div>
            </div>`;
          }
          return `<div class="story">
            <img class="bg" src="${picsum('story-' + idx, 220, 340)}" alt="">
            <div class="ring"><img src="${avUrl(s.person)}" alt=""></div>
            <div class="label">${s.name}</div>
          </div>`;
        }).join('')}
      </div>`;

    const renderMedia = (post) => {
      if (!post.media) return '';
      const w = post.mediaWide ? 800 : 600;
      const h = post.mediaWide ? 500 : 600;
      return `<img class="post-media" src="${picsum(post.media, w, h)}" alt="" loading="lazy">`;
    };

    const posts = FEED.map((p, idx) => {
      const liked = likedPosts.has(idx);
      const likeCount = p.likes + (liked ? 1 : 0);
      return `
      <article class="post">
        <div class="post-head">
          ${avatarHTML(avUrl(p.person))}
          <div class="post-who">
            <div class="post-name">${p.person.n}</div>
            <div class="post-meta">${p.meta} · ${icon('i-globe')}</div>
          </div>
          <button class="post-more" data-action="noop" aria-label="Altro">${icon('i-dots')}</button>
        </div>
        <div class="post-text">${p.text}</div>
        ${renderMedia(p)}
        <div class="post-stats">
          <div class="reacts">
            <span class="react-pill react-like">${icon('i-thumb-fill')}</span>
            <span class="react-pill react-heart">${icon('i-heart-fill')}</span>
            <span class="react-pill react-haha">${icon('i-haha')}</span>
            <span style="margin-left:6px;">${likeCount.toLocaleString('it-IT')}</span>
          </div>
          <div>${p.com} commenti · ${p.shares||0} cond.</div>
        </div>
        <div class="post-actions">
          <button data-action="like-post" data-post="${idx}" class="${liked?'liked':''}">
            ${icon(liked?'i-thumb-fill':'i-thumb')} Mi piace
          </button>
          <button data-action="noop">${icon('i-comment')} Commenta</button>
          <button data-action="noop">${icon('i-share')} Condividi</button>
        </div>
      </article>`;
    }).join('');

    // People you may know after 2nd post
    const suggestions = `
      <div class="suggested">
        <div class="suggested-title">
          <span>Persone che potresti conoscere</span>
          <span class="more-link">Vedi tutto</span>
        </div>
        <div class="suggested-rail">
          ${SUGGESTIONS.map(s => `
            <div class="suggest-card">
              <div class="ph"><img src="${avUrl(s)}" alt="" loading="lazy"></div>
              <div class="body">
                <div class="nm">${s.n}</div>
                <div class="sub">${s.c}</div>
                <button class="add-btn" data-action="noop">${icon('i-userplus')} Aggiungi</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;

    // Sponsored card
    const sponsored = `
      <div class="suggested">
        <div class="sponsored-tag">Sponsorizzato</div>
        <div class="sponsored-card">
          <img class="img" src="${picsum('sponsorscarpe', 800, 420)}" alt="">
          <div class="body">
            <div class="meta">
              <div class="domain">scarpenuove.it</div>
              <div class="ttl">Sneakers artigianali in pelle — saldi di stagione</div>
            </div>
            <button class="cta" data-action="noop">Acquista</button>
          </div>
        </div>
      </div>`;

    // Splice posts: 2 posts, suggestions, 2 posts, sponsored, rest
    const postsArr = FEED.map((p, idx) => {
      const liked = likedPosts.has(idx);
      const likeCount = p.likes + (liked ? 1 : 0);
      return `
      <article class="post">
        <div class="post-head">
          ${avatarHTML(avUrl(p.person))}
          <div class="post-who">
            <div class="post-name">${p.person.n}${p.isBirthday?' '+icon('i-cake','verified'):''}</div>
            <div class="post-meta">${p.meta} · ${icon('i-globe')}</div>
          </div>
          <button class="post-more" data-action="noop" aria-label="Altro">${icon('i-dots')}</button>
        </div>
        <div class="post-text">${p.text}</div>
        ${renderMedia(p)}
        <div class="post-stats">
          <div class="reacts">
            <span class="react-pill react-like">${icon('i-thumb-fill')}</span>
            <span class="react-pill react-heart">${icon('i-heart-fill')}</span>
            <span class="react-pill react-haha">${icon('i-haha')}</span>
            <span style="margin-left:6px;">${likeCount.toLocaleString('it-IT')}</span>
          </div>
          <div>${p.com} commenti · ${p.shares||0} cond.</div>
        </div>
        <div class="post-actions">
          <button data-action="like-post" data-post="${idx}" class="${liked?'liked':''}">
            ${icon(liked?'i-thumb-fill':'i-thumb')} Mi piace
          </button>
          <button data-action="noop">${icon('i-comment')} Commenta</button>
          <button data-action="noop">${icon('i-share')} Condividi</button>
        </div>
      </article>`;
    });

    const feedHtml = postsArr[0] + postsArr[1] + suggestions + postsArr[2] + sponsored + postsArr.slice(3).join('');

    return `
      <section class="screen active">
        ${topbar()}
        ${tabnav('home')}
        <div class="scroll">
          ${composer}
          ${stories}
          <div class="feed">${feedHtml}</div>
        </div>
      </section>
    `;
  };

  // ===== SEARCH =====
  const renderSearch = () => `
    <section class="screen active">
      <div class="search-header">
        <button class="back-btn" data-action="back-home" aria-label="Indietro">${icon('i-back')}</button>
        <div class="search-box">
          ${icon('i-search')}
          <input id="q" type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Cerca su TuttiPeople">
        </div>
      </div>
      <div class="scroll">
        <div id="results" class="search-results"></div>
      </div>
    </section>
  `;

  const matchesQuery = (q) => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const tokens = s.split(/\s+/);
    const matched = [];
    for (const p of PROFILES) {
      const hay = (p.n + ' ' + p.c + ' ' + (p.r || '')).toLowerCase();
      if (tokens.every(t => hay.includes(t))) matched.push(p);
      if (matched.length > 80) break;
    }
    // Sort: name match first
    matched.sort((a,b) => {
      const an = a.n.toLowerCase().startsWith(tokens[0]) ? 0 : 1;
      const bn = b.n.toLowerCase().startsWith(tokens[0]) ? 0 : 1;
      return an - bn;
    });
    return matched;
  };

  const profileFromHit = (p) => {
    if (p.luna) return LUNAS.find(L => L.id === 'luna' + p.luna);
    return null;
  };

  const paintSearch = (q) => {
    const host = document.getElementById('results');
    if (!host) return;
    const s = q.trim();
    if (!s) {
      // recent searches
      host.innerHTML = `
        <div class="search-section-title">Recenti</div>
        ${RECENTS.map(r => `
          <div class="recent-row">
            <div class="ic">${icon(r.type==='person'?'i-clock':'i-pin')}</div>
            <div class="lbl">${r.label}</div>
            <button class="x" data-action="noop">${icon('i-x')}</button>
          </div>
        `).join('')}
        <div class="clear-link" data-action="noop">Modifica cronologia</div>
      `;
      return;
    }
    const items = matchesQuery(s);
    if (!items.length) {
      host.innerHTML = '<div class="search-empty">Nessun risultato per "' + escapeHTML(s) + '".</div>';
      return;
    }
    host.innerHTML = `<div class="search-section-title">Persone (${items.length})</div>` + items.slice(0, 60).map(p => {
      const friendsLine = p.luna
        ? (p.luna === 1 ? '328 amici · 4 in comune' : p.luna === 2 ? '512 amici · 1 in comune' : '186 amici')
        : (p.f ? p.f + ' amici' : '');
      const url = avUrl(p);
      const lunaAttr = p.luna ? `data-profile="luna${p.luna}"` : '';
      return `
        <div class="result" ${lunaAttr}>
          <div class="avatar md"><img src="${url}" alt="" loading="lazy"></div>
          <div class="result-body">
            <div class="result-name">${p.n}</div>
            <div class="result-sub">${p.c} · ${p.r || ''}</div>
            <div class="result-friends">${friendsLine}</div>
          </div>
        </div>
      `;
    }).join('');
  };

  // ===== PROFILE =====
  const renderProfile = () => {
    const p = currentProfile; if (!p) return renderHome();
    const photosGrid = p.photos.map((item) => {
      const src = typeof item === 'string' ? picsum(p.id+'-photo-'+item, 300, 300) : item.url;
      return `<div><img src="${src}" alt="" loading="lazy"></div>`;
    }).join('');

    // 6 friends: 2 men + 4 women, full names
    const friendsPreview = [PROFILES[2], PROFILES[14], PROFILES[180], PROFILES[185], PROFILES[190], PROFILES[195]];
    const friendsHtml = friendsPreview.map(f => `
      <div class="friend-item">
        <div class="ph"><img src="${avUrl(f)}" alt="" loading="lazy"></div>
        <div class="nm">${f.n}</div>
      </div>
    `).join('');

    // Mutual friends differ per Luna so they feel realistic
    const mutualSets = {
      luna1: [PROFILES[181], PROFILES[183], PROFILES[5], PROFILES[20]],
      luna2: [PROFILES[188]],
      luna3: []
    };
    const mf = mutualSets[p.id] || [];
    const mutualHtml = mf.length > 0 ? `
      <div class="mutual-row">
        <div class="mutual-stack">
          ${mf.slice(0,3).map(f=>`<div class="avatar sm"><img src="${avUrl(f)}" alt=""></div>`).join('')}
        </div>
        <span>
          <b style="color:var(--text);">${mf[0].n.split(' ')[0]}</b>${mf[1]?`, <b style="color:var(--text);">${mf[1].n.split(' ')[0]}</b>`:''}
          e altri ${p.mutual - (mf[1]?2:1)} amici in comune
        </span>
      </div>
    ` : '';

    const posts = p.posts.map(x => `
      <article class="profile-post">
        <div class="head">
          ${avatarHTML(p.av)}
          <div class="post-who">
            <div class="post-name">${p.name}</div>
            <div class="when">${x.w} · ${icon('i-globe')}</div>
          </div>
          <button class="post-more" data-action="noop">${icon('i-dots')}</button>
        </div>
        <div class="text">${x.t}</div>
        ${x.mediaUrl ? `<img class="post-media" src="${x.mediaUrl}" alt="" loading="lazy">` : x.mediaSeed ? `<img class="post-media" src="${picsum(x.mediaSeed, x.mediaWide?800:600, x.mediaWide?500:600)}" alt="" loading="lazy">` : ''}
        <div class="post-stats">
          <div class="reacts">
            <span class="react-pill react-like">${icon('i-thumb-fill')}</span>
            <span class="react-pill react-heart">${icon('i-heart-fill')}</span>
            <span style="margin-left:6px;">${x.likes}</span>
          </div>
          <div>${x.com} commenti · ${x.shares} cond.</div>
        </div>
        <div class="post-actions">
          <button data-action="noop">${icon('i-thumb')} Mi piace</button>
          <button data-action="noop">${icon('i-comment')} Commenta</button>
          <button data-action="noop">${icon('i-share')} Condividi</button>
        </div>
      </article>
    `).join('');

    return `
      <section class="screen active">
        <div class="profile-header">
          <button class="back-btn" data-action="back-to-search" aria-label="Indietro">${icon('i-back')}</button>
          <div class="title">${p.name}</div>
          <button class="back-btn" data-action="noop">${icon('i-search')}</button>
          <button class="back-btn" data-action="noop">${icon('i-dots')}</button>
        </div>
        <div class="scroll">
          <div class="profile-cover"><img src="${picsum(p.cover.seed, 800, 320)}" alt=""></div>
          <div class="profile-id">
            <div class="profile-avatar-wrap">${avatarHTML(p.av, 'lg')}</div>
            <div class="profile-name-row">
              <div class="profile-name">${p.name}</div>
            </div>
            <div class="profile-sub">${p.friendsCount} amici${p.mutual>0?' · '+p.mutual+' in comune':''}</div>
            <div class="profile-bio">${p.bio.replace(/\n/g,'<br>')}</div>
            <div class="profile-meta">
              <div class="profile-meta-row">${icon('i-briefcase')} <span>Lavora come <b>${p.work}</b></span></div>
              <div class="profile-meta-row">${icon('i-graduation')} <span>Ha studiato a <b>${p.school}</b></span></div>
              <div class="profile-meta-row">${icon('i-pin')} <span>Vive a <b>${p.city}</b></span></div>
              <div class="profile-meta-row">${icon('i-home-o')} <span>Originaria di <b>${p.from}</b></span></div>
            </div>
            ${mutualHtml}
          </div>
          <div class="profile-cta">
            <button class="btn-ghost" data-action="noop">${icon('i-userplus')} Aggiungi</button>
            <button class="btn-primary" data-action="open-chat">${icon('i-msg-fill')} Messaggio</button>
            <button class="btn-icon" data-action="noop" aria-label="Altro">${icon('i-dots')}</button>
          </div>
          <div class="profile-tabs">
            <button class="active">Post</button>
            <button>Informazioni</button>
            <button>Foto</button>
            <button>Amici</button>
            <button>Video</button>
            <button>Check-in</button>
          </div>

          <div class="profile-photos">
            <div class="ttl" style="display:flex;justify-content:space-between;align-items:center;">
              <span>Foto</span>
              <span style="color:var(--blue);font-size:13.5px;font-weight:600;">Vedi tutto</span>
            </div>
            <div class="profile-photos-grid">${photosGrid}</div>
          </div>

          <div class="profile-friends-block">
            <div class="ttl">
              <span>Amici</span>
              <span style="color:var(--blue);font-size:13.5px;font-weight:600;">Vedi tutto</span>
            </div>
            <div class="sub">${p.friendsCount} amici${p.mutual>0?' · '+p.mutual+' in comune':''}</div>
            <div class="friend-grid">${friendsHtml}</div>
          </div>

          <div style="padding:12px 14px;background:#fff;font-weight:700;font-size:16px;border-bottom:1px solid var(--divider);">Post</div>
          ${posts}
        </div>
      </section>
    `;
  };

  // ===== CHAT =====
  const renderChat = () => {
    const p = currentProfile; if (!p) return renderHome();
    const msgs = loadMsgs(p);
    const msgHTML = msgs.map(m => `<div class="bubble ${m.from==='me'?'me':'them'}">${escapeHTML(m.text)}</div>`).join('');
    return `
      <section class="screen active">
        <div class="chat-header">
          <button class="back-btn" data-action="back-to-profile">${icon('i-back')}</button>
          <div class="who">
            ${avatarHTML(p.av)}
            <div>
              <div class="n">${p.name}</div>
              <div class="s"><span class="dot"></span> Attivo ora</div>
            </div>
          </div>
          <div class="chat-actions">
            <button data-action="noop">${icon('i-phone')}</button>
            <button data-action="noop">${icon('i-videocall')}</button>
            <button data-action="noop">${icon('i-info')}</button>
          </div>
        </div>
        <div class="chat-body" id="chatBody">${msgHTML || '<div class="chat-day">Inizia la conversazione</div>'}</div>
        <div class="chat-input">
          <div class="icons">
            <button data-action="noop">${icon('i-plus-circle')}</button>
            <button data-action="noop">${icon('i-camera')}</button>
            <button data-action="noop">${icon('i-image')}</button>
            <button data-action="noop">${icon('i-mic')}</button>
          </div>
          <div class="field">
            <textarea id="msgIn" rows="1" placeholder="Aa"></textarea>
            <button class="send-btn" data-action="noop" aria-label="Sticker" style="color:var(--text-2)">${icon('i-sticker')}</button>
          </div>
          <button class="send-btn" id="sendBtn" aria-label="Invia">${icon('i-send')}</button>
        </div>
      </section>
    `;
  };

  // ===== Render + bind =====
  const render = () => {
    let html = '';
    switch(screen){
      case 'search':  html = renderSearch();  break;
      case 'profile': html = renderProfile(); break;
      case 'chat':    html = renderChat();    break;
      default:        html = renderHome();
    }
    app.innerHTML = html;
    bind();
    afterRender();
  };

  const afterRender = () => {
    if (screen === 'search') {
      const input = document.getElementById('q');
      if (input) {
        input.value = lastSearchQuery;
        input.addEventListener('input', e => { lastSearchQuery = e.target.value; paintSearch(e.target.value); });
        paintSearch(lastSearchQuery);
        setTimeout(()=>{ try{ input.focus(); const v=input.value; input.value=''; input.value=v; }catch(e){} }, 50);
      }
    }
    if (screen === 'chat') {
      const body = document.getElementById('chatBody');
      if (body) body.scrollTop = body.scrollHeight;
      const ta = document.getElementById('msgIn');
      const btn = document.getElementById('sendBtn');
      if (ta) {
        ta.addEventListener('input', () => {
          ta.style.height = 'auto';
          ta.style.height = Math.min(ta.scrollHeight, 110) + 'px';
        });
        ta.addEventListener('keydown', e => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
        });
      }
      if (btn) btn.addEventListener('click', sendMessage);
    }
  };

  const sendMessage = () => {
    const ta = document.getElementById('msgIn');
    if (!ta || !currentProfile) return;
    const text = ta.value.trim();
    if (!text) return;
    const msgs = loadMsgs(currentProfile);
    msgs.push({ from:'me', text, t: Date.now() });
    saveMsgs(currentProfile, msgs);
    const body = document.getElementById('chatBody');
    if (msgs.length === 1) body.innerHTML = '';
    const b = document.createElement('div');
    b.className = 'bubble me';
    b.textContent = text;
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;
    ta.value = '';
    ta.style.height = 'auto';
    ta.focus();
  };

  const bind = () => { app.addEventListener('click', onTap, { once:true }); };

  const onTap = (e) => {
    bind();
    const resultEl = e.target.closest('[data-profile]');
    if (resultEl) {
      const id = resultEl.getAttribute('data-profile');
      const p = LUNAS.find(x => x.id === id);
      if (p) show('profile', { profile: p });
      return;
    }
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    const a = actionEl.getAttribute('data-action');
    switch(a){
      case 'home':            lastSearchQuery=''; show('home'); break;
      case 'go-search':       show('search'); break;
      case 'back-to-search':  show('search'); break;
      case 'back-home':       lastSearchQuery=''; show('home'); break;
      case 'back-to-profile': show('profile'); break;
      case 'open-chat':       show('chat'); break;
      case 'like-post': {
        const i = parseInt(actionEl.getAttribute('data-post'), 10);
        if (likedPosts.has(i)) likedPosts.delete(i); else likedPosts.add(i);
        render();
        break;
      }
      case 'noop': break;
    }
  };

  document.addEventListener('submit', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  render();
})();
