import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { Button, Card } from '../components/UIComponents.jsx'
import { getAvatar } from '../utils/helpers.js'
import { Save, Camera, Trash2, Upload } from 'lucide-react'

export default function Profile() {
  const { user, updateProfile, showToast, streak, points } = useApp()

  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')

  const [college, setCollege] = useState(user?.college || '')
  const [branch, setBranch] = useState(user?.branch || '')
  const [year, setYear] = useState(user?.year || '')
  const [skills, setSkills] = useState(user?.skills || '')
  const [github, setGithub] = useState(user?.github || '')
  const [linkedin, setLinkedin] = useState(user?.linkedin || '')

  const [avatarSeed, setAvatarSeed] = useState(
    user?.avatar || getAvatar(user?.email || '')
  )
  const [avatarFile, setAvatarFile] = useState(null)

  const [showPreview, setShowPreview] = useState(false)
  const [showEditAvatar, setShowEditAvatar] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    border border-gray-200 dark:border-gray-700
    bg-white dark:bg-gray-900
    text-gray-800 dark:text-white text-sm
    focus:ring-2 focus:ring-indigo-500 outline-none
  `

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowPreview(false)
        setShowEditAvatar(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // memory cleanup (important)
  useEffect(() => {
    return () => {
      if (avatarFile) URL.revokeObjectURL(avatarSeed)
    }
  }, [avatarFile])

  const isChanged =
    name !== user.name ||
    bio !== user.bio ||
    college !== user.college ||
    branch !== user.branch ||
    year !== user.year ||
    skills !== user.skills ||
    github !== user.github ||
    linkedin !== user.linkedin ||
    avatarFile

  const handleSave = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      showToast("Name required")
      return
    }

    try {
      setLoading(true)

      await updateProfile({
        name,
        bio,
        avatar: avatarSeed,
        avatarFile,
        college,
        branch,
        year,
        skills,
        github,
        linkedin
      })

      showToast('Profile updated!')
    } catch (err) {
      showToast('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveAvatar = () => {
    const newAvatar = getAvatar(user?.email || '')
    setAvatarSeed(newAvatar)
    setAvatarFile(null)
  }

  if (!user) return null

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profile 👤
        </h1>

        {/* PROFILE CARD */}
        <Card>
          <div className="flex flex-col sm:flex-row items-center gap-8">

            {/* AVATAR */}
            <div className="relative">
              <img
                src={avatarSeed}
                alt="User avatar"
                onClick={() => setShowPreview(true)}
                className="w-24 h-24 rounded-full object-cover cursor-pointer border-4 border-indigo-200 dark:border-indigo-500/30 hover:scale-105 transition"
              />

              <button
                onClick={() => setShowEditAvatar(true)}
                className="absolute -bottom-1 -right-1 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                <Camera size={14} />
              </button>
            </div>

            {/* INFO */}
            <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>

              <div className="flex gap-3 mt-3">
                <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  🔥 {streak} days
                </span>

                <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  ⭐ {points} points
                </span>
              </div>
            </div>

          </div>
        </Card>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card><p className="text-sm">Tasks</p><h2 className="text-xl font-bold">42</h2></Card>
          <Card><p className="text-sm">Streak</p><h2 className="text-xl font-bold">{streak}</h2></Card>
          <Card><p className="text-sm">Points</p><h2 className="text-xl font-bold">{points}</h2></Card>
        </div>

        {/* FORM */}
        <Card title="Edit Profile">
          <form onSubmit={handleSave} className="grid gap-5">

            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className={inputClass} />

            <div>
              <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={120} placeholder="Bio" className={inputClass} />
              <p className="text-xs text-gray-400 mt-1">{bio.length}/120</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input value={college} onChange={e => setCollege(e.target.value)} placeholder="College" className={inputClass} />
              <input value={branch} onChange={e => setBranch(e.target.value)} placeholder="Branch" className={inputClass} />
              <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" className={inputClass} />
              <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Skills" className={inputClass} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input value={github} onChange={e => setGithub(e.target.value)} placeholder="GitHub URL" className={inputClass} />
              <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className={inputClass} />
            </div>

            <Button disabled={!isChanged || loading} className="flex items-center gap-2 px-5">
              {loading ? 'Saving...' : <><Save size={16}/> Save Changes</>}
            </Button>

          </form>
        </Card>

      </div>

      {/* 🔥 IMAGE PREVIEW */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPreview(false)
          }}
        >

          {/* ✕ BUTTON */}
          <button
            onClick={() => setShowPreview(false)}
            className="
              absolute top-6 right-6 z-50
              text-white text-2xl
              p-2 rounded-full
              hover:bg-white/10 hover:scale-110
              transition
            "
          >
            ✕
          </button>

          <img
            src={avatarSeed}
            alt="Full Avatar"
            className="max-h-[80vh] max-w-[90%] object-contain rounded-2xl shadow-2xl"
          />

        </div>
      )}

      {/* 🔥 EDIT MODAL */}
      {showEditAvatar && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setShowEditAvatar(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-[90%] max-w-sm flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >

            <img src={avatarSeed} className="w-24 h-24 rounded-full" />

            <input
              type="file"
              id="avatarUpload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setAvatarFile(file)
                  setAvatarSeed(URL.createObjectURL(file))
                }
              }}
            />

            <button
              onClick={() => document.getElementById('avatarUpload').click()}
              className="flex items-center gap-2 text-indigo-600"
            >
              <Upload size={16}/> Upload
            </button>

            <button
              onClick={handleRemoveAvatar}
              className="flex items-center gap-2 text-red-500"
            >
              <Trash2 size={16}/> Remove
            </button>

            <Button onClick={() => setShowEditAvatar(false)}>
              Cancel
            </Button>

          </div>
        </div>
      )}

    </div>
  )
}