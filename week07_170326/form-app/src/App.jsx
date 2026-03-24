import { useState } from 'react'

/* ── Styles ─────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --bg: #0a0a0f; --bg2: #111118; --bg3: #1a1a24;
    --surface: #1e1e2a; --surface2: #252535;
    --border: #2e2e42; --border2: #3d3d56;
    --accent: #7c6dfa; --accent2: #a594fc; --accent3: #c4b8fd;
    --green: #34d399; --green2: #6ee7b7;
    --red: #f87171; --amber: #fbbf24;
    --text: #f0eeff; --text2: #a9a4c8; --text3: #6b668a;
    --radius: 14px; --radius-sm: 8px;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background: var(--bg); color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    line-height: 1.6; min-height: 100vh;
  }
  .app { max-width: 780px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }

  /* Header */
  .header { margin-bottom: 2.5rem; }
  .header-eyebrow {
    font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
    color: var(--accent2); font-family: 'Syne', sans-serif;
    font-weight: 600; margin-bottom: .5rem;
  }
  .header-title {
    font-size: clamp(28px, 5vw, 42px); font-weight: 800;
    line-height: 1.1; letter-spacing: -.02em;
    background: linear-gradient(135deg, var(--text) 40%, var(--accent3));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: .5rem;
  }
  .header-sub { color: var(--text2); font-size: 14px; font-weight: 300; }

  /* Nav */
  .nav {
    display: flex; gap: 6px; margin-bottom: 2rem;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: calc(var(--radius) + 4px); padding: 5px;
  }
  .nav-btn {
    flex: 1; padding: 9px 0; font-family: 'Syne', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: .04em;
    border: none; background: transparent; color: var(--text3);
    border-radius: var(--radius-sm); cursor: pointer; transition: all .2s;
  }
  .nav-btn:hover { color: var(--text2); background: var(--surface); }
  .nav-btn.active {
    background: var(--accent); color: #fff;
    box-shadow: 0 4px 20px rgba(124,109,250,.35);
  }

  /* Section label */
  .sec-label {
    font-size: 10.5px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: var(--text3);
    font-family: 'Syne', sans-serif; margin-bottom: 1rem;
  }

  /* Card */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 1.25rem;
  }
  .card + .card, .card + .sec-label { margin-top: 1rem; }

  /* Chips */
  .chip {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 600; font-family: 'Syne', sans-serif;
    letter-spacing: .05em; padding: 3px 10px; border-radius: 20px;
  }
  .chip-green { background: rgba(52,211,153,.12); color: var(--green2); border: 1px solid rgba(52,211,153,.2); }
  .chip-amber { background: rgba(251,191,36,.1);  color: var(--amber);  border: 1px solid rgba(251,191,36,.18); }
  .chip-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* User cards */
  .user-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 1rem; }
  .user-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 1rem; cursor: pointer;
    transition: all .2s; position: relative; overflow: hidden;
  }
  .user-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(124,109,250,.07), transparent);
    opacity: 0; transition: opacity .2s;
  }
  .user-card:hover::before { opacity: 1; }
  .user-card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .user-card.selected {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent), 0 8px 32px rgba(124,109,250,.2);
  }
  .user-card.selected::before { opacity: 1; }
  .avatar {
    width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
    margin-bottom: 10px; letter-spacing: .04em;
  }
  .av-purple { background: rgba(124,109,250,.18); color: var(--accent2); }
  .av-green  { background: rgba(52,211,153,.15);  color: var(--green);   }
  .av-amber  { background: rgba(251,191,36,.13);  color: var(--amber);   }
  .user-name { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; margin-bottom: 3px; }
  .user-role { font-size: 11.5px; color: var(--text3); margin-bottom: 8px; }

  /* Detail box */
  .detail-box {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: .9rem 1rem;
  }
  .detail-row { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .detail-label { color: var(--text3); min-width: 70px; font-size: 12px; }
  .code-pill {
    background: rgba(124,109,250,.12); color: var(--accent3);
    border: 1px solid rgba(124,109,250,.2); padding: 2px 8px;
    border-radius: 6px; font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 600;
  }

  /* Counter */
  .counter-wrap {
    display: flex; align-items: center; background: var(--bg2);
    border: 1px solid var(--border); border-radius: var(--radius);
    overflow: hidden; margin-bottom: 1rem;
  }
  .count-btn {
    width: 54px; height: 54px; border: none; background: transparent;
    color: var(--text2); font-size: 22px; cursor: pointer;
    transition: all .15s; font-family: 'Syne', sans-serif;
  }
  .count-btn:hover { background: var(--surface2); color: var(--text); }
  .count-btn:active { transform: scale(.93); }
  .count-num {
    flex: 1; text-align: center; font-family: 'Syne', sans-serif;
    font-size: 32px; font-weight: 800; letter-spacing: -.03em; transition: color .2s;
  }
  .count-reset {
    padding: 0 18px; height: 54px; border: none;
    border-left: 1px solid var(--border); background: transparent;
    color: var(--text3); font-size: 11px; font-family: 'Syne', sans-serif;
    font-weight: 700; letter-spacing: .08em; cursor: pointer; transition: all .15s;
  }
  .count-reset:hover { color: var(--red); background: rgba(248,113,113,.07); }

  /* Likes */
  .post-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: .75rem 0; border-bottom: 1px solid var(--border);
  }
  .post-row:last-child { border-bottom: none; }
  .post-text { font-size: 13.5px; color: var(--text2); }
  .like-btn {
    display: flex; align-items: center; gap: 6px; padding: 6px 14px;
    border-radius: 8px; border: 1px solid var(--border); background: transparent;
    color: var(--text3); font-size: 12px; font-family: 'Syne', sans-serif;
    font-weight: 600; cursor: pointer; transition: all .18s;
  }
  .like-btn:hover { border-color: var(--border2); color: var(--text2); }
  .like-btn.liked { background: rgba(248,113,113,.1); border-color: rgba(248,113,113,.25); color: var(--red); }

  /* Forms */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
  .field-label {
    font-size: 11px; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; font-family: 'Syne', sans-serif; color: var(--text3);
  }
  .field-input {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 10px 14px; color: var(--text);
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    outline: none; transition: all .15s; width: 100%;
  }
  .field-input:focus { border-color: var(--accent); background: var(--bg3); }
  .field-input.has-err { border-color: var(--red); }
  .field-input::placeholder { color: var(--text3); }
  .field-err { font-size: 11px; color: var(--red); font-family: 'Syne', sans-serif; font-weight: 600; }
  .form-select {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 10px 14px; color: var(--text);
    font-size: 13.5px; font-family: 'DM Sans', sans-serif; outline: none;
    width: 100%; transition: border-color .15s; appearance: none; cursor: pointer;
  }
  .form-select:focus { border-color: var(--accent); }
  .form-textarea { resize: vertical; min-height: 80px; }
  .submit-row { display: flex; gap: 8px; margin-top: 4px; }
  .btn-submit {
    flex: 1; padding: 11px; background: var(--accent); border: none;
    border-radius: var(--radius-sm); color: #fff; font-size: 13px;
    font-family: 'Syne', sans-serif; font-weight: 700; letter-spacing: .06em;
    cursor: pointer; transition: all .18s;
  }
  .btn-submit:hover { background: var(--accent2); transform: translateY(-1px); }
  .btn-submit:active { transform: scale(.98); }
  .btn-clear {
    padding: 11px 20px; background: transparent; border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text3); font-size: 12px;
    font-family: 'Syne', sans-serif; font-weight: 700; letter-spacing: .06em;
    cursor: pointer; transition: all .15s;
  }
  .btn-clear:hover { border-color: var(--border2); color: var(--text2); }
  .success-bar {
    background: rgba(52,211,153,.1); border: 1px solid rgba(52,211,153,.22);
    border-radius: var(--radius-sm); padding: 10px 14px; font-size: 13px;
    color: var(--green2); margin-top: 10px; display: flex; align-items: center;
    gap: 8px; font-family: 'Syne', sans-serif; font-weight: 600;
  }
  .success-icon {
    width: 18px; height: 18px; background: var(--green); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 10px; color: #000;
  }
  .hint { font-size: 12.5px; color: var(--text3); padding: 8px 0; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .page-enter { animation: fadeIn .22s ease; }
`

/* ── Data ──────────────────────────────────────────────────── */
const USERS = [
  { id: 1, name: 'Alice Chen', role: 'Admin',  avatar: 'AC', av: 'av-purple', status: 'active'   },
  { id: 2, name: 'Ben Roy',   role: 'Editor', avatar: 'BR', av: 'av-green',  status: 'active'   },
  { id: 3, name: 'Clara M.',  role: 'Viewer', avatar: 'CM', av: 'av-amber',  status: 'inactive' },
]
const POSTS = [
  'Components are reusable UI units',
  'State triggers re-renders',
  'Props flow parent → child',
]
const INITIAL_FORM = { name: '', email: '', role: 'viewer', bio: '' }

/* ── Components Page ───────────────────────────────────────── */
function UserCard({ user, selected, onSelect }) {
  return (
    <div className={`user-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(user.id)}>
      <div className={`avatar ${user.av}`}>{user.avatar}</div>
      <div className="user-name">{user.name}</div>
      <div className="user-role">{user.role}</div>
      <span className={`chip ${user.status === 'active' ? 'chip-green' : 'chip-amber'}`}>
        <span className="chip-dot" />
        {user.status}
      </span>
    </div>
  )
}

