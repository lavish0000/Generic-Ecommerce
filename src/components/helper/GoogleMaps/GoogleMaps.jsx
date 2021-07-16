import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ children, bootstrapURLKeys = {}, ...props }) => (
    <div className="h-80">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAP_KEY,
          ...bootstrapURLKeys,
        }}
        {...props}
      >
        {children}
      </GoogleMapReact>
    </div>
  );

  GoogleMap.defaultProps = {
    children: null,
  };
  
  export default GoogleMap;