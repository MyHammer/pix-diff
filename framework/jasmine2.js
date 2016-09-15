'use strict';

var BlinkDiff = require('blink-diff'),
    util = require('util');

beforeEach(function() {
    jasmine.addMatchers({
        toMatchScreen: function() {
            return {
                compare: function(actual, expected) {
                    var percent = +((actual.differences / actual.dimension) * 100).toFixed(2);
                    return {
                        pass: ((actual.code === BlinkDiff.RESULT_IDENTICAL) || (actual.code === BlinkDiff.RESULT_SIMILAR)),
                        message: util.format("Image is visibly different by %s pixels, %s %", actual.differences, percent)
                    };
                }
            }
        },

        toSaveOrMatchScreen: function () {
            return {
                compare: function (actual) {

                    if (browser.params.takeScreenshotMode) {
                        if (browser.pixdiff.prepareOptions.element) {
                            browser.pixdiff.saveRegion(browser.pixdiff.prepareOptions.element, browser.pixdiff.prepareOptions.tag);
                        } else {
                            browser.pixdiff.saveScreen(browser.pixdiff.prepareOptions.tag);
                        }

                        return {
                            pass: true,
                            message: 'screenshot taken'
                        }

                    } else {
                        var percent = +((actual.differences / actual.dimension) * 100).toFixed(2);
                        return {
                            pass: ((actual.code === BlinkDiff.RESULT_IDENTICAL) || (actual.code === BlinkDiff.RESULT_SIMILAR)),
                            message: util.format("Image is visibly different by %s pixels, %s %", actual.differences, percent)
                        }
                    }
                }
            }
        }
    })
});
