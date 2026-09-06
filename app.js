const CONFIG = {
      nome: 'Minha Lélé',
      dataInicio: '2026-06-06T00:00:00-03:00',
      musicaUrl: 'https://suamusica.com.br/embed/cd/2443552/vertical/0/dark',
      musicaTitulo: 'Nossa música',
      musicaArtista: 'POESIA ACÚSTICA #2 - SOBRE NÓS',
      motivos: ['A forma como você se escuta — de verdade, não só esperando a vez de falar.',
         'Pelo seu senso de humor — que me faz rir mesmo nos dias ruins.', 
         'Pela sua paciência e cuidado nos pequenos gestos do dia a dia.', 
         'Por como você me apoia nos meus planos e decisões.', 
         'Pela cumplicidade — os silêncios confortáveis, as nossas piadas internas.', 
         'Porque cada plano fica mais bonito quando tem você nele.', 
         'Porque amar você parece casa, frio na barriga e paz ao mesmo tempo.', 
         'Porque, entre todas as possibilidades, eu escolheria nós duas de novo.',
        'Simplesmente por ser quem você é',
         'seu sorriso cativante, que melhora meu dia; seus olhinhos brilhantes, que tanto amo; e sua personalidade lelé de ser' ,
         'enfim, tem muitas outras coisas, mas eu te amo por você ser você'
      ]
    };
    const $ = s => document.querySelector(s), pad = n => String(n).padStart(2, '0');
    const data = new Date(CONFIG.dataInicio); const dataLonga = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(data);
    $('#nameHero').textContent = CONFIG.nome + '.'; $('#nameClosing').textContent = CONFIG.nome; $('#heroDate').textContent = 'desde ' + dataLonga; $('#dateFull').textContent = dataLonga; $('#musicTitle').textContent = CONFIG.musicaTitulo; $('#musicArtist').textContent = CONFIG.musicaArtista;
    function tick() { let d = Math.max(0, Date.now() - data.getTime()) / 1000; d = Math.floor(d); $('#days').textContent = pad(Math.floor(d / 86400)); $('#hours').textContent = pad(Math.floor(d % 86400 / 3600)); $('#minutes').textContent = pad(Math.floor(d % 3600 / 60)); $('#seconds').textContent = pad(d % 60) } tick(); setInterval(tick, 1000);
    $('#openLetter').onclick = () => { $('#closedLetter').classList.add('hidden'); $('#letterText').classList.remove('hidden') };
    let ri = 0; function reason() { const text = CONFIG.motivos[ri]; $('#reasonText').textContent = text; $('#reasonNo').textContent = pad(ri + 1); $('#reasonLabel').textContent = pad(ri + 1) } $('#next').onclick = () => { ri = (ri + 1) % CONFIG.motivos.length; reason() }; $('#prev').onclick = () => { ri = (ri - 1 + CONFIG.motivos.length) % CONFIG.motivos.length; reason() };
    const audio = $('#audio');
    const musicMsg = $('#musicMsg');
    const playMusic = $('#playMusic');
    const vinyl = $('#vinyl');
    const progressBar = $('#progressBar');
    const currentTime = $('#currentTime');
    const duration = $('#duration');
    let playing = false;
    const formatTime = seconds => {
      if (!Number.isFinite(seconds)) return '0:00';
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${minutes}:${secs}`;
    };
    playMusic.onclick = async () => {
      try {
        if (audio.paused) await audio.play();
        else audio.pause();
      } catch (error) {
        if (musicMsg) musicMsg.textContent = '⌁ não foi possível reproduzir a música';
      }
    };
    audio.addEventListener('loadedmetadata', () => {
      duration.textContent = '-' + formatTime(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
      currentTime.textContent = formatTime(audio.currentTime);
      if (audio.duration) {
        duration.textContent = '-' + formatTime(audio.duration - audio.currentTime);
        progressBar.value = (audio.currentTime / audio.duration) * 100;
      } else {
        progressBar.value = 0;
      }
    });
    progressBar.addEventListener('input', () => {
      if (audio.duration) audio.currentTime = (Number(progressBar.value) / 100) * audio.duration;
    });
    audio.addEventListener('play', () => {
      playing = true;
      playMusic.textContent = 'Ⅱ';
      playMusic.setAttribute('aria-label', 'Pausar música');
      playMusic.setAttribute('aria-pressed', 'true');
      if (vinyl) vinyl.classList.add('playing');
      if (musicMsg) musicMsg.textContent = '⌁ tocando para nós duas';
    });
    audio.addEventListener('pause', () => {
      playing = false;
      playMusic.textContent = '▶';
      playMusic.setAttribute('aria-label', 'Tocar música');
      playMusic.setAttribute('aria-pressed', 'false');
      if (vinyl) vinyl.classList.remove('playing');
      if (musicMsg) musicMsg.textContent = '⌁ clique no play para continuar';
    });
    audio.addEventListener('ended', () => {
      progressBar.value = 0;
      currentTime.textContent = '0:00';
      duration.textContent = '-' + formatTime(audio.duration);
      if (musicMsg) musicMsg.textContent = '⌁ música encerrada';
    });
    $('#surprise').onclick = () => { $('#reveal').classList.remove('hidden'); for (let i = 0; i < 26; i++) { const s = document.createElement('i'); s.textContent = i % 2 ? '✦' : '♥'; s.style.cssText = `position:fixed;z-index:8;left:50%;top:55%;color:${i % 3 ? '#f6ded0' : '#fffdf9'};animation:burst 1.5s ease-out forwards;--x:${(i % 2 ? 1 : -1) * (70 + (i * 37) % 240)}px;--y:${-80 - (i * 29) % 190}px`; document.body.appendChild(s); setTimeout(() => s.remove(), 1700) } };
    const style = document.createElement('style'); style.textContent = '@keyframes burst{to{transform:translate(var(--x),var(--y)) rotate(260deg);opacity:0}}'; document.head.appendChild(style);
    document.querySelectorAll('.gallery-card').forEach(card => card.onclick = () => { $('#modalImg').src = card.querySelector('img').src; $('#modalImg').alt = card.querySelector('img').alt; $('#modalCaption').textContent = card.dataset.caption; $('#modal').classList.remove('hidden') }); $('#close').onclick = () => $('#modal').classList.add('hidden'); $('#modal').onclick = e => { if (e.target.id === 'modal') $('#modal').classList.add('hidden') };
    let taps = 0; $('#egg').onclick = () => { taps++; if (taps >= 5) { const n = document.createElement('div'); n.textContent = '✦ você encontrou o nosso cantinho secreto.'; n.style.cssText = 'position:fixed;z-index:20;right:20px;bottom:20px;padding:11px 14px;border-radius:999px;background:#2e202d;color:#efc7c7;font:9px DM Mono,monospace'; document.body.appendChild(n); setTimeout(() => n.remove(), 2600); taps = 0 } };
