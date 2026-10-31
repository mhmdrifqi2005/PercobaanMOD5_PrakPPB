import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import userService from '../services/userService'

export default function EditProfilePage({ onBack, onSuccess }) {
  const [profile] = useState(() => userService.getUserProfile())
  const [username, setUsername] = useState(profile.username || '')
  const [bio, setBio] = useState(profile.bio || '')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const updated = userService.saveUserProfile({
      ...profile,
      username: username.trim() || 'Shooter',
      bio: bio.trim(),
    })

    if (!updated.success) {
      setError(updated.message || 'Failed to save profile.')
      return
    }

    onSuccess()
  }

  return (
    <div className="profile-page">
      <section className="masthead">
        <button type="button" className="btn btn--outline btn--sm" onClick={onBack}>
          <ArrowLeft size={14} /> Back to profile
        </button>
        <h1 className="display">Edit profile</h1>
        <p className="lede">Update the name and bio shown on your profile.</p>
      </section>

      {error && <div className="toast toast--error" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="profile-name" className="form-label">Name</label>
          <input
            id="profile-name"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="form-input"
            maxLength={60}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profile-bio" className="form-label">Bio</label>
          <textarea
            id="profile-bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            className="form-textarea"
            rows={4}
            maxLength={300}
          />
        </div>

        <button type="submit" className="btn btn--primary">
          <Save size={16} /> Save profile
        </button>
      </form>
    </div>
  )
}
