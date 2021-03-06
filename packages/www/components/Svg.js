import React from 'react'

export const BoldIcon = props => (
  <svg
    className="prefix__svgIcon-use"
    {...props}
    fill="#484848"
    width="1em"
    height="1em"
  >
    <path
      d="M10.308 17.993h-5.92l.11-.894.783-.12c.56-.11.79-.224.79-.448V5.37c0-.225-.113-.336-.902-.448H4.5l-.114-.894h6.255c4.02 0 5.58 1.23 5.58 3.13 0 1.896-1.78 3.125-3.79 3.463v.11c2.69.34 4.25 1.56 4.25 3.57 0 2.35-2.01 3.69-6.37 3.69l.02.01h-.02zm-.335-12.96H8.967V10.5h1.23c1.788 0 2.79-1.23 2.79-2.683 0-1.685-1.004-2.803-3.006-2.803v.02zm-.223 6.36h-.783v5.588l1.225.23h.22c1.67 0 3.01-1.004 3.01-2.792 0-2.122-1.566-3.016-3.69-3.016h.018z"
      fillRule="evenodd"
    />
  </svg>
)

export const ItalicIcon = props => (
  <svg
    className="prefix__svgIcon-use"
    width="1em"
    height="1em"
    {...props}
    fill="#484848"
  >
    <path
      d="M9.847 18.04c-.533 0-2.027-.64-1.92-.853l2.027-7.68-.64-.214-1.387 1.494-.427-.427c.534-1.173 1.707-2.667 2.774-2.667.533 0 2.24.534 2.133.854l-2.133 7.786.533.214 1.6-1.067.427.427c-.64 1.066-1.92 2.133-2.987 2.133zm2.347-11.733c-.96 0-1.387-.64-1.387-1.387 0-1.067.747-1.92 1.493-1.92.854 0 1.387.64 1.387 1.493-.107 1.067-.747 1.814-1.493 1.814z"
      fillRule="evenodd"
    />
  </svg>
)

export const HeaderBigIcon = props => (
  <svg
    className="prefix__svgIcon-use"
    width="1em"
    height="1em"
    fill="#484848"
    {...props}
  >
    <path
      d="M3 2v4.747h1.656l.383-2.568.384-.311h3.88V15.82l-.408.38-1.56.12V18h7.174v-1.68l-1.56-.12-.407-.38V3.868h3.879l.36.311.407 2.568h1.656V2z"
      fillRule="evenodd"
    />
  </svg>
)

export const HeaderSmallIcon = props => (
  <svg
    className="prefix__svgIcon-use"
    fill="#484848"
    {...props}
    width="1em"
    height="1em"
  >
    <path
      d="M4 5.5v4.74h1.657l.384-2.569.384-.312h2.733v8.461l-.41.38-1.91.12V18h7.179v-1.68l-1.912-.12-.405-.38V7.359h2.729l.36.312.408 2.57h1.657V5.5z"
      fillRule="evenodd"
    />
  </svg>
)

export const Diamond = props => (
  <svg viewBox="0 0 512 512" {...props}>
    <path
      fill="#ffe182"
      d="M360.129 172.138L256 472.276l256-300.138z"
      stroke="#ffe182"
      strokeWidth="1"
    />
    <g fill="#ffcd73" stroke="#ffe182" strokeWidth="1">
      <path d="M105.931 39.724L0 172.138h151.871zM360.129 172.138H512L406.069 39.724zM360.129 172.138L256 39.724 151.871 172.138z" />
    </g>
    <path
      fill="#ffaa64"
      d="M256 39.724H105.931l45.94 132.414z"
      stroke="#ffaa64"
      strokeWidth="1"
    />
    <path
      fill="#ffe182"
      d="M406.069 39.724H256l104.129 132.414z"
      stroke="#ffe182"
      strokeWidth="1"
    />
    <path
      fill="#ffaa64"
      d="M151.871 172.138L256 472.276l104.129-300.138z"
      stroke="#ffaa64"
      strokeWidth="1"
    />
    <path
      fill="#ff8c5a"
      d="M0 172.138l256 300.138-104.129-300.138z"
      stroke="#ff8c5a"
      strokeWidth="1"
    />
  </svg>
)

export const Caret = props => (
  <svg width={14} height={8} viewBox="0 0 11 7" {...props}>
    <path
      d="M1.5 1.5l4 4.091M9.743 1.5L5.822 5.58"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
      stroke="#979797"
    />
  </svg>
)

export const Dots = props => (
  <svg width={2} height={12} {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path d="M2 0v1.846H0V0zM2 5.077v1.846H0V5.077zM2 10.154V12H0v-1.846z" />
    </g>
  </svg>
)

export const Plus = props => (
  <svg width={14} height={14} viewBox="174 112 11 12" {...props}>
    <path d="M179.5 113v10m-5-5h10" stroke="#979797" />
  </svg>
)
