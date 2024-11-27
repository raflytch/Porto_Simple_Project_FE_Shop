import { useState, useEffect } from 'react';
import { getProfileById } from '../services/profileDetail.service';

const useProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfileById(userId);
        setProfile(profileData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  return { profile, isLoading, error };
};

export default useProfile;
