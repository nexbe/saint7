if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let r={};const t=e=>c(e,a),o={module:{uri:a},exports:r,require:t};s[a]=Promise.all(n.map((e=>o[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Group 517347097.png",revision:"38b040ee001fc258564cf3182f65fd1e"},{url:"/_next/static/chunks/0b7b90cd.95f2ef59b113ef58.js",revision:"95f2ef59b113ef58"},{url:"/_next/static/chunks/0c428ae2-cb28f1e8a4f7278f.js",revision:"cb28f1e8a4f7278f"},{url:"/_next/static/chunks/1724-3b580597faeb11ec.js",revision:"3b580597faeb11ec"},{url:"/_next/static/chunks/1a48c3c1-b83a507458c68d96.js",revision:"b83a507458c68d96"},{url:"/_next/static/chunks/1bfc9850-029738a26833855a.js",revision:"029738a26833855a"},{url:"/_next/static/chunks/2435-486f570d93f3b464.js",revision:"486f570d93f3b464"},{url:"/_next/static/chunks/252f366e-b26b17def32e66b2.js",revision:"b26b17def32e66b2"},{url:"/_next/static/chunks/29107295-bde914c24802d4ea.js",revision:"bde914c24802d4ea"},{url:"/_next/static/chunks/3725-42dfe2998147c453.js",revision:"42dfe2998147c453"},{url:"/_next/static/chunks/3998-6577ae25f476aa2a.js",revision:"6577ae25f476aa2a"},{url:"/_next/static/chunks/5250-b8801570bd085788.js",revision:"b8801570bd085788"},{url:"/_next/static/chunks/5253-8e26e32800e8fce0.js",revision:"8e26e32800e8fce0"},{url:"/_next/static/chunks/5352-cdf26d7bc87e93f7.js",revision:"cdf26d7bc87e93f7"},{url:"/_next/static/chunks/6058-88ecbdd2bf4eb759.js",revision:"88ecbdd2bf4eb759"},{url:"/_next/static/chunks/6437-2a1b50c55fa69bc4.js",revision:"2a1b50c55fa69bc4"},{url:"/_next/static/chunks/75fc9c18-32258fcab9687763.js",revision:"32258fcab9687763"},{url:"/_next/static/chunks/78e521c3-db65baf81612cd1e.js",revision:"db65baf81612cd1e"},{url:"/_next/static/chunks/8369-6abe1a0e57728701.js",revision:"6abe1a0e57728701"},{url:"/_next/static/chunks/8464-c37089e6891d670d.js",revision:"c37089e6891d670d"},{url:"/_next/static/chunks/8503.50cbe75ecb240273.js",revision:"50cbe75ecb240273"},{url:"/_next/static/chunks/8602-8ee890337ca709c9.js",revision:"8ee890337ca709c9"},{url:"/_next/static/chunks/884-2cc621e4ee84cb8e.js",revision:"2cc621e4ee84cb8e"},{url:"/_next/static/chunks/8863-4c77b52f0c4caa2b.js",revision:"4c77b52f0c4caa2b"},{url:"/_next/static/chunks/8947-3d44152c67c9aa66.js",revision:"3d44152c67c9aa66"},{url:"/_next/static/chunks/9154-05590667e785a5fa.js",revision:"05590667e785a5fa"},{url:"/_next/static/chunks/9515-c96e7a530c2f90d0.js",revision:"c96e7a530c2f90d0"},{url:"/_next/static/chunks/957-8f6f675288d46a3f.js",revision:"8f6f675288d46a3f"},{url:"/_next/static/chunks/a3ff1dbb-65d0f11d5856b594.js",revision:"65d0f11d5856b594"},{url:"/_next/static/chunks/ae51ba48-075bd16c039e9038.js",revision:"075bd16c039e9038"},{url:"/_next/static/chunks/d7eeaac4-510990e4d726a4dd.js",revision:"510990e4d726a4dd"},{url:"/_next/static/chunks/ee8b1517-29b401c41ab9f34e.js",revision:"29b401c41ab9f34e"},{url:"/_next/static/chunks/framework-f570b424fd8349c2.js",revision:"f570b424fd8349c2"},{url:"/_next/static/chunks/main-845b7918f87b29a0.js",revision:"845b7918f87b29a0"},{url:"/_next/static/chunks/pages/_app-07167b985debb2a7.js",revision:"07167b985debb2a7"},{url:"/_next/static/chunks/pages/_error-bd1da5a6907513b5.js",revision:"bd1da5a6907513b5"},{url:"/_next/static/chunks/pages/announcement-38c5b87371a0d4b8.js",revision:"38c5b87371a0d4b8"},{url:"/_next/static/chunks/pages/attendance-8cb7ee277c8e86c6.js",revision:"8cb7ee277c8e86c6"},{url:"/_next/static/chunks/pages/auth/createNewPassword-132cb13cf3b0d608.js",revision:"132cb13cf3b0d608"},{url:"/_next/static/chunks/pages/auth/resetPassword-ab9e0824d7fc8e78.js",revision:"ab9e0824d7fc8e78"},{url:"/_next/static/chunks/pages/auth/verification-18321a43353e2212.js",revision:"18321a43353e2212"},{url:"/_next/static/chunks/pages/checkin-4844a2906c4e95ed.js",revision:"4844a2906c4e95ed"},{url:"/_next/static/chunks/pages/checkin/qrcode-e9869f1bead26e59.js",revision:"e9869f1bead26e59"},{url:"/_next/static/chunks/pages/claims-db55de05fd5e0175.js",revision:"db55de05fd5e0175"},{url:"/_next/static/chunks/pages/claims/addExpenseRequest-9400403d09977533.js",revision:"9400403d09977533"},{url:"/_next/static/chunks/pages/claims/expenseRequestStatus-abb471babe537001.js",revision:"abb471babe537001"},{url:"/_next/static/chunks/pages/claims/requestDetail-b9c9bec5376ea109.js",revision:"b9c9bec5376ea109"},{url:"/_next/static/chunks/pages/documents-cc40998c2de1a079.js",revision:"cc40998c2de1a079"},{url:"/_next/static/chunks/pages/eLeave-13be35a2cb5f192c.js",revision:"13be35a2cb5f192c"},{url:"/_next/static/chunks/pages/eLeave/applyLeave-c966b79f9c8db040.js",revision:"c966b79f9c8db040"},{url:"/_next/static/chunks/pages/eLeave/leaveCalendar-6d3b60452444cbfe.js",revision:"6d3b60452444cbfe"},{url:"/_next/static/chunks/pages/eLeave/leaveHistory-609c3a30fea06ffe.js",revision:"609c3a30fea06ffe"},{url:"/_next/static/chunks/pages/emergency-64e48338793ba1d2.js",revision:"64e48338793ba1d2"},{url:"/_next/static/chunks/pages/home-26872d87cdb4ff0b.js",revision:"26872d87cdb4ff0b"},{url:"/_next/static/chunks/pages/index-2134e2e273b7b38c.js",revision:"2134e2e273b7b38c"},{url:"/_next/static/chunks/pages/issues-39dfa121375e14e3.js",revision:"39dfa121375e14e3"},{url:"/_next/static/chunks/pages/more-5f937da0fe9e14e4.js",revision:"5f937da0fe9e14e4"},{url:"/_next/static/chunks/pages/notifications-8f54a53b78d2fce6.js",revision:"8f54a53b78d2fce6"},{url:"/_next/static/chunks/pages/patrol-9ea13d34b07400a3.js",revision:"9ea13d34b07400a3"},{url:"/_next/static/chunks/pages/payslip-248bc50f9763ed3f.js",revision:"248bc50f9763ed3f"},{url:"/_next/static/chunks/pages/payslip/%5Bid%5D-0ec37c6003307503.js",revision:"0ec37c6003307503"},{url:"/_next/static/chunks/pages/profile-32b403d6fb2cfe57.js",revision:"32b403d6fb2cfe57"},{url:"/_next/static/chunks/pages/team-34bcc85bb6020b70.js",revision:"34bcc85bb6020b70"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-32906e974f376c9d.js",revision:"32906e974f376c9d"},{url:"/_next/static/css/1e048da4eca7d1f5.css",revision:"1e048da4eca7d1f5"},{url:"/_next/static/css/7b233cd83a8cff1c.css",revision:"7b233cd83a8cff1c"},{url:"/_next/static/css/dd9c15e0e94ab221.css",revision:"dd9c15e0e94ab221"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/_next/static/rOW-xqLl1yncAav_WHgJQ/_buildManifest.js",revision:"9f11c610431d67947a13e16bfbd26091"},{url:"/_next/static/rOW-xqLl1yncAav_WHgJQ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"19153d6b127971768c7a93228d568c37"},{url:"/icon-256x256.png",revision:"845b6fec36fcef7eaf515f177871b89e"},{url:"/icon-384x384.png",revision:"5998a3d7c41d00ea82678cd71c320500"},{url:"/icon-512x512.png",revision:"dee253f8d851e76dda627ab6c09e4a6e"},{url:"/icons/CloseEyeSlashIcon.js",revision:"a15642399412f332ba12bf847f8dc893"},{url:"/icons/EmergencyIcon.js",revision:"321d66fad8021a9907ba23158ea7ad83"},{url:"/icons/HomeIcon.js",revision:"7f5f7407eb536271fb4c6ee119555f93"},{url:"/icons/IssueIcon.js",revision:"9f428de6f328c742d57e29c77851f076"},{url:"/icons/LoginLogo.js",revision:"d7a62cc44ef5948c82b2473f52c18930"},{url:"/icons/MoreIcon.js",revision:"d43685bc7cb38664e0414112e2e2b3ad"},{url:"/icons/OpenEyeIcon.js",revision:"0023ddfcc7d3c48d31a24c76c4cd6491"},{url:"/icons/PatrolIcon.js",revision:"4d8736dcb66ee6b0e0614b044ea44d35"},{url:"/icons/achievementIcon.js",revision:"d72d42601f0e912aca8beceec2376cbc"},{url:"/icons/activeIcon.js",revision:"dbf13494b907ee75ba3f5e1aa147a5cf"},{url:"/icons/announcementIcon.js",revision:"dd0d3341251474efcfbd966a7d056b78"},{url:"/icons/arrowDownIcon.js",revision:"a3f8866fc35bcb0ffb0d9d9baa3c0874"},{url:"/icons/arrowUpIcon.js",revision:"ef3b66b8095ecb9a4e6d4be7443e432e"},{url:"/icons/attendanceIcon.js",revision:"7dc560fd29389b0a73f522665f75e485"},{url:"/icons/backArrow.js",revision:"205d599b8977581ed42ea93c600fb2d0"},{url:"/icons/backIcon.js",revision:"f932ef806fab023e0295050e794f39a4"},{url:"/icons/batteryWarningIcon.js",revision:"1da606fa6f328837e977f847349dfca9"},{url:"/icons/calendarIcon.js",revision:"44d1d5aeece247179348b83f844a4792"},{url:"/icons/cameraIcon.js",revision:"724963b022a16704bf9c73e18c84dd6a"},{url:"/icons/certificationIcon.js",revision:"ed5e722c68eaab05f990190d3ecb95af"},{url:"/icons/chartIcon.js",revision:"c8d996445e676f7e9efeb282c2ec12e9"},{url:"/icons/checkInIcon.js",revision:"ee95c7c428a5d688dadb4d6b9222fbb8"},{url:"/icons/claimsIcon.js",revision:"4ab0b988caecd3f0f540aab3e6c9139a"},{url:"/icons/closeIcon.js",revision:"c83a9443c356acd1d46dc71a63baa601"},{url:"/icons/deleteIcon.js",revision:"3d9c9b710a32a9639a238d656e8b5242"},{url:"/icons/documentIcon.js",revision:"eeb72c1f2dc54313021c6cbd620a4bf7"},{url:"/icons/eLeaveIcon.js",revision:"f14a88b3a2c03d448e18785344e3d8b9"},{url:"/icons/editIcon.js",revision:"73c1a8930b09b4a51ecd524e5e4b5075"},{url:"/icons/editPencil.js",revision:"f31cf8a51dba445529966d726a00153c"},{url:"/icons/emailIcon.js",revision:"586e71767cde7db974aa9625dcda8437"},{url:"/icons/filterIcon.js",revision:"4e710558192bab3dcd41872a1799a7cc"},{url:"/icons/forwardIcon.js",revision:"2333d3c603ac9ddfe851f5b214673052"},{url:"/icons/lightningIcon.js",revision:"1aa915dc7f8bfbce43df89e50b3697b8"},{url:"/icons/listIcon.js",revision:"b3acf2b14d9e4a40715abdbfe1340805"},{url:"/icons/locationIcon.js",revision:"ee2f3c0622fffc77bdf3d799799cd20d"},{url:"/icons/mapPineLineIcon.js",revision:"c785e6b2e9f57f78647b14474b87c3b9"},{url:"/icons/noDataIcon.js",revision:"ec4185f391021a469506db4335f89029"},{url:"/icons/notiIcon.js",revision:"3dd40ace529348b9455607a239164352"},{url:"/icons/notiSearchIcon.js",revision:"71b3e81d0e470e6f22cae47c690439f7"},{url:"/icons/payslipIcon.js",revision:"0c7621edb3ae15b71658e600975e1de1"},{url:"/icons/pdfIcon.js",revision:"45bc4ec65280030197f7bb2b74182358"},{url:"/icons/plusIcon.js",revision:"4c3c1d87d7fee5926e11f533d77e9a10"},{url:"/icons/profileIcon.js",revision:"06b08dcb69aaeade17de1ced00248641"},{url:"/icons/progressIcon.js",revision:"ba33f70aa059cf062dca9c7c6a3aeb63"},{url:"/icons/refreshIcon.js",revision:"2616c9bfd698f2050d9422a0813c9e9b"},{url:"/icons/scanIcon.js",revision:"4274adeef2a7af9c67cc79dc8094b146"},{url:"/icons/searchIcon.js",revision:"9cdd3542f6517e0a331356a0a12f4874"},{url:"/icons/showChartIcon.js",revision:"8fb794487b9ec8cbabb1c55cd4fc944c"},{url:"/icons/showListIcon.js",revision:"eac8f9187a80a6506e2cc839f52f9d8d"},{url:"/icons/teamIcon.js",revision:"f14a4e1e70462c1bdf31ca72a4af9233"},{url:"/icons/uploadIcon.js",revision:"88ee024d9ff31d76073a8b0fa07c7538"},{url:"/icons/userIcon.js",revision:"9d0ac1ebdcb0a653486dd271038c1f91"},{url:"/images/defaultImage.jpg",revision:"261b9329ab4b80d60d1cc3545da1c9a2"},{url:"/images/invoiceSample.jpg",revision:"efaca725b3a12e708a0553ab8f5d997c"},{url:"/images/map.jpg",revision:"eb79cf9c9b00a1999ca3110fa577f4ae"},{url:"/images/mapIcon.png",revision:"7781fe53cb50750fb84729ad03e2d0f3"},{url:"/images/qrcode.jpg",revision:"d269d966ddb14012f17e4371610cf41e"},{url:"/manifest.json",revision:"a30269b5661760856beed265c76bf744"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
