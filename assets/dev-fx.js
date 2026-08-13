/* Software / mobile developer animations */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  var TOKENS = [
    '@Composable', 'fun', 'val', 'remember', 'LaunchedEffect',
    'Modifier', 'Column', 'Row', 'StateFlow', 'ViewModel',
    'Hilt', 'Room', 'Coroutines', 'Flow', 'NavHost',
    'Kotlin', 'Compose', 'Flutter', 'SwiftUI', 'Unity',
    'NFC', 'SSL', 'Gradle', 'KMP', 'Retrofit'
  ];

  /* Code rain */
  var rain = document.getElementById('codeRain');
  if (rain && !reduce) {
    var ctx = rain.getContext('2d');
    var W, H, cols = [], fontSize = coarse ? 13 : 14;
    function resizeRain() {
      W = rain.width = window.innerWidth;
      H = rain.height = window.innerHeight;
      var n = Math.floor(W / 22);
      cols = [];
      for (var i = 0; i < n; i++) {
        cols.push({
          y: Math.random() * H,
          speed: 0.6 + Math.random() * 1.4,
          token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
          hue: Math.random() > 0.7 ? '56,189,248' : '168,85,247'
        });
      }
    }
    resizeRain();
    window.addEventListener('resize', resizeRain);
    var rainRaf;
    var last = 0;
    function drawRain(t) {
      if (t - last < 40) { rainRaf = requestAnimationFrame(drawRain); return; }
      last = t;
      ctx.fillStyle = 'rgba(10,10,15,0.18)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = '600 ' + fontSize + 'px "JetBrains Mono", ui-monospace, monospace';
      for (var i = 0; i < cols.length; i++) {
        var c = cols[i];
        ctx.fillStyle = 'rgba(' + c.hue + ',0.55)';
        ctx.fillText(c.token, i * 22, c.y);
        c.y += c.speed * 10;
        if (c.y > H + 20) {
          c.y = -20;
          c.token = TOKENS[Math.floor(Math.random() * TOKENS.length)];
        }
      }
      rainRaf = requestAnimationFrame(drawRain);
    }
    rainRaf = requestAnimationFrame(drawRain);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(rainRaf);
      else rainRaf = requestAnimationFrame(drawRain);
    });
  }

  /* Phone screen cycle */
  var screens = document.querySelectorAll('.dev-screen');
  if (screens.length) {
    var si = 0;
    screens[0].classList.add('active');
    if (!reduce) {
      setInterval(function () {
        screens[si].classList.remove('active');
        si = (si + 1) % screens.length;
        screens[si].classList.add('active');
      }, 3800);
    }
  }

  /* Terminal typewriter */
  var termEl = document.getElementById('devTermOut');
  var termLines = [
    { html: '<span class="prompt">$</span> <span class="cmd">./gradlew :app:assembleRelease</span>' },
    { html: '<span class="dim">&gt; Task :app:compileReleaseKotlin</span>' },
    { html: '<span class="dim">&gt; Task :app:packageRelease</span>' },
    { html: '<span class="ok">BUILD SUCCESSFUL in 11s</span>' }
  ];
  function runTerm() {
    if (!termEl) return;
    if (reduce) {
      termEl.innerHTML = termLines.map(function (l) { return l.html; }).join('<br>');
      return;
    }
    var li = 0;
    termEl.innerHTML = '';
    function nextLine() {
      if (li >= termLines.length) {
        setTimeout(runTerm, 2600);
        return;
      }
      var row = document.createElement('div');
      row.innerHTML = termLines[li].html;
      termEl.appendChild(row);
      li++;
      setTimeout(nextLine, li === 1 ? 700 : 520);
    }
    nextLine();
  }
  runTerm();

  /* IDE caret line cycle */
  var ideBody = document.getElementById('devIdeBody');
  if (ideBody && !reduce) {
    var snippets = [
      [
        '<span class="ln">1</span> <span class="an">@Composable</span>',
        '<span class="ln">2</span> <span class="k">fun</span> <span class="fn">HomeScreen</span>() {',
        '<span class="ln">3</span>   <span class="fn">Column</span>(<span class="fn">Modifier</span>.fillMaxSize()) {',
        '<span class="ln">4</span>     <span class="fn">TopBar</span>(title = <span class="st">"Apps"</span>)',
        '<span class="ln">5</span>     <span class="fn">AppGrid</span>(apps)',
        '<span class="ln">6</span>   }',
        '<span class="ln">7</span> }<span class="dev-ide-caret"></span>'
      ],
      [
        '<span class="ln">1</span> <span class="k">val</span> uiState <span class="k">by</span> vm.state.<span class="fn">collectAsState</span>()',
        '<span class="ln">2</span> <span class="fn">LaunchedEffect</span>(Unit) {',
        '<span class="ln">3</span>   vm.<span class="fn">loadApps</span>()',
        '<span class="ln">4</span> }',
        '<span class="ln">5</span> <span class="cm">// NFC · SSL Pinning</span>',
        '<span class="ln">6</span> <span class="fn">SecureClient</span>().<span class="fn">pin</span>()<span class="dev-ide-caret"></span>'
      ],
      [
        '<span class="ln">1</span> <span class="k">class</span> <span class="fn">AppViewModel</span> {',
        '<span class="ln">2</span>   <span class="k">private val</span> _s = <span class="fn">MutableStateFlow</span>()',
        '<span class="ln">3</span>   <span class="k">val</span> state = _s.<span class="fn">asStateFlow</span>()',
        '<span class="ln">4</span>   <span class="k">fun</span> <span class="fn">loadApps</span>() = <span class="fn">viewModelScope</span>.launch {',
        '<span class="ln">5</span>     _s.value = repo.<span class="fn">fetch</span>()',
        '<span class="ln">6</span>   }',
        '<span class="ln">7</span> }<span class="dev-ide-caret"></span>'
      ]
    ];
    var idei = 0;
    function paintIde() {
      ideBody.innerHTML = snippets[idei].join('<br>');
      idei = (idei + 1) % snippets.length;
    }
    paintIde();
    setInterval(paintIde, 4200);
  }

  /* Orbit positions */
  var orbitItems = document.querySelectorAll('.dev-orbit-item');
  var orbitHost = document.querySelector('.dev-orbit');
  if (orbitItems.length && !reduce) {
    if (orbitHost) orbitHost.classList.add('ready');
    var start = performance.now();
    function placeOrbit(t) {
      var elapsed = (t - start) / 1000;
      orbitItems.forEach(function (el, i) {
        var radius = parseFloat(el.getAttribute('data-r') || '220');
        var speed = parseFloat(el.getAttribute('data-s') || '0.18');
        var base = parseFloat(el.getAttribute('data-a') || '0');
        var a = base + elapsed * speed;
        var x = Math.cos(a) * radius;
        var y = Math.sin(a) * radius;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      requestAnimationFrame(placeOrbit);
    }
    requestAnimationFrame(placeOrbit);
  }

  /* Binary ticker content */
  var bin = document.getElementById('devBinary');
  if (bin) {
    var bits = '';
    for (var b = 0; b < 180; b++) bits += (Math.random() > 0.5 ? '1' : '0') + ' ';
    bin.innerHTML = '<span>' + bits + bits + '</span>';
  }
})();
