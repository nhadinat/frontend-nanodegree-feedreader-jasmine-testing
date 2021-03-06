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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page? SPEC ERROR, that's what.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); // URL is defined
                expect(feed.url.length).not.toEqual(0); // URL is not empty
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0); // URL is not empty
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        // Select menu icon for second spec
        var menuIcon = $('.menu-icon-link');

        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            // Click open
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            // Click close
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function() {
        // Wait for loadFeed's callback before each spec
        beforeEach(function(done) {
            window.loadFeed(0, function() {
                done();
            });
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have at least a single .entry element within the .feed container.', function() {
            // Test the length, instead its existence, for a more accurate result
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New feed selection', function() {
        // Declare entry one and zero ahead of time
        var entryOne,
            entryZero;

        // Wait for loadFeed's callback before each spec
        beforeEach(function(done) {
            window.loadFeed(0, function() {
                entryZero = $('.entry').html();
                console.log(entryZero);
                console.log('loadFeed 0');
                done();
            });
        });

        // Again, qait for loadFeed's callback before each spec, this time a different feed
        beforeEach(function(done) {
            window.loadFeed(1, function() {
                entryOne = $('.entry').html();
                console.log(entryOne);
                console.log('loadFeed 1');
                done();
            });
        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('is loaded by the loadFeed function on change', function() {
            // Test existence
            expect(entryOne).toBeTruthy();
            expect(entryZero).toBeTruthy();
            // Test difference
            expect(entryZero).not.toBe(entryOne);
        });

    });

}());
