/**
 * @author: Alyan Quddoos
 * @description: This is main Document page of the application contains template relevant styling and applied template
 * @datetime :24-April-2024
 */
import { Html, Head, Main, NextScript, Script } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="favicon_ntl.png" type="image/x-icon" />

        {/* <link href="dist/css/style.css" rel="stylesheet" type="text/css" /> */}
        <link rel="shortcut icon" href="favicon_ntl.png" />

        <link
          href="vendors/bower_components/datatables/media/css/jquery.dataTables.min.css"
          rel="stylesheet"
          type="text/css"
        />

        <link
          href="vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.css"
          rel="stylesheet"
          type="text/css"
        />

        {/* <!-- Custom CSS --> */}
        <link href="dist/css/style.css" rel="stylesheet" type="text/css" />

        <link href="customStyles.css" rel="stylesheet" type="text/css" />

        {/* Bootstrap */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        ></link>

        

        {/* Inter fot family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet" />

        <link href="dist/css/bodyStyles.css" rel="stylesheet" type="text/css" />
      </Head>
      <body>
        {/* <!-- Preloader --> */}
        <div className="preloader-it">
          <div className="la-anim-1"></div>
        </div>
        {/* <!-- /Preloader --> */}
        <div className=" theme-5-active pimary-color-blue">
          <Main />
        </div>
        <NextScript />
        {/* <!-- jQuery --> */}
        <script
          src="vendors/bower_components/jquery/dist/jquery.min.js"
          defer
        />

        {/* <!-- Bootstrap Core JavaScript --> */}
        <script
          src="vendors/bower_components/bootstrap/dist/js/bootstrap.min.js"
          defer
        />

        {/* <!-- Data table JavaScript --> */}
        <script
          src="vendors/bower_components/datatables/media/js/jquery.dataTables.min.js"
          defer
        />

        {/* <!-- Slimscroll JavaScript --> */}
        <script src="dist/js/jquery.slimscroll.js" defer />

        {/* <!-- simpleWeather JavaScript --> */}
        <script src="vendors/bower_components/moment/min/moment.min.js" defer />
        <script
          src="vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js"
          defer
        />
        <script src="dist/js/simpleweather-data.js" defer />

        {/* <!-- Progressbar Animation JavaScript --> */}
        <script
          src="vendors/bower_components/waypoints/lib/jquery.waypoints.min.js"
          defer
        />
        <script
          src="vendors/bower_components/jquery.counterup/jquery.counterup.min.js"
          defer
        />

        {/* <!-- Fancy Dropdown JS --> */}
        <script src="dist/js/dropdown-bootstrap-extended.js" defer />

        {/* <!-- Sparkline JavaScript --> */}
        {/* <script src="vendors/jquery.sparkline/dist/jquery.sparkline.min.js"defer /> */}

        {/* <!-- Owl JavaScript --> */}
        <script
          src="vendors/bower_components/owl.carousel/dist/owl.carousel.min.js"
          defer
        />

        {/* <!-- Toast JavaScript --> */}
        <script
          src="vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.js"
          defer
        />

        {/* <!-- EChartJS JavaScript --> */}
        <script
          src="vendors/bower_components/echarts/dist/echarts-en.min.js"
          defer
        />
        <script src="vendors/echarts-liquidfill.min.js" defer />

        {/* <!-- Switchery JavaScript --> */}
        <script
          src="vendors/bower_components/switchery/dist/switchery.min.js"
          defer
        />

        {/* <!-- Init JavaScript --> */}
        <script src="dist/js/init.js" defer />
        <script src="dist/js/dashboard5-data.js" defer />
      </body>
    </Html>
  );
}
