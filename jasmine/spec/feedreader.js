/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        let problemURL = [];
        let problemName = [];
        
        /* Loops through allFeeds and dumps the index
         * of bad feeds into problemURL or problemName
         */
        beforeEach(() => {
            allFeeds.forEach((feed, index) => {
                if(feed.name === '' || feed.name === undefined) {
                    problemName.push(index);
                }

                if(feed.url === '' || feed.url === undefined) {
                    problemURL.push(index);
                }
            });
        });

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URLs', () => {
            expect(problemURL[0]).toBeUndefined();
            expect(problemURL.length).toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have names', () => {
            expect(problemName[0]).toBeUndefined();
            expect(problemName.length).toBe(0);
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            /* optional pure JS
             * expect(document.querySelector('body')
             *      .classList.contains('menu-hidden')).toBe(true);
             */
        });

        /* Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

        it('changes visibility when clicked', () => {

            /* triggers a click on the hamburger-menu
             * and then checks to see if it is visible
             * then clicks again and checks to see if it is invisible
             */

            $('.icon-list').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.icon-list').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', () => {
        /* Write a new test suite named "Initial Entries" */

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(done => loadFeed(0, done));
        
        it('contains at least one entry', () => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', () => {
        /* Write a new test suite named "New Feed Selection" */

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let oldContent;

        beforeEach((done) => {
            /* Ensures we have first feed loaded before test */
            loadFeed(0, () => {
                /* grabs html of first entry and stores it to check later */
                oldContent = $('.feed .entry').html();
                /* loads a different feed to test */
                loadFeed(2, () => {
                    done();
                });
            });
        });

        /* checks old html against new html */
        it('changes the feed when triggered', () => {
            expect($('.feed .entry').html()).not.toEqual(oldContent);
        });
    });

}());