function ComponentsPage() {
  const [selectedUser, setSelectedUser] = useState(null)
  const toggle = (id) => setSelectedUser((prev) => (prev === id ? null : id))
  const selected = USERS.find((u) => u.id === selectedUser)

  return (
    <>
      <p className="sec-label">Components + Props — click to inspect</p>
      <div className="user-grid">
        {USERS.map((user) => (
          <UserCard key={user.id} user={user} selected={selectedUser === user.id} onSelect={toggle} />
        ))}
      </div>
      {selected ? (
        <div className="detail-box">
          <div className="detail-row" style={{ marginBottom: 6 }}>
            <span className="detail-label">Props passed</span>
            {['user', 'selected', 'onSelect'].map((p) => (
              <span key={p} className="code-pill">{p}</span>
            ))}
          </div>
          <div className="detail-row">
            <span className="detail-label">Values</span>
            <span style={{ fontSize: 12, color: 'var(--text2)' }}>
              "{selected.name}" · "{selected.role}" · "{selected.status}"
            </span>
          </div>
        </div>
      ) : (
        <p className="hint">Select a user card to inspect its props →</p>
      )}
    </>
  )
}

/* ── State Page ────────────────────────────────────────────── */
function StatePage() {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState({})
  const toggleLike = (i) => setLiked((prev) => ({ ...prev, [i]: !prev[i] }))
  const countColor = count > 0 ? 'var(--green)' : count < 0 ? 'var(--red)' : 'var(--accent3)'
  const likedCount = Object.values(liked).filter(Boolean).length

  return (
    <>
      <p className="sec-label">State — useState hook</p>
      <div className="counter-wrap">
        <button className="count-btn" onClick={() => setCount((c) => c - 1)}>−</button>
        <div className="count-num" style={{ color: countColor }}>{count}</div>
        <button className="count-btn" onClick={() => setCount((c) => c + 1)}>+</button>
        <button className="count-reset" onClick={() => setCount(0)}>RESET</button>
      </div>
      <div className="card">
        {POSTS.map((post, i) => (
          <div className="post-row" key={i}>
            <span className="post-text">{post}</span>
            <button className={`like-btn ${liked[i] ? 'liked' : ''}`} onClick={() => toggleLike(i)}>
              <span>{liked[i] ? '♥' : '♡'}</span>
              {liked[i] ? 'Liked' : 'Like'}
            </button>
          </div>
        ))}
        <div style={{ paddingTop: '.6rem', fontSize: 12, color: 'var(--text3)', fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
          {likedCount}/{POSTS.length} liked
        </div>
      </div>
    </>
  )
}

/* ── Events Page ───────────────────────────────────────────── */
function EventsPage() {
  const [log, setLog] = useState(['App mounted — ready'])
  const addLog = (msg) => setLog((prev) => [msg, ...prev].slice(0, 10))
  const clearLog = () => setLog(['Log cleared'])

  return (
    <>
      <p className="sec-label">Events — live event log</p>
      <input
        className="ev-input"
        placeholder="Type to fire onChange · focus/blur also log"
        onChange={(e) => addLog(`onChange → value: "${e.target.value.slice(-16)}"`)}
        onFocus={() => addLog('onFocus fired')}
        onBlur={() => addLog('onBlur fired')}
      />
      <div className="event-btns">
        <button className="ev-btn" onClick={() => addLog('onClick fired')}>onClick</button>
        <button className="ev-btn"
          onMouseEnter={() => addLog('onMouseEnter fired')}
          onMouseLeave={() => addLog('onMouseLeave fired')}>
          onMouseEnter / Leave
        </button>
        <button className="ev-btn primary-ev" onDoubleClick={() => addLog('onDoubleClick fired')}>
          Double-click me
        </button>
        <button className="ev-btn"
          onContextMenu={(e) => { e.preventDefault(); addLog('onContextMenu (right-click)') }}>
          Right-click
        </button>
      </div>
      <div className="event-log">
        <div className="log-header">
          <span>Event log</span>
          <button className="log-clear" onClick={clearLog}>CLEAR</button>
        </div>
        <div className="log-entries">
          {log.map((entry, i) => (
            <div key={i} className={`log-entry ${i === 0 ? 'latest' : ''}`}>
              <div className="log-dot" />
              {entry}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Forms Page ────────────────────────────────────────────── */
function validate(form) {
  const errs = {}
  if (!form.name.trim())  errs.name  = 'Name is required'
  if (!form.email.trim()) errs.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
  if (!form.bio.trim())   errs.bio   = 'Bio is required'
  return errs
}

function FormsPage() {
  const [form, setForm]       = useState(INITIAL_FORM)
  const [errors, setErrors]   = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setSuccess(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSuccess(true)
  }

  const handleReset = () => { setForm(INITIAL_FORM); setErrors({}); setSuccess(false) }

  return (
    <>
      <p className="sec-label">Forms — controlled inputs + validation</p>
      <div className="card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="field">
              <label className="field-label">Name</label>
              <input className={`field-input ${errors.name ? 'has-err' : ''}`}
                placeholder="Your name" value={form.name} onChange={handleChange('name')} />
              {errors.name && <span className="field-err">{errors.name}</span>}
            </div>
            <div className="field">
              <label className="field-label">Email</label>
              <input className={`field-input ${errors.email ? 'has-err' : ''}`}
                type="email" placeholder="you@example.com" value={form.email} onChange={handleChange('email')} />
              {errors.email && <span className="field-err">{errors.email}</span>}
            </div>
          </div>
          <div className="field">
            <label className="field-label">Role</label>
            <select className="form-select" value={form.role} onChange={handleChange('role')}>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label">Bio</label>
            <textarea className={`field-input form-textarea ${errors.bio ? 'has-err' : ''}`}
              placeholder="Write something…" value={form.bio} onChange={handleChange('bio')} />
            {errors.bio && <span className="field-err">{errors.bio}</span>}
          </div>
          <div className="submit-row">
            <button type="submit" className="btn-submit">Submit form</button>
            <button type="button" className="btn-clear" onClick={handleReset}>Clear</button>
          </div>
        </form>
        {success && (
          <div className="success-bar">
            <div className="success-icon">✓</div>
            Submitted! Welcome, {form.name} ({form.role})
          </div>
        )}
      </div>
    </>
  )
}

/* ── Root App ──────────────────────────────────────────────── */
const PAGES   = { components: ComponentsPage, state: StatePage, forms: FormsPage }
const LABELS  = { components: 'Components', state: 'State', forms: 'Forms' }

export default function App() {
  const [page, setPage] = useState('state')
  const PageComponent = PAGES[page]

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="header-eyebrow">Interactive Demo</div>
          <h1 className="header-title">React Fundamentals</h1>
          <p className="header-sub">Components · Props · State · Events · Forms</p>
        </header>

        <nav className="nav">
          {Object.keys(PAGES).map((p) => (
            <button key={p} className={`nav-btn ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>
              {LABELS[p]}
            </button>
          ))}
        </nav>

        <main key={page} className="page-enter">
          <PageComponent />
        </main>
      </div>
    </>
  )
}
