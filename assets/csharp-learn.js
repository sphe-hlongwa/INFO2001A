/* Interactive pieces for the "Understand it" and "Practice" modes of csharp-sql.html.
   Content is based on INFO2001A Solution Design Lecture 2 plus the Windows Forms + Access booklet. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  /* =============== Objects chain =============== */
  var NODES = [
    { c: '#5cb87a', k: 'Source', t: 'Access .accdb',
      p: 'The file that actually stores your data: tables, keys, relationships and queries.',
      n: 'Its location and permissions decide whether your app can open it. Not the same thing as a DataTable in memory.' },
    { c: '#e8a04c', k: 'Provider', t: 'OleDb provider',
      p: 'A library that speaks to one kind of data source. <code>System.Data.OleDb</code> plus the installed Access OLE DB engine handle the <code>.accdb</code> format.',
      n: 'Availability depends on what is installed on the lab machine.' },
    { c: '#6fa8ea', k: 'Connection', t: 'OleDbConnection',
      p: 'A session with the data source. <code>Open()</code> starts it, <code>Dispose()</code> / <code>Close()</code> releases it. Keep it open only for the operation that needs it.',
      n: 'It does not contain the rows.' },
    { c: '#a98be8', k: 'Command', t: 'OleDbCommand',
      p: 'One requested operation: <code>CommandText</code> holds the SELECT, INSERT, UPDATE or DELETE, and <code>Parameters</code> carry the values.',
      n: 'A command describes an operation. It is not the result.' },
    { c: '#e2665b', k: 'Results', t: 'Reader or Adapter',
      p: '<code>OleDbDataReader</code> streams rows once, forward-only. <code>OleDbDataAdapter.Fill</code> loads rows into a DataTable you can keep.',
      n: 'Pick by the shape of the result you need.' },
    { c: '#6fa8ea', k: 'In memory', t: 'DataTable + BindingSource',
      p: 'The DataTable is a disconnected copy. The BindingSource tracks the current record and feeds controls such as a DataGridView or TextBoxes.',
      n: 'A grid row is a view of data, not proof it was saved.' }
  ];
  var chain = $('#chain');
  if (chain) {
    var detail = $('#nodeDetail');
    chain.innerHTML = NODES.map(function (n, i) {
      return '<button type="button" class="node" style="--c:' + n.c + '" data-i="' + i + '" aria-pressed="false"><small>' + n.k + '</small><b>' + n.t + '</b></button>';
    }).join('');
    var pick = function (i) {
      var n = NODES[i];
      chain.querySelectorAll('.node').forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
      detail.style.setProperty('--c', n.c);
      detail.innerHTML = '<h4>' + n.t + '</h4><p>' + n.p + '</p><p class="not">' + n.n + '</p>';
    };
    chain.addEventListener('click', function (e) { var b = e.target.closest('.node'); if (b) pick(+b.dataset.i); });
    pick(0);
  }

  /* =============== Execute method picker =============== */
  var EXEC = {
    reader: {
      q: 'Which applications are Pending?',
      sql: 'SELECT ApplicationID, Status FROM FundingApplication WHERE Status = ?',
      ret: 'An <code>OleDbDataReader</code> with zero or more rows. Call <code>Read()</code> to move to each row.',
      use: 'Each returned row needs processing, once.',
      trap: 'Forward-only and read-only. The connection stays busy until you dispose the reader.',
      code: 'using var cmd = new OleDbCommand(\n    "SELECT ApplicationID, Status FROM FundingApplication WHERE Status = ?", connection);\ncmd.Parameters.Add("@status", OleDbType.VarWChar).Value = "Pending";\nusing var reader = cmd.ExecuteReader();\nwhile (reader.Read())\n    listBox1.Items.Add(reader.GetInt32(0));   // first selected column = index 0'
    },
    scalar: {
      q: 'How many applications are Pending?',
      sql: 'SELECT COUNT(*) FROM FundingApplication WHERE Status = ?',
      ret: 'The first column of the first row, as an <code>object</code>. Convert it to the .NET type you expect.',
      use: 'A count, a total, or a single lookup value.',
      trap: 'No row means null. Zero and null are different things.',
      code: 'using var cmd = new OleDbCommand(\n    "SELECT COUNT(*) FROM FundingApplication WHERE Status = ?", connection);\ncmd.Parameters.Add("@status", OleDbType.VarWChar).Value = "Pending";\nint count = Convert.ToInt32(cmd.ExecuteScalar());\nlabelCount.Text = $"{count} pending";'
    },
    nonquery: {
      q: 'Was an existing application updated?',
      sql: 'UPDATE FundingApplication SET Status = ? WHERE ApplicationID = ?',
      ret: 'An <code>int</code>: the number of rows this command affected.',
      use: 'INSERT, UPDATE and DELETE.',
      trap: 'Zero can mean the ID matched nothing. The number is not the new AutoNumber ID.',
      code: 'using var cmd = new OleDbCommand(\n    "UPDATE FundingApplication SET Status = ? WHERE ApplicationID = ?", connection);\ncmd.Parameters.Add("@status", OleDbType.VarWChar).Value = "Approved";\ncmd.Parameters.Add("@id", OleDbType.Integer).Value = applicationId;\nint changed = cmd.ExecuteNonQuery();\nif (changed == 0) ShowMissingRecord();'
    },
    fill: {
      q: 'Show every application in a grid I can navigate',
      sql: 'SELECT ApplicationID, Status, SubmittedAt FROM FundingApplication',
      ret: 'Rows copied into a <code>DataTable</code> that stays available after the connection closes.',
      use: 'DataGridView, form navigation, simple in-memory editing.',
      trap: 'Edits in memory do not persist by themselves. Reloading is a deliberate action after a save.',
      code: 'var table = new DataTable();\nusing var adapter = new OleDbDataAdapter(\n    "SELECT ApplicationID, Status, SubmittedAt FROM FundingApplication", connection);\nadapter.Fill(table);\nbindingSource.DataSource = table;\ndataGridView.DataSource = bindingSource;'
    }
  };
  var seg = $('#execSeg');
  if (seg) {
    var box = $('#execBox');
    var showExec = function (k) {
      var d = EXEC[k];
      seg.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.k === k ? 'true' : 'false'); });
      box.innerHTML =
        '<dl><dt>Question</dt><dd>' + esc(d.q) + '</dd><dt>SQL</dt><dd><code>' + esc(d.sql) + '</code></dd>' +
        '<dt>Returns</dt><dd>' + d.ret + '</dd><dt>Use it for</dt><dd>' + d.use + '</dd></dl>' +
        '<pre class="code"><code>' + esc(d.code) + '</code></pre><p class="trap">Watch out: ' + d.trap + '</p>';
      if (window.csHighlight) window.csHighlight(box);
    };
    seg.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) showExec(b.dataset.k); });
    window.addEventListener('load', function () { showExec('reader'); });
    showExec('reader');
  }

  /* =============== quiz / drill component =============== */
  function mount(el, items, opts) {
    opts = opts || {};
    var score = 0, answered = 0;
    var scoreEl = opts.score ? $(opts.score) : null;
    var paint = function () {
      if (!scoreEl) return;
      var done = answered === items.length;
      scoreEl.querySelector('.sc').textContent = 'Score: ' + score + ' / ' + answered + '  of ' + items.length;
      scoreEl.querySelector('.done').textContent = done ? (score === items.length ? 'Perfect. Nothing to revise.' : 'Done. Revisit the explanations you missed.') : '';
    };
    el.innerHTML = '';
    items.forEach(function (it, qi) {
      var b = document.createElement('div');
      b.className = 'qb';
      b.innerHTML =
        '<p class="qt">' + (it.tag ? '<span class="qtag">' + esc(it.tag) + '</span>' : '') + '<span class="qn">Q' + (qi + 1) + '</span>' + it.q + '</p>' +
        '<div class="qo' + (opts.col ? ' col' : '') + '">' + it.o.map(function (o, oi) { return '<button type="button" class="opt" data-oi="' + oi + '">' + o + '</button>'; }).join('') + '</div>' +
        '<p class="why"></p>';
      b.querySelectorAll('.opt').forEach(function (ob) {
        ob.addEventListener('click', function () {
          if (b.dataset.done) return;
          b.dataset.done = '1';
          var c = +ob.dataset.oi;
          b.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; });
          b.querySelectorAll('.opt')[it.a].classList.add('correct');
          if (c !== it.a) ob.classList.add('wrong'); else score++;
          answered++;
          var w = b.querySelector('.why');
          w.innerHTML = (c === it.a ? '<b>Correct. </b>' : '<b>Not quite. </b>') + it.w;
          w.classList.add('show');
          paint();
        });
      });
      el.appendChild(b);
    });
    paint();
    return function reset() { mount(el, items, opts); };
  }

  /* ---- drill: pick the Execute method ---- */
  var EXEC_OPTS = ['ExecuteReader', 'ExecuteScalar', 'ExecuteNonQuery', 'DataAdapter.Fill'];
  var runDrill = $('#drillRun');
  if (runDrill) mount(runDrill, [
    { q: 'List every Pending applicant, one row at a time.', o: EXEC_OPTS, a: 0, w: 'You need every row to process: a reader streams them.' },
    { q: 'How many applications are Pending?', o: EXEC_OPTS, a: 1, w: '<code>SELECT COUNT(*)</code> returns one value. Scalar.' },
    { q: 'Approve application 1042.', o: EXEC_OPTS, a: 2, w: 'A write. NonQuery returns rows affected so you can spot a missing record.' },
    { q: 'Fill a grid the user can move around and edit in memory.', o: EXEC_OPTS, a: 3, w: 'A DataAdapter fills a disconnected DataTable that you can bind.' },
    { q: 'Show the largest RequestedAmount (<code>SELECT MAX(...)</code>).', o: EXEC_OPTS, a: 1, w: 'One value from the first row of the first column. Scalar.' }
  ]);

  /* ---- drill: pick the retrieval method ---- */
  var SRCH_OPTS = ['Exact ID', 'Prefix LIKE', 'Two exact filters', 'Date range', 'Open via its ID'];
  var srchDrill = $('#drillSearch');
  if (srchDrill) mount(srchDrill, [
    { q: 'Find application 1042.', o: SRCH_OPTS, a: 0, w: '<code>WHERE ApplicationID = ?</code> when the identifier is known.' },
    { q: 'Find every name starting with "Dla".', o: SRCH_OPTS, a: 1, w: 'A prefix pattern: <code>Dla%</code> passed as one parameter (ANSI-92 mode).' },
    { q: 'Find Pending Tuition applications.', o: SRCH_OPTS, a: 2, w: 'Two exact values: <code>Status = ? AND FundingTypeID = ?</code>. No wildcard needed.' },
    { q: 'Find submissions made in a period.', o: SRCH_OPTS, a: 3, w: 'Compare Date/Time fields with typed DateTime parameters, not formatted strings.' },
    { q: 'The user clicks one search result to open it.', o: SRCH_OPTS, a: 4, w: 'Search the descriptive field, but act on the stable key (ApplicationID).' }
  ], { col: false });

  /* =============== flashcards =============== */
  var CARDS = [
    ['Architecture', 'Name the four application layers.', 'Presentation (form and controls) &middot; Application logic (rules, use-case coordination) &middot; Data access (commands, mapping) &middot; Data source (Access database).'],
    ['Architecture', 'Why separate responsibilities?', 'The form explains errors and collects input, rules can be reused outside a button click, and data access holds the SQL and provider details. Each part is easier to change and test.'],
    ['Architecture', 'Do layers need separate programs?', 'No. They can be classes in one project. Layers describe responsibilities.'],
    ['Architecture', 'If Access is replaced later, what should change?', 'Mainly the data access layer. The form should change less.'],

    ['ADO.NET', 'Data source vs provider?', 'Source: where the data is stored (the .accdb). Provider: the library that talks to that kind of source (System.Data.OleDb plus the Access OLE DB engine).'],
    ['ADO.NET', 'What goes in a connection string?', 'The Provider (the Access engine) and the Data Source (path to the .accdb). Keep the path configurable.'],
    ['ADO.NET', 'Does OleDbConnection hold the rows?', 'No. It is the session or channel. Open it, use it, dispose it.'],
    ['ADO.NET', 'What is an OleDbCommand?', 'One operation: CommandText (SELECT / INSERT / UPDATE / DELETE) plus its Parameters.'],
    ['ADO.NET', 'Why use Parameters?', 'Values travel separately from the SQL text, so user input is never glued into the statement.'],
    ['ADO.NET', 'How does OleDb match parameters?', 'By position of the ? placeholders, not by name. Add them in the same order.'],
    ['ADO.NET', 'Is a DataTable the data source?', 'No. It is an in-memory copy. Changes do not persist until saved.'],

    ['Execute methods', 'ExecuteReader?', 'Streams result rows through an OleDbDataReader. Forward-only, read-only. Call Read() for each row.'],
    ['Execute methods', 'ExecuteScalar?', 'Returns the first column of the first row as an object, e.g. COUNT(*). Convert it. No row can mean null.'],
    ['Execute methods', 'ExecuteNonQuery?', 'Returns rows affected by INSERT / UPDATE / DELETE. Zero can mean the ID matched nothing. It is not the new ID.'],
    ['Execute methods', 'Reader vs DataAdapter.Fill?', 'A reader streams once while the connection is open. Fill copies rows into a DataTable you keep after closing, ideal for binding and navigation.'],

    ['Binding', 'What does a BindingSource do?', 'Mediates binding and tracks the current record (Position). Bound controls follow it.'],
    ['Binding', 'Does MoveNext() update Access?', 'No. It only moves the in-memory current item. No SQL runs.'],
    ['Binding', 'TableAdapter Fill vs Update?', 'Fill reads Access into the DataSet. Update writes the DataSet changes back to Access.'],
    ['Binding', 'Why Validate() and EndEdit() before Update()?', 'They push what is in the controls into the DataRow. Otherwise Update sends the old values.'],
    ['Binding', 'After AddNew(), is the record in Access?', 'No. It exists in memory only until the TableAdapter updates.'],

    ['Related data', 'Why use a JOIN to show a name?', 'The foreign key stores the ID. A JOIN to the owning table fetches the name for display without duplicating columns.'],
    ['Related data', 'ComboBox DisplayMember vs ValueMember?', 'DisplayMember is what the user sees (TypeName). ValueMember is what you save (FundingTypeID).'],
    ['Related data', 'Read path vs write path?', 'Display with a JOIN. Save to the owning table using the key: INSERT the FundingTypeID, not the TypeName.'],
    ['Related data', 'Joining three tables in Access?', 'Access commonly needs parentheses around the multiple joins.'],

    ['Validation', 'Six things to validate?', 'Presence, type/format, range/length, membership, cross-field rule, state.'],
    ['Validation', 'Three validation boundaries?', 'Form (immediate feedback), application logic (authoritative rules), database (types, required fields, relationships).'],
    ['Validation', 'TryParse vs Parse?', 'TryParse returns false for bad text, a predictable result. Parse throws FormatException. Use TryParse for user input.'],
    ['Validation', 'Does a disabled Submit button enforce rules?', 'No. It helps the user, but the rules must still be checked in application logic.'],

    ['CRUD', 'Update or delete by which key?', 'The primary key (WHERE ApplicationID = ?). Never the grid row number or display position.'],
    ['CRUD', 'When is Delete a business decision?', 'Related records or audit rules may forbid it. A Cancelled status can keep history. Always confirm the target and consequence.'],
    ['CRUD', 'How to show navigation position?', '$"{bs.Position + 1} of {bs.Count}". Handle an empty list and disable movement at the ends.'],
    ['CRUD', 'Why check rows affected?', 'Zero rows can mean the record does not exist, so tell the user clearly.'],

    ['Search', 'Search vs filter vs sort vs navigate?', 'Search finds a record. Filter narrows a list. Sort reorders it. Navigate moves among the current results.'],
    ['Search', 'Prefix vs contains with LIKE?', 'Moko% begins with Moko. %Moko% contains it. Pass the whole pattern as one parameter.'],
    ['Search', 'ANSI-89 vs ANSI-92 wildcards?', 'Access query design: * and ?. OLE DB queries can use % and _. Do not mix them, and test on the lab machine.'],
    ['Search', 'Database WHERE vs local filter?', 'WHERE returns fewer rows from Access. A local filter only narrows rows already loaded, so it cannot find rows never loaded.'],

    ['Usability', 'What makes a good error message?', 'It says what failed, which field, and how to fix it. "Invalid input" leaves the user guessing.'],
    ['Usability', 'How to prevent double submission?', 'Disable the button while saving (re-enable in finally) and show feedback.'],
    ['Usability', 'Accessibility basics for a form?', 'Logical TabIndex, clear labels, errors not shown by colour alone, readable contrast and scaling.'],

    ['Errors', 'When should you catch an exception?', 'Only where you can recover, explain or record it. Exceptions are not a substitute for input rules.'],
    ['Errors', 'What is OleDbException?', 'A provider, query or database failure, such as a failed open or save.'],
    ['Errors', 'Role of finally and using?', 'finally runs whatever happens, so restore UI state (re-enable the button). using disposes the connection and command.'],
    ['Errors', 'What do you tell the user on failure?', 'What failed and a next step. Never show SQL, stack traces or file paths. Log the detail separately.'],
    ['Errors', 'Order of catch clauses?', 'Specific types first, then broader ones.']
  ];
  var fcGrid = $('#fcGrid');
  if (fcGrid) {
    var topics = ['All'].concat(CARDS.map(function (c) { return c[0]; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
    var sel = $('#fcTopic');
    sel.innerHTML = topics.map(function (t) {
      var n = t === 'All' ? CARDS.length : CARDS.filter(function (c) { return c[0] === t; }).length;
      return '<option value="' + t + '">' + t + ' (' + n + ')</option>';
    }).join('');
    var render = function () {
      var list = CARDS.filter(function (c) { return sel.value === 'All' || c[0] === sel.value; });
      fcGrid.innerHTML = list.map(function (c) {
        return '<div class="fc" role="button" tabindex="0" aria-label="Flashcard: ' + esc(c[1]) + '. Press Enter to flip.">' +
          '<div class="inner"><div class="face front"><div class="tg">' + c[0] + '</div><p>' + c[1] + '</p><span class="hint">tap to flip</span></div>' +
          '<div class="face back"><div class="tg">' + c[0] + '</div><p>' + c[2] + '</p></div></div></div>';
      }).join('');
      $('#fcCount').textContent = list.length + ' cards';
    };
    sel.addEventListener('change', render);
    fcGrid.addEventListener('click', function (e) { var c = e.target.closest('.fc'); if (c) c.classList.toggle('flipped'); });
    fcGrid.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('fc')) { e.preventDefault(); e.target.classList.toggle('flipped'); }
    });
    $('#fcFlip').addEventListener('click', function () {
      var cs = fcGrid.querySelectorAll('.fc');
      var all = Array.prototype.every.call(cs, function (c) { return c.classList.contains('flipped'); });
      cs.forEach(function (c) { c.classList.toggle('flipped', !all); });
    });
    render();
  }

  /* =============== quiz =============== */
  var quizEl = $('#quizList');
  if (quizEl) {
    var Q = [
      { tag: 'Execute', q: 'You need the number of Pending applications (<code>SELECT COUNT(*)</code>). Which method?', o: ['ExecuteReader', 'ExecuteScalar', 'ExecuteNonQuery', 'DataAdapter.Fill'], a: 1, w: 'A single value from the first column of the first row is exactly what ExecuteScalar returns.' },
      { tag: 'Execute', q: 'An UPDATE through <code>ExecuteNonQuery</code> returns 0. What does that most likely mean?', o: ['The update succeeded', 'No row matched the WHERE condition', 'The new AutoNumber ID is 0', 'The connection was closed'], a: 1, w: 'It reports rows affected. Zero often means the ID matched nothing, so show a missing-record message.' },
      { tag: 'ADO.NET', q: 'How does an OleDb command match parameter values to placeholders?', o: ['By parameter name', 'By position of the ? placeholders', 'Alphabetically', 'By data type'], a: 1, w: 'OleDb ignores names. Add parameters in exactly the order the ? marks appear.' },
      { tag: 'ADO.NET', q: 'Which statement separates data source from provider correctly?', o: ['Source is the library, provider is the file', 'Source is where data is stored, provider is the library that talks to it', 'They are the same thing', 'Provider is the DataTable'], a: 1, w: 'The .accdb is the source. System.Data.OleDb with the Access OLE DB engine is the provider.' },
      { tag: 'Binding', q: 'What does <code>BindingSource.MoveNext()</code> do?', o: ['Runs a SELECT for the next row', 'Writes the current row to Access', 'Moves the in-memory current record, with no SQL', 'Refills the DataSet'], a: 2, w: 'Navigation changes the local position only. Access is untouched.' },
      { tag: 'Binding', q: 'A user clicks New, types values, then closes the form. Is the row in Access?', o: ['Yes, AddNew() saves it', 'Yes, EndEdit() saves it', 'No, it needs TableAdapter.Update()', 'Only if the form is closed normally'], a: 2, w: 'AddNew() starts a row in memory. Validate, EndEdit, then Update writes it to the database.' },
      { tag: 'Binding', q: 'What is the right order to save a bound record?', o: ['Update, EndEdit, Validate', 'EndEdit, Update, Validate', 'Validate, EndEdit, Update', 'Update only'], a: 2, w: 'Validate and EndEdit push control values into the DataRow, then Update sends it to Access.' },
      { tag: 'Related data', q: 'Which ComboBox property gives the ID you should save?', o: ['Text', 'DisplayMember', 'SelectedValue (from ValueMember)', 'SelectedIndex'], a: 2, w: 'The student sees the name; the application saves the ID from SelectedValue.' },
      { tag: 'Related data', q: 'You want a review list to show the student name. What is the best design?', o: ['Copy StudentName into FundingApplication', 'JOIN Student to FundingApplication on StudentID', 'Store the name instead of the ID', 'Ask the user to type it'], a: 1, w: 'Display with a JOIN. Do not duplicate stored fields just to show them.' },
      { tag: 'Validation', q: 'Which is best for reading a decimal from a TextBox?', o: ['decimal.Parse and catch the error', 'decimal.TryParse and check the result', 'Convert.ToDecimal with no checks', 'Trust the TextBox'], a: 1, w: 'TryParse makes invalid text a predictable validation result instead of an exception.' },
      { tag: 'Validation', q: 'Where should the authoritative business rule "amount must be above zero" live?', o: ['Only in the form', 'Application logic (and the form for feedback)', 'Only in the database', 'In the label text'], a: 1, w: 'The form gives fast feedback, but logic is authoritative, since code can reach it without the UI.' },
      { tag: 'CRUD', q: 'Which is NOT a safe way to identify the row to UPDATE or DELETE?', o: ['The primary key', 'ApplicationID from the selected item', 'The grid row number', 'A parameter holding the ID'], a: 2, w: 'Row position changes with sorting, filtering and reloading. Use the primary key.' },
      { tag: 'Search', q: 'What does the pattern <code>%Moko%</code> match?', o: ['Names starting with Moko', 'Names ending with Moko', 'Names containing Moko', 'Exactly "Moko"'], a: 2, w: '% on both sides means "contains". Moko% would be a prefix search.' },
      { tag: 'Search', q: 'Why can a local BindingSource filter miss a record?', o: ['It is case-sensitive', 'It only narrows rows already loaded', 'It cannot sort', 'It needs a JOIN'], a: 1, w: 'A local filter cannot find rows that were never loaded. A SQL WHERE decides what comes back from Access.' },
      { tag: 'Errors', q: 'What is <code>finally</code> best used for in a save handler?', o: ['Showing the success message', 'Restoring UI state, such as re-enabling the button', 'Catching OleDbException', 'Opening the connection'], a: 1, w: 'finally runs whether the save worked or failed. Show success only after confirmed success.' },
      { tag: 'Errors', q: 'Which message is best when a save fails?', o: ['Invalid input', 'OleDbException: Syntax error in INSERT INTO at C:\\Labs\\db.accdb', 'The application could not be saved. Please try again or contact support.', 'Error 0x80004005'], a: 2, w: 'Say what failed and offer a next step. Keep SQL, stack traces and paths out of view and log them separately.' }
    ];
    var resetQuiz = mount(quizEl, Q, { score: '#quizScore', col: true });
    $('#quizReset').addEventListener('click', function () { resetQuiz = mount(quizEl, Q, { score: '#quizScore', col: true }); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
})();
