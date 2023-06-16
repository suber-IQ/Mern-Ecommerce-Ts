import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
      const navigate = useNavigate();
      const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.user);
      useEffect(() => {
            if (isAuthenticated === false) {
                  navigate('/login')
            }
      }, [isAuthenticated, navigate]);
      return (
            <main>
                  {
                        loading ? (
                              <>
                                    <CustomLoader />
                              </>
                        ) : (
                              <>
                                    <div>
                                          <CustomHeading level={3} children={"My Profile"} />
                                          <img src={user?.avatar.url} alt={user?.name} />
                                          <CustomRouteLink to={"/me/update"} children="Edit Profile" />
                                    </div>
                                    <div>
                                          <div>
                                                <CustomHeading level={4} children={"Full Name:"} />
                                                <CustomHeading level={4} children={user?.name} />
                                          </div>
                                          <div>
                                                <CustomHeading level={4} children={"Email:"} />
                                                <CustomHeading level={4} children={user?.email} />
                                          </div>
                                          <div>
                                                <CustomHeading level={4} children={"Joined On"} />
                                                <CustomHeading level={4} children={String(user?.createdAt).substring(0, 10)} />
                                          </div>
                                          <div>
                                                <CustomRouteLink to={"/orders"} children="My Orders" />
                                                <CustomRouteLink to={"/password"} children="Change Password" />

                                          </div>
                                    </div>
                              </>
                        )
                  }

            </main>
      )
}

export default Profile