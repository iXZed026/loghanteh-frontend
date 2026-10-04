import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? "en";

    //Global
    const common = (
        await import(`../messages/${locale}/common.json`)
    ).default;

    const footer = (
        await import(`../messages/${locale}/footer.json`)
    ).default;

    //Loghanteh(root)
    const LoghantehHeader = (
        await import(`../messages/${locale}/Loghante/header.json`)
    ).default;

    const LoghantehHero = (
        await import(`../messages/${locale}/Loghante/hero.json`)
    ).default;

    const LoghantehAbout = (
        await import(`../messages/${locale}/Loghante/about.json`)
    ).default;

    const LoghantehMuseums = (
        await import(`../messages/${locale}/Loghante/museums.json`)
    ).default;

    const LoghantehCafeAndFood = (
        await import(`../messages/${locale}/Loghante/cafe-and-food.json`)
    ).default;

    const LoghantehShop = (
        await import(`../messages/${locale}/Loghante/shop.json`)
    ).default;

    const LoghantehEventsAndCourses = (
        await import(`../messages/${locale}/Loghante/events-and-courses.json`)
    ).default;

    const LoghantehCinemaAndTheaters = (
        await import(`../messages/${locale}/Loghante/cinema-and-theaters.json`)
    ).default;

    const LoghantehWSAndStudios = (
        await import(`../messages/${locale}/Loghante/workshops-and-studios.json`)
    ).default;

    const LoghantehConferenceHall = (
        await import(`../messages/${locale}/Loghante/conference-hall.json`)
    ).default;

    const LoghantehVirtualTour = (
        await import(`../messages/${locale}/Loghante/virtual-tour.json`)
    ).default;

    //Auth
    const authRegister = (
        await import(`../messages/${locale}/auth/register.json`)
    ).default;

    const authLogin = (
        await import(`../messages/${locale}/auth/login.json`)
    ).default;

    const authShared = (
        await import(`../messages/${locale}/auth/shared.json`)
    ).default;

    const authRoutes = (
        await import(`../messages/${locale}/auth/routes.json`)
    ).default;

    const authForgotPassword = (
        await import(`../messages/${locale}/auth/forgot-password.json`)
    ).default;

    const authVerify = (
        await import(`../messages/${locale}/auth/verify.json`)
    ).default;
    const authNewPassword = (
        await import(`../messages/${locale}/auth/new-password.json`)
    ).default;

    //Profile
    const profileDashboard = (
        await import(`../messages/${locale}/profile/dashboard-links.json`)
    ).default;

    const profileDashboardPage = (
        await import(`../messages/${locale}/profile/profile-dashboard-page.json`)
    ).default;

    const profileEdit = (
        await import(`../messages/${locale}/profile/edit-profile-page.json`)
    ).default;

    const ticketPurchasedDetails = (
        await import(`../messages/${locale}/profile/ticket-purchased-details.json`)
    ).default;

    const profileTicketPurchased = (
        await import(`../messages/${locale}/profile/ticket-purchased.json`)
    ).default;

    //Museums Tour
    const museumsTour = (
        await import(`../messages/${locale}/museums-tour/museums-tour.json`)
    ).default;

    //Payment
    const payment = (
        await import(`../messages/${locale}/payment/payment.json`)
    ).default;

    //Payment Success
    const paymentSuccess = (
        await import(`../messages/${locale}/payment-success/payment-success.json`)
    ).default;

    //Evemts And Courses
    const eventsAndCourses = (
        await import(`../messages/${locale}/events-and-courses/events-and-courses.json`)
    ).default;

    //Evemts And Courses Details
    const eventsAndCoursesDetails = (
        await import(`../messages/${locale}/events-and-courses/events-and-courses-details/events-and-courses-details.json`)
    ).default;

    //Cafe Menu
    const cafeMenu = (
        await import(`../messages/${locale}/cafe-menu/cafe-menu.json`)
    ).default;

    //Workshops And Studios
    const workshopsAndStudios = (
        await import(`../messages/${locale}/workshops-and-studios/workshops-and-studios.json`)
    ).default;

    //Conference Hall
    const conferenceHall = (
        await import(`../messages/${locale}/conference-hall/conference-hall.json`)
    ).default;

    //Cinema And Theater
    const cinemaAndTheater = (
        await import(`../messages/${locale}/cinema-and-theater/cinema-and-theater.json`)
    ).default;

    //Hall
    const hall = (
        await import(`../messages/${locale}/hall/hall.json`)
    ).default;

    //pdf

    //PDF Booking
    const pdfBooking = (
        await import(`../messages/${locale}/pdf/booking-pdf.json`)
    ).default;

    return {
        locale,
        messages: {
            common,
            footer,
            //Loghanteh-root
            LoghantehHeader,
            LoghantehHero,
            LoghantehAbout,
            LoghantehMuseums,
            LoghantehCafeAndFood,
            LoghantehShop,
            LoghantehEventsAndCourses,
            LoghantehCinemaAndTheaters,
            LoghantehWSAndStudios,
            LoghantehConferenceHall,
            LoghantehVirtualTour,
            //Auth
            authRegister,
            authShared,
            authRoutes,
            authLogin,
            authForgotPassword,
            authVerify,
            authNewPassword,
            //Profile
            profileDashboard,
            profileDashboardPage,
            profileEdit,
            profileTicketPurchased,
            ticketPurchasedDetails,
            //Museums Tour
            museumsTour,
            //Payment
            payment,
            //Payment Success
            paymentSuccess,
            //Evemts And Courses
            eventsAndCourses,
            //Evemts And Courses details
            eventsAndCoursesDetails,
            //Cafe Menu
            cafeMenu,
            //Workshops And Studios
            workshopsAndStudios,
            //Conference Hall
            conferenceHall,
            //Cinema And Theater
            cinemaAndTheater,
            //Hall
            hall,
            //PDF Bookig
            pdfBooking
        },
    };
});