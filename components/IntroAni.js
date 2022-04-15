const IntroAni = () => {

  return (
      <div>
        <div id="ani_comp" style={{ marginTop: "240px", width: "160px", height: "160px" }}>

        {/**
         * Item 1
         */}
          <svg id="ani_1" width="206px" height="206px" viewBox="0 0 206 206" version="1.1" style={{ position: "absolute", zIndex: "5" }}>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <rect id="Rectangle" fill="#5D4A26" x="86" y="138" width="34" height="60"></rect>
            </g>
          </svg>

        {/**
         * Item 2
         */}
          <svg id="ani_2" width="206px" height="206px" viewBox="0 0 206 206" version="1.1" style={{ position: "absolute", zIndex: "4" }}>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Rectangle" fill="#FBEED4" transform="translate(111.097484, 151.023783) rotate(345.000000) translate(-111.097484, -151.023783) " points="61.4858793 95.5237835 181.097484 117.149249 170.106481 206.523783 41.0974837 171.985157"></polygon>
            </g>
          </svg>

        {/**
         * Item 3
         */}
          <svg width="206px" height="206px" viewBox="0 0 206 206" version="1.1" style={{ position: "absolute", zIndex: "3" }}>
            <g id="ani_3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Rectangle" fill="#1E304E" transform="translate(126.691958, 114.754420) rotate(30.000000) translate(-126.691958, -114.754420) " points="66.4844646 68.2010865 186.899451 66.4207725 186.026384 148.908576 121.466783 163.088068"></polygon>
            </g>
          </svg>

          {/**
         * Item 4
         */}
          <svg width="206px" height="206px" viewBox="0 0 206 206" version="1.1" style={{ position: "absolute", zIndex: "2" }}>
            <g id="ani_4" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <rect id="Rectangle" fill="#586781" x="12" y="86" width="146" height="78"></rect>
            </g>
          </svg>

        {/**
         * Item 4
         */}
          <svg id="ani_5" width="206px" height="206px" viewBox="0 0 206 206" version="1.1">
            <defs>
              <linearGradient x1="50%" y1="81.9114283%" x2="50%" y2="3.24056307%" id="linearGradient-1">
                <stop stopColor="#FFFFFF" offset="0%"></stop>
                <stop stopColor="#074AA7" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <rect id="Rectangle" fill="url(#linearGradient-1)" x="29" y="25" width="155" height="155" rx="77.5"></rect>
            </g>
          </svg>

        </div>
        <div id="lbm_logo" style={{ marginTop: "80px", marginLeft: "80px", width: "160px", height: "160px", color: "white" }}>
          <h1>LBM</h1>
        </div>
      </div>
  )
}

export default IntroAni;