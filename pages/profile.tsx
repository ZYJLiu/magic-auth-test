import { useContext } from "react"
import { UserContext, User } from "../lib/UserContext"
import Loading from "../components/loading"

const Profile = () => {
  const context = useContext(UserContext)
  const user: User | null = context ? context.user : null
  console.log("Profile:", JSON.stringify(user, null, 2))

  return (
    <>
      {user === null ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <div className="label">Issuer</div>
            <div className="profile-info">{user.issuer}</div>

            <div className="label">Public Address</div>
            <div className="profile-info">{user.publicAddress}</div>

            <div className="label">Email</div>
            <div className="profile-info">{user.email}</div>

            <div className="label">MFA Enabled</div>
            <div className="profile-info">
              {user.isMfaEnabled ? "Yes" : "No"}
            </div>

            <div className="label">Phone Number</div>
            <div className="profile-info">
              {user.phoneNumber || "Not provided"}
            </div>

            <div className="label">Wallet Type</div>
            <div className="profile-info">{user.walletType}</div>
          </>
        )
      )}
      <style jsx>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </>
  )
}

export default Profile
