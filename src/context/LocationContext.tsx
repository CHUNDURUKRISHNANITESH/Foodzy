import React, {
  createContext,
  useContext,
  useState,
} from 'react';

type LocationType = {
  latitude: number;
  longitude: number;
} | null;

type LocationContextType = {
  userLocation: LocationType;
  setUserLocation: React.Dispatch<
    React.SetStateAction<LocationType>
  >;
};

const LocationContext =
  createContext<LocationContextType | undefined>(
    undefined
  );

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLocation, setUserLocation] =
    useState<LocationType>(null);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      'useLocation must be used inside LocationProvider'
    );
  }

  return context;
};