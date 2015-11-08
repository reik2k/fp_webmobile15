function AkaHTML5MediaAnalytics(cg) {
    var bD = "3.8.8";

    function D() {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
    }

    function cS() {
        return (D() + D() + "-" + D() + "-" + D() + "-" + D() + "-" + D() + D() + D())
    }

    var bm = bm || function (c0, cY) {
            var c1 = {}, c3 = c1.lib = {}, cU = c3.Base = function () {
                function c5() {
                }

                return {
                    extend: function (c6) {
                        c5.prototype = this;
                        var c7 = new c5;
                        c6 && c7.mixIn(c6);
                        c7.$super = this;
                        return c7
                    }, create: function () {
                        var c6 = this.extend();
                        c6.init.apply(c6, arguments);
                        return c6
                    }, init: function () {
                    }, mixIn: function (c6) {
                        for (var c7 in c6) {
                            c6.hasOwnProperty(c7) && (this[c7] = c6[c7])
                        }
                        c6.hasOwnProperty("toString") && (this.toString = c6.toString)
                    }, clone: function () {
                        return this.$super.extend(this)
                    }
                }
            }(), cV = c3.WordArray = cU.extend({
                init: function (c5, c6) {
                    c5 = this.words = c5 || [];
                    this.sigBytes = c6 != cY ? c6 : 4 * c5.length
                }, toString: function (c5) {
                    return (c5 || c2).stringify(this)
                }, concat: function (c6) {
                    var c7 = this.words, c9 = c6.words, c8 = this.sigBytes, c6 = c6.sigBytes;
                    this.clamp();
                    if (c8 % 4) {
                        for (var c5 = 0; c5 < c6; c5++) {
                            c7[c8 + c5 >>> 2] |= (c9[c5 >>> 2] >>> 24 - 8 * (c5 % 4) & 255) << 24 - 8 * ((c8 + c5) % 4)
                        }
                    } else {
                        if (65535 < c9.length) {
                            for (c5 = 0; c5 < c6; c5 += 4) {
                                c7[c8 + c5 >>> 2] = c9[c5 >>> 2]
                            }
                        } else {
                            c7.push.apply(c7, c9)
                        }
                    }
                    this.sigBytes += c6;
                    return this
                }, clamp: function () {
                    var c5 = this.words, c6 = this.sigBytes;
                    c5[c6 >>> 2] &= 4294967295 << 32 - 8 * (c6 % 4);
                    c5.length = c0.ceil(c6 / 4)
                }, clone: function () {
                    var c5 = cU.clone.call(this);
                    c5.words = this.words.slice(0);
                    return c5
                }, random: function (c5) {
                    for (var c6 = [], c7 = 0; c7 < c5; c7 += 4) {
                        c6.push(4294967296 * c0.random() | 0)
                    }
                    return cV.create(c6, c5)
                }
            }), e = c1.enc = {}, c2 = e.Hex = {
                stringify: function (c6) {
                    for (var c7 = c6.words, c6 = c6.sigBytes, c9 = [], c5 = 0; c5 < c6; c5++) {
                        var c8 = c7[c5 >>> 2] >>> 24 - 8 * (c5 % 4) & 255;
                        c9.push((c8 >>> 4).toString(16));
                        c9.push((c8 & 15).toString(16))
                    }
                    return c9.join("")
                }, parse: function (c6) {
                    for (var c7 = c6.length, c8 = [], c5 = 0; c5 < c7; c5 += 2) {
                        c8[c5 >>> 3] |= parseInt(c6.substr(c5, 2), 16) << 24 - 4 * (c5 % 8)
                    }
                    return cV.create(c8, c7 / 2)
                }
            }, cX = e.Latin1 = {
                stringify: function (c6) {
                    for (var c7 = c6.words, c6 = c6.sigBytes, c5 = [], c8 = 0; c8 < c6; c8++) {
                        c5.push(String.fromCharCode(c7[c8 >>> 2] >>> 24 - 8 * (c8 % 4) & 255))
                    }
                    return c5.join("")
                }, parse: function (c6) {
                    for (var c5 = c6.length, c8 = [], c7 = 0; c7 < c5; c7++) {
                        c8[c7 >>> 2] |= (c6.charCodeAt(c7) & 255) << 24 - 8 * (c7 % 4)
                    }
                    return cV.create(c8, c5)
                }
            }, cW = e.Utf8 = {
                stringify: function (c6) {
                    try {
                        return decodeURIComponent(escape(cX.stringify(c6)))
                    } catch (c5) {
                        throw Error("Malformed UTF-8 data")
                    }
                }, parse: function (c5) {
                    return cX.parse(unescape(encodeURIComponent(c5)))
                }
            }, cZ = c3.BufferedBlockAlgorithm = cU.extend({
                reset: function () {
                    this._data = cV.create();
                    this._nDataBytes = 0
                }, _append: function (c5) {
                    "string" == typeof c5 && (c5 = cW.parse(c5));
                    this._data.concat(c5);
                    this._nDataBytes += c5.sigBytes
                }, _process: function (c6) {
                    var c5 = this._data, db = c5.words, da = c5.sigBytes, c7 = this.blockSize, c8 = da / (4 * c7), c8 = c6 ? c0.ceil(c8) : c0.max((c8 | 0) - this._minBufferSize, 0), c6 = c8 * c7, da = c0.min(4 * c6, da);
                    if (c6) {
                        for (var c9 = 0; c9 < c6; c9 += c7) {
                            this._doProcessBlock(db, c9)
                        }
                        c9 = db.splice(0, c6);
                        c5.sigBytes -= da
                    }
                    return cV.create(c9, da)
                }, clone: function () {
                    var c5 = cU.clone.call(this);
                    c5._data = this._data.clone();
                    return c5
                }, _minBufferSize: 0
            });
            c3.Hasher = cZ.extend({
                init: function () {
                    this.reset()
                }, reset: function () {
                    cZ.reset.call(this);
                    this._doReset()
                }, update: function (c5) {
                    this._append(c5);
                    this._process();
                    return this
                }, finalize: function (c5) {
                    c5 && this._append(c5);
                    this._doFinalize();
                    return this._hash
                }, clone: function () {
                    var c5 = cZ.clone.call(this);
                    c5._hash = this._hash.clone();
                    return c5
                }, blockSize: 16, _createHelper: function (c5) {
                    return function (c6, c7) {
                        return c5.create(c7).finalize(c6)
                    }
                }, _createHmacHelper: function (c5) {
                    return function (c6, c7) {
                        return c4.HMAC.create(c5, c7).finalize(c6)
                    }
                }
            });
            var c4 = c1.algo = {};
            return c1
        }(Math);
    (function () {
        var cW = bm, cV = cW.lib, cX = cV.WordArray, cV = cV.Hasher, cU = [], e = cW.algo.SHA1 = cV.extend({
            _doReset: function () {
                this._hash = cX.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            }, _doProcessBlock: function (c3, cY) {
                for (var c5 = this._hash.words, c0 = c5[0], cZ = c5[1], c1 = c5[2], c2 = c5[3], c7 = c5[4], c4 = 0; 80 > c4; c4++) {
                    if (16 > c4) {
                        cU[c4] = c3[cY + c4] | 0
                    } else {
                        var c6 = cU[c4 - 3] ^ cU[c4 - 8] ^ cU[c4 - 14] ^ cU[c4 - 16];
                        cU[c4] = c6 << 1 | c6 >>> 31
                    }
                    c6 = (c0 << 5 | c0 >>> 27) + c7 + cU[c4];
                    c6 = 20 > c4 ? c6 + ((cZ & c1 | ~cZ & c2) + 1518500249) : 40 > c4 ? c6 + ((cZ ^ c1 ^ c2) + 1859775393) : 60 > c4 ? c6 + ((cZ & c1 | cZ & c2 | c1 & c2) - 1894007588) : c6 + ((cZ ^ c1 ^ c2) - 899497514);
                    c7 = c2;
                    c2 = c1;
                    c1 = cZ << 30 | cZ >>> 2;
                    cZ = c0;
                    c0 = c6
                }
                c5[0] = c5[0] + c0 | 0;
                c5[1] = c5[1] + cZ | 0;
                c5[2] = c5[2] + c1 | 0;
                c5[3] = c5[3] + c2 | 0;
                c5[4] = c5[4] + c7 | 0
            }, _doFinalize: function () {
                var cY = this._data, c0 = cY.words, c1 = 8 * this._nDataBytes, cZ = 8 * cY.sigBytes;
                c0[cZ >>> 5] |= 128 << 24 - cZ % 32;
                c0[(cZ + 64 >>> 9 << 4) + 15] = c1;
                cY.sigBytes = 4 * c0.length;
                this._process()
            }
        });
        cW.SHA1 = cV._createHelper(e);
        cW.HmacSHA1 = cV._createHmacHelper(e)
    })();
    (function () {
        var cU = bm, e = cU.enc.Utf8;
        cU.algo.HMAC = cU.lib.Base.extend({
            init: function (c1, c3) {
                c1 = this._hasher = c1.create();
                "string" == typeof c3 && (c3 = e.parse(c3));
                var c0 = c1.blockSize, cW = 4 * c0;
                c3.sigBytes > cW && (c3 = c1.finalize(c3));
                for (var cV = this._oKey = c3.clone(), c2 = this._iKey = c3.clone(), cY = cV.words, cX = c2.words, cZ = 0; cZ < c0; cZ++) {
                    cY[cZ] ^= 1549556828, cX[cZ] ^= 909522486
                }
                cV.sigBytes = c2.sigBytes = cW;
                this.reset()
            }, reset: function () {
                var cV = this._hasher;
                cV.reset();
                cV.update(this._iKey)
            }, update: function (cV) {
                this._hasher.update(cV);
                return this
            }, finalize: function (cW) {
                var cV = this._hasher, cW = cV.finalize(cW);
                cV.reset();
                return cV.finalize(this._oKey.clone().concat(cW))
            }
        })
    })();
    (function () {
        var cX = bm, cW = cX.lib, cY = cW.Base, cU = cW.WordArray, cW = cX.algo, e = cW.HMAC, cV = cW.PBKDF2 = cY.extend({
            cfg: cY.extend({
                keySize: 4,
                hasher: cW.SHA1,
                iterations: 1
            }), init: function (cZ) {
                this.cfg = this.cfg.extend(cZ)
            }, compute: function (c7, c9) {
                for (var c6 = this.cfg, c3 = e.create(c6.hasher, c7), c5 = cU.create(), c4 = cU.create([1]), db = c5.words, c8 = c4.words, da = c6.keySize, c6 = c6.iterations; db.length < da;) {
                    var c2 = c3.update(c9).finalize(c4);
                    c3.reset();
                    for (var c0 = c2.words, dd = c0.length, cZ = c2, de = 1; de < c6; de++) {
                        cZ = c3.finalize(cZ);
                        c3.reset();
                        for (var dc = cZ.words, c1 = 0; c1 < dd; c1++) {
                            c0[c1] ^= dc[c1]
                        }
                    }
                    c5.concat(c2);
                    c8[0]++
                }
                c5.sigBytes = 4 * da;
                return c5
            }
        });
        cX.PBKDF2 = function (cZ, c1, c0) {
            return cV.create(c0).compute(cZ, c1)
        }
    })();
    function bT(c1, cY) {
        if (c1 == null || c1 == "") {
            return
        }
        var cW = /(\w+):\/\/([^\/:]+):?([^\/]+)?(\/[^#?]*)#?([^?]+)?\??(.+)?/;
        try {
            var cV = cW.exec(c1);
            cY.protocol = cV[1];
            cY.hostName = cV[2];
            cY.port = cV[3] ? cV[3] : "80";
            cY.path = cV[4];
            var c0 = cY.path.split("/");
            var cX = c0.length;
            cY.streamName = c0[cX - 1];
            var cU = cY.streamName.toLowerCase();
            if ((cU.indexOf(".m3u") != -1) || (cU.indexOf("manifest") != -1) || (cU.indexOf(".f4m") != -1) || (cU.indexOf(".mpd") != -1)) {
                if (cX >= 3) {
                    cY.streamName = c0[cX - 2] + "/" + c0[cX - 1]
                }
            }
            cY.hash = cV[5] ? cV[5] : "";
            cY.search = cV[6] ? cV[6] : "";
            cY.host = cY.hostName + ":" + cY.port
        } catch (cZ) {
            bt("Exception,  parseStreamUrl :" + cZ)
        }
    }

    function bM(e, cU) {
        var cV;
        if (e != null) {
            cV = e
        } else {
            cV = new Date().getTime()
        }
        return cV
    }

    var S = false;
    if (window) {
        try {
            S = window.XDomainRequest ? true : false
        } catch (bS) {
            S = false
        }
    }
    var a2 = {};
    var R = {};
    var be = null;
    var b3 = {
        eventCode: "",
        beaconId: "",
        sequenceId: "",
        logType: "",
        endOfStream: "",
        logVersion: "",
        formatVersion: "",
        visitId: "",
        errorCode: "",
        partNumber: "",
        totalParts: "",
        hostName: "",
        streamName: "",
        port: "",
        protocol: "",
        userAgent: "",
        playerType: "",
        os: "",
        format: "",
        connectTime: "",
        bufferingTime: "",
        startupTime: "",
        streamLength: "",
        bytesTotal: "",
        browser: "",
        browserSize: "",
        videoSize: "",
        streamUrl: "",
        deliveryType: "",
        pluginVersion: "",
        beaconVersion: "",
        serverIp: "",
        playerFormat: "",
        outlierStartupTime: "",
        isFirstTitle: "",
        rebufferSessionH: "",
        sequenceIdH: "",
        isSessionWithRebufferH: "",
        playerState: "",
        currentStreamTime: "",
        currentClockTime: "",
        playClockTime: "",
        playStreamTime: "",
        rebufferCount: "",
        rebufferTime: "",
        pauseCount: "",
        pauseDuration: "",
        pauseIntervalsAsString: "",
        seekCount: "",
        seekTime: "",
        seekIntervalsAsString: "",
        pauseSeekSession: "",
        resumeBufferCount: "",
        resumeBufferTime: "",
        isView: "",
        isSessionWithRebuffer: "",
        logInterval: "",
        rebufferSession: "",
        socialSharing: "",
        endReasonCode: "",
        totalPlayClockTime: "",
        totalPlayStreamTime: "",
        totalRebufferCount: "",
        totalRebufferTime: "",
        totalAdPlayClockTime: "",
        totalAdStartCount: "",
        totalAdAbandonCount: "",
        lastHTime: "",
        isVisitStart: "",
        isVisitEnd: "",
        visitAttempts: "",
        visitPlays: "",
        visitViews: "",
        visitErrors: "",
        visitInterval: "",
        visitPlayClockTime: "",
        visitPlayStreamTime: "",
        visitRebufferCount: "",
        visitRebufferTime: "",
        visitStartupErrors: "",
        visitAdPlayClockTime: "",
        visitAdStartCount: "",
        visitAdAbandonCount: "",
        visitUniqueTitles: "",
        adAbandonCount: "",
        adPauseTime: "",
        adStartupTime: "",
        adPlayClockTime: "",
        adCount: "",
        adSession: "",
        sessionId: "",
        attemptId: "",
        playerReferrer: "",
        ais_idpId: "",
        ais_idpName: "",
        ais_idpDisplayName: "",
        ais_idpUrl: "",
        ais_queryToken: "",
        ais_aisuid: "",
        qualityOfExperience: "",
        transitionStreamTimeSession: "",
        transitionUpSwitchCount: "",
        transitionDownSwitchCount: "",
        averagedBitRate: "",
        fullOs: ""
    };
    var cc = {
        title: false,
        category: false,
        subCategory: false,
        show: false,
        contentLength: false,
        contentType: false,
        device: false,
        deliveryType: false,
        playerId: false,
        eventName: false
    };
    var ax = {};
    var b2 = {};
    ax.isBrightcoveVideo = false;
    ax.objectBased = false;
    ax.videoPassed = false;
    var af = false;
    var K = false;
    var aJ = false;
    var au = {};
    var bz = {};
    var ck = false;
    var cA = [];
    var a7 = {timer: null, queue: [], browserClose: false, enabled: true, time: 250};
    var bn = {};
    var bi = [];
    var aM = {};
    var by = {};
    var l = {};
    l.seekThreshold = 2000;
    l.visitTimeout = 60 * 60 * 1000;
    var aE = {};
    var cb = {};
    var ad = {};
    var bK = {};
    var F = 100;
    var ch = {};
    var X = false;
    var bx = false;
    var c = {fastTCPFailed: false, fastTCPEnabled: false};
    var ce = [];
    var bf = {};
    bf.dataSent = {};
    var bR = 1;
    var aC = -1;
    var b1 = {};
    var u = [];
    var H = {
        pageURLCsmaDebug: 0,
        configURLCsmaDebug: 0,
        configDebug: 0,
        windowOpened: false,
        logStoredMsg: true,
        printException: false
    };

    function ah() {
        this.aisRetries = 0;
        this.aisRequestLimit = 3;
        this.aisRequestInterval = 30000;
        this.requestFailed = false
    }

    var bQ = new ah();
    var x = {
        setDataArr: ["adId", "adDuration", "adTitle", "adCategory", "adPartnerId", "adServer", "adDaypart", "adIndustryCategory", "adEvent"],
        clearAdAnalytics: function () {
            this.isAdLoaded = false;
            this.isAdStarted = false;
            this.id = "";
            this.type = "0";
            this.startPos = "0";
            this.playBucket = "-1";
            this.endStatus = "2";
            this.adLoadTime = null;
            this.adStartTime = null;
            this.adStartupTime = "0";
            for (var e = 0; e < this.setDataArr.length; e++) {
                this[this.setDataArr[e]] = ""
            }
        }
    };
    var bY = {
        bitRateArr: [],
        currentBitRate: "-",
        currentStartPos: 0,
        bitRateCount: {},
        bitRatePlayTime: {},
        bitRateBucketMap: {},
        clearBitRate: function () {
            this.bitRateArr = [];
            this.currentBitRate = "-";
            this.bitRateCount = {};
            this.bitRatePlayTime = {}
        },
        updateBitRateArr: function (cV) {
            if (this.bitRateArr.length > 0) {
                var e = this.bitRateArr.length;
                var cU = bY.bitRateArr[e - 1];
                if ((this.currentBitRate == cU.bitRate)) {
                    cU.playTime += cV
                } else {
                    this.pushInBitRateArr(cV, this.currentBitRate, this.currentStartPos)
                }
            } else {
                this.pushInBitRateArr(cV, this.currentBitRate, this.currentStartPos)
            }
        },
        pushInBitRateArr: function (cV, e, cU) {
            this.bitRateArr.push({bitRate: e, playTime: cV, startPos: cU})
        },
        populateBitRateBucketMap: function (e, cY) {
            var cV, cW = false;
            var cU = bK.bitRateBucketTimes;
            if (e != "-" && e !== "") {
                e = parseInt(e / 1000)
            }
            for (var cX in cU) {
                cW = false;
                cV = cU[cX];
                if (e == "-" || e === "" || e < 0) {
                    if (!cV.max && !cV.min) {
                        cW = true;
                        break
                    }
                } else {
                    if (cV.max && cV.min) {
                        if (e >= cV.min && e < cV.max) {
                            cW = true;
                            break
                        }
                    } else {
                        if (cV.max) {
                            if (e < cV.max) {
                                cW = true;
                                break
                            }
                        } else {
                            if (cV.min) {
                                if (e >= cV.min) {
                                    cW = true;
                                    break
                                }
                            }
                        }
                    }
                }
            }
            if (cW) {
                this.bitRateBucketMap[cX] += cY
            }
        },
        findMaxPersistentBitRate: function () {
            try {
                if (this.bitRatePlayTime) {
                    var cU = 0, cV = -1;
                    for (var cW in this.bitRatePlayTime) {
                        if (this.bitRatePlayTime[cW] > cV) {
                            cV = this.bitRatePlayTime[cW];
                            cU = cW
                        }
                    }
                    if (cU !== 0) {
                        return cU
                    }
                }
            } catch (cX) {
                bt("Exception, find max persistent bit rate")
            }
        },
        getTransitionSession: function (c0) {
            try {
                var cW = null;
                var cV, c4, cX = "";
                var cY = 0, c1, c3 = 0, cU = 0;
                var cZ = true;
                if (this.bitRateArr.length > 0) {
                    cV = this.bitRateArr[0];
                    if (cV.bitRate == "-") {
                        cZ = false;
                        if (this.bitRateArr[1] && this.bitRateArr[1].bitRate != "-") {
                            cZ = true;
                            this.bitRateArr[1].startPos = this.bitRateArr[0].startPos;
                            this.bitRateArr[1].playTime += this.bitRateArr[0].playTime;
                            this.bitRateArr.shift()
                        }
                    }
                }
                for (c4 in this.bitRateBucketMap) {
                    this.bitRateBucketMap[c4] = 0
                }
                for (cY = 0; cY < this.bitRateArr.length; cY++) {
                    cV = this.bitRateArr[cY];
                    if (cV.bitRate in this.bitRateCount) {
                        if (cY != 0) {
                            this.bitRateCount[cV.bitRate]++
                        }
                    } else {
                        this.bitRateCount[cV.bitRate] = 1
                    }
                    if (cV.bitRate != "" && cV.bitRate != "-") {
                        if (cV.bitRate in this.bitRatePlayTime) {
                            this.bitRatePlayTime[cV.bitRate] += cV.playTime
                        } else {
                            this.bitRatePlayTime[cV.bitRate] = cV.playTime
                        }
                    }
                    c1 = this.bitRateCount[cV.bitRate];
                    if (cW) {
                        cW += "," + cV.bitRate + ":" + cV.startPos + ":" + cV.playTime + "::" + c1
                    } else {
                        cW = cV.bitRate + ":" + cV.startPos + ":" + cV.playTime + "::" + c1
                    }
                    this.populateBitRateBucketMap(cV.bitRate, cV.playTime);
                    try {
                        if (cZ) {
                            c3 += cV.bitRate * cV.playTime;
                            cU += cV.playTime
                        }
                    } catch (c2) {
                    }
                }
                c0.maxPersistentBitRate = this.findMaxPersistentBitRate();
                c0.transitionStreamTimeSession = cW;
                for (c4 in this.bitRateBucketMap) {
                    if (cX) {
                        cX += "," + c4 + ":" + this.bitRateBucketMap[c4]
                    } else {
                        cX = c4 + ":" + this.bitRateBucketMap[c4]
                    }
                }
                c0.bitRateBucketTimes = cX;
                try {
                    if (cZ && cU && cU != 0) {
                        c0.averagedBitRate = c3 + ":" + cU
                    } else {
                        c0.averagedBitRate = null
                    }
                } catch (c2) {
                }
            } catch (c2) {
                bt("Exception, get transition Session :" + c2)
            }
        }
    };
    var bq = "";
    var cQ = function () {
        if (typeof(akamaiBCVideoObject) != "undefined") {
            try {
                var cV = document.getElementsByTagName("script");
                var cY = 0;
                var cU = "";
                if (cV.length) {
                    for (cY = 0; cY < cV.length; cY++) {
                        if ((cV[cY].src != null) && ((cV[cY].src.indexOf("79423.analytics.edgesuite.net") != -1) || (cV[cY].src.indexOf("79423.analytics.edgekey.net") != -1))) {
                            bq = cV[cY].src;
                            cU = E("configPath", cV[cY].src);
                            if (cU != "") {
                                au.url = cU
                            }
                        }
                    }
                }
            } catch (c0) {
            }
        } else {
            if (cg && cg.configPath) {
                au.url = cg.configPath;
                ax.objectBased = true
            } else {
                au.url = AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH
            }
        }
        try {
            if (window) {
                var c2 = null;
                if (br()) {
                    c2 = E("AkamaiAnalytics_configPath", window.parent.location);
                    if (c2) {
                        au.url = c2
                    }
                } else {
                    c2 = E("AkamaiAnalytics_configPath", window.location);
                    if (c2) {
                        au.url = c2
                    }
                }
            }
        } catch (c0) {
        }
        if (au.url) {
            var c1 = parseInt(E("enableGenericAPI", au.url));
            if (c1 == 1) {
                ax.objectBased = true
            }
            au.beaconSent = parseInt(E("beaconSentNotify", au.url));
            var cX = parseInt(E("setVideoObject", au.url));
            if (cX == 1) {
                ax.videoPassed = true
            }
            var cZ = parseInt(E("subscribeVideo", au.url));
            if (cZ == 1) {
                ax.videoPassed = true
            }
            var cW = parseInt(E("exception", au.url));
            if (cW == 1) {
                H.printException = true
            }
            H.configURLCsmaDebug = parseInt(E("debug", au.url))
        }
    }();

    function br() {
        var cZ = false;
        try {
            if (window !== window.parent) {
                var cV = {};
                var cW = {};
                var cU = document.URL;
                var cY = null;
                if (document && document.referrer) {
                    cY = document.referrer
                }
                if (cU != null) {
                    bT(cU, cV)
                }
                if (cY != null) {
                    bT(cY, cW)
                }
                if (cV.port === cW.port && cV.protocol === cW.protocol && cV.hostName === cW.hostName) {
                    cZ = true
                }
            } else {
                cZ = true
            }
        } catch (cX) {
        }
        return cZ
    }

    try {
        if (window) {
            if (br()) {
                H.pageURLCsmaDebug = parseInt(E("AkamaiAnalytics_debug", window.parent.location))
            } else {
                H.pageURLCsmaDebug = parseInt(E("AkamaiAnalytics_debug", window.location))
            }
        }
    } catch (bS) {
    }
    try {
        if (typeof(akamaiBCVideoObject) != "undefined" && typeof(brightcovePerforceVersion) != "undefined") {
            a4("std:pluginVersion", "Brightcove-" + brightcovePerforceVersion)
        }
    } catch (bS) {
        bt("Exception,  pluginVersion: " + bS)
    }
    function cz() {
        var cZ = false;
        try {
            var cV = document.URL;
            var cW = /(\w+):\/\/([^\/:]+):?([^\/]+)?(\/[^#?]*)#?([^?]+)?\??(.+)?/;
            var cU = cW.exec(cV);
            var cY = cU[1];
            if (cY == "https") {
                cZ = true
            }
        } catch (cX) {
        }
        return cZ
    }

    function aL() {
        if (H.windowOpened) {
            return
        }
        if (H.pageURLCsmaDebug == 1 || H.configURLCsmaDebug == 1 || H.configDebug == 1) {
            if (typeof AkamaiAnalytics_debugWindow_available == "function" && AkamaiAnalytics_debugWindow_available() == "1") {
                return
            }
            var e = "JS -" + bD;
            if ("pluginVersion" in R) {
                e = e + ":" + R.pluginVersion
            }
            AkamaiAnalytics_debugWindow_data = {version: e};
            if (cz()) {
                o("https://79423.analytics.edgekey.net/csma/debug/DebugWindow.js", "AkamaiAnalytics_debug");
                cE(j, "https://79423.analytics.edgekey.net/plugins/release-details/latest/html5.xml", false, true)
            } else {
                o("http://79423.analytics.edgesuite.net/csma/debug/DebugWindow.js", "AkamaiAnalytics_debug");
                cE(j, "http://79423.analytics.edgesuite.net/plugins/release-details/latest/html5.xml", false, true)
            }
            H.windowOpened = true;
            V()
        }
    }

    aL();
    function V() {
        try {
            var cU = au.url.toLowerCase();
            var cW = "";
            if (cU.indexOf(".edgesuite.net/") == -1 && cU.indexOf(".edgekey.net/") == -1) {
                cW = "Incorrect Beacon XML Path";
                cW += "<ul style='list-style-type:circle;margin:0'>";
                cW += "<li>We have identified that the Beacon XML in not loaded from an Akamai Domain.</li>";
                cW += "<li>Kindly use the same Beacon XML path that is provided in SOLA Anlaytics UI while provisioning.</li></ul>";
                bt(cW, "ERROR")
            }
        } catch (cV) {
        }
    }

    function bA() {
        try {
            var cV = l.beaconUrl.toLowerCase();
            var cW = "";
            if (cV.indexOf(".edgesuite.net/") == -1 && cV.indexOf(".edgekey.net/") == -1) {
                cW = "Beacons sent to incorrect domain : " + cV;
                cW += "<ul style='list-style-type:circle;margin:0'>";
                cW += "<li>We have identified that the beacons are not sent to an Akamai Domain.</li>";
                cW += "<li>Kindly use the proper Beacon XML path that is provided in SOLA Anlaytics UI while provisioning.</li></ul>";
                bt(cW, "ERROR")
            }
        } catch (cU) {
        }
    }

    function aQ() {
        try {
            var cU = "";
            for (var cW in cc) {
                if (cc[cW]) {
                    if (!(cW in a2)) {
                        if (cU) {
                            cU += ", " + cW
                        } else {
                            cU = cW
                        }
                    }
                }
            }
            if (cU) {
                cU = "Following dimensons have not being set : " + cU;
                cU += "<ul style='list-style-type:circle;margin:0'>";
                cU += "<li>Please refer 'Set Custom Data' section in Integration guide for more details.</li></ul>";
                bt(cU, "INTEGRATION")
            }
        } catch (cV) {
        }
    }

    function j(c4) {
        try {
            var cV = c4.readyState;
            var c8 = c4.status;
            if (cV == 4 && c8 == 200) {
                var cU = c4.responseXML;
                if (cU) {
                    var c1;
                    if (cU.documentElement) {
                        c1 = cU.documentElement
                    } else {
                        c1 = cU
                    }
                    if (c1) {
                        var c2 = document.getElementsByTagName("script");
                        var da = 0;
                        var c3 = false;
                        var cY = "";
                        var c6 = "";
                        if (typeof(akamaiBCVideoObject) != "undefined") {
                            if (bq) {
                                c3 = true;
                                c6 = bq
                            }
                        } else {
                            if (c2.length) {
                                for (da = 0; da < c2.length; da++) {
                                    if ((c2[da].src != null)) {
                                        var c9 = c2[da].src;
                                        if ((c9.indexOf("79423.analytics.edgesuite.net") != -1) || (c9.indexOf("79423.analytics.edgekey.net") != -1)) {
                                            if (c9.indexOf("/html5/akamaihtml5-min.js") != -1 || c9.indexOf("/js/csma.js") != -1 || c9.indexOf("/js/brightcove-csma.js") != -1) {
                                                c3 = true;
                                                c6 = c9
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var cW = "";
                        if (typeof(akamaiBCVideoObject) != "undefined") {
                            cW = c1.getElementsByTagName("brightcove")[0]
                        } else {
                            cW = c1.getElementsByTagName("plugin")[0]
                        }
                        if (cW) {
                            var dd = cW.getAttribute("name");
                            var cX = cW.getAttribute("version");
                            var c0 = cW.getAttribute("link");
                            var c5 = cW.getAttribute("size");
                            var cZ = cW.getAttribute("date");
                            var c7 = "";
                            bt("Integration Type : " + dd, "INTEGRATION");
                            if (c3) {
                                bt("Plugin path is correct [" + c6 + "]", "INTEGRATION")
                            } else {
                                c7 = "Incorrect Plugin Path";
                                c7 += "<ul style='list-style-type:circle;margin:0'>";
                                c7 += "<li>Kindly refer the Integration Guide and use the correct plugin path for integration</li>";
                                c7 += "<li>The plugin path should be one of the below :</li>";
                                if (typeof(akamaiBCVideoObject) != "undefined") {
                                    c7 += "<ul><li>http://79423.analytics.edgesuite.net/html5/brightcoveAkamaihtml5-min.js</li>";
                                    c7 += "<li>https://79423.analytics.edgekey.net/html5/brightcoveAkamaihtml5-min.js</li></ul>"
                                } else {
                                    c7 += "<ul><li>http://79423.analytics.edgekey.net/html5/akamaihtml5-min.js</li>";
                                    c7 += "<li>http://79423.analytics.edgekey.net/js/csma.js</li></ul>"
                                }
                                c7 += "</ul>";
                                bt(c7, "ERROR")
                            }
                            var dc = bX(bD, cX);
                            if (dc >= 0) {
                                bt("Plugin is Latest (Version = " + bD + " )", "INTEGRATION")
                            } else {
                                c7 = "Old Plugin Version";
                                c7 += "<ul style='list-style-type:circle;margin:0'>";
                                c7 += "<li>Current Plugin Version is " + bD + "</li>";
                                c7 += "<li>The latest plugin version in " + cX + " which was released on date " + cZ + "</li>";
                                c7 += "<li>Kindly check if proper path mentioned in integration guide is used for integration</li>";
                                c7 += "<li>If proper path is used, try by clearing browser cache.</li>";
                                bt(c7, "ERROR")
                            }
                        }
                    }
                }
            }
        } catch (db) {
        }
    }

    function bX(cU, c0) {
        try {
            var cX = 0;
            if (cU != null && c0 != null) {
                var cY = cU.split(".");
                var cV = c0.split(".");
                while (cY.length > cV.length) {
                    cV.push(0)
                }
                while (cV.length > cY.length) {
                    cY.push(0)
                }
                for (var cW = 0; cW < cY.length; cW++) {
                    if (parseInt(cY[cW]) > parseInt(cV[cW])) {
                        cX = 1;
                        break
                    }
                    if (parseInt(cY[cW]) < parseInt(cV[cW])) {
                        cX = -1;
                        break
                    }
                }
            }
        } catch (cZ) {
        }
        return cX
    }

    function cd(cW, cU, e) {
        var cV;
        if (S) {
            cV = new XDomainRequest();
            cV.onload = function () {
                bt("XML Request : xmlClient.onload");
                cW("4", "200", cV.responseText)
            };
            cV.onerror = function (cX) {
                bt("Error, ais request")
            };
            cV.open("GET", cU, e);
            cV.send(null)
        } else {
            cV = new XMLHttpRequest();
            cV.responseType = "json";
            cV.open("GET", cU, e);
            if (cV.overrideMimeType) {
                cV.overrideMimeType("application/json")
            }
            cV.onreadystatechange = function () {
                cW(cV.readyState, cV.status, cV.responseText)
            };
            cV.send(null)
        }
    }

    function cE(cW, e, cV, cU) {
        if (aJ) {
        } else {
            aK(cW, e, cV, cU)
        }
    }

    function aK(cZ, cU, cY, cW) {
        if (cZ) {
            bt("XML Request: isXDomainRequest = " + S + ":::funcCallback =  :url: " + cU)
        }
        var cX;
        if (cU == null || cU == "undefined" || cU == "") {
            return
        }
        try {
            if (S) {
                cX = new XDomainRequest();
                if (cZ) {
                    cX.onprogress = function () {
                    };
                    cX.ontimeout = function () {
                    };
                    cX.onload = function () {
                        bt("XML Request : xmlClient.onload");
                        if (window.DOMParser) {
                            var c2 = new DOMParser();
                            var c1 = c2.parseFromString(cX.responseText, "text/xml");
                            var e = {};
                            e.status = "200";
                            e.readyState = "4";
                            e.responseXML = c1;
                            e.responseText = cX.responseText;
                            cZ(e)
                        } else {
                            var c1 = new ActiveXObject("Microsoft.XMLDOM");
                            c1.async = false;
                            c1.loadXML(cX.responseText);
                            var e = {};
                            e.status = "200";
                            e.readyState = "4";
                            e.responseXML = c1;
                            cZ(e)
                        }
                    };
                    cX.onerror = function (c1) {
                        bt("XML Request : Error, loading xml. url = :" + cU);
                        if (cU.indexOf("serverIp") != -1) {
                            X = true
                        }
                        if (cU.indexOf("protocol-info") != -1) {
                            c.fastTCPFailed = true
                        }
                    }
                }
                cX.open("GET", cU, !cY);
                try {
                    if (cW) {
                        setTimeout(function () {
                            cX.send()
                        }, 100)
                    } else {
                        cX.send(null)
                    }
                } catch (c0) {
                    try {
                        cX.send(null)
                    } catch (cV) {
                    }
                }
            } else {
                cX = new XMLHttpRequest();
                cX.open("GET", cU, !cY);
                if (cZ) {
                    if (cX.overrideMimeType) {
                        cX.overrideMimeType("text/xml")
                    }
                    cX.onreadystatechange = function () {
                        bt("XML Request : xmlClient.onreadystatechange");
                        cZ(cX)
                    }
                }
                if(cU != "http://www.eplayerhtml5.performgroup.com/serverip" &&
                   cU != "http://localhost/serverip" &&
                   cU != "http://vod.aka.oss1.performgroup.com/serverip" &&
                   cU != "http://eplayer2sp-vh.akamaihd.net/serverip" &&
                   cU != "http://release.branch.eplayerhtml5.performgroup.com/serverip"){
                    cX.send(null);
                }
             }
        } catch (c0) {
            bt("Exception,  XML Request for url :" + cU + ",Exception:" + c0)
        }
    }

    function al(da) {
        var cX = da.readyState;
        var dg = da.status;
        bt("readConfig: readyState = " + cX + ":::status = " + dg);
        try {
            if (cX == 4 && dg == 200) {
                var cV = da.responseXML;
                if (cV) {
                    var c4;
                    if (cV.documentElement) {
                        c4 = cV.documentElement
                    } else {
                        c4 = cV
                    }
                    var dl = c4.getElementsByTagName("dataMetrics");
                    for (var dd = 0; dd < dl.length; ++dd) {
                        var de = dl[dd];
                        var c7 = de.parentNode;
                        var cW = c7.nodeName;
                        bi[dd] = cW;
                        var df = bn[cW] = [];
                        var cZ = c7.getAttribute("eventCode");
                        if (cZ) {
                            ad[cW] = cZ
                        }
                        var c5 = de.getElementsByTagName("data");
                        for (var dm = 0; dm < c5.length; ++dm) {
                            var c0 = c5[dm];
                            cW = c0.getAttribute("name");
                            var cY = c0.getAttribute("key");
                            cZ = c0.getAttribute("value");
                            var c3 = c0.getAttribute("sendOnce");
                            var dk = c0.getAttribute("fallback");
                            var cU = c0.getAttribute("size");
                            var dc = c0.getAttribute("regExpJS");
                            var dj = {};
                            dj.name = cW;
                            dj.key = cY;
                            if (cW in cc) {
                                cc[cW] = true
                            } else {
                                if (cY.indexOf("_cd_") != -1) {
                                    cc[cW] = true
                                }
                            }
                            if (cZ) {
                                dj.value = cZ
                            }
                            if (c3) {
                                dj.isSent = false;
                                dj.sendOnce = c3
                            }
                            if (dk) {
                                dj.fallback = dk
                            }
                            if (cU) {
                                dj.size = cU
                            }
                            if (dc) {
                                dj.regExpJS = dc
                            }
                            df.push(dj)
                        }
                    }
                    H.configDebug = parseInt(c4.getAttribute("debug"));
                    if (H.configDebug != 1) {
                        H.configDebug = 0
                    }
                    if (H.configDebug == 1) {
                        aL()
                    }
                    if (c4.getElementsByTagName("isActive")[0] && c4.getElementsByTagName("isActive")[0].childNodes[0]) {
                        bR = c4.getElementsByTagName("isActive")[0].childNodes[0].nodeValue
                    }
                    aM.beaconId = c4.getElementsByTagName("beaconId")[0].childNodes[0].nodeValue;
                    aM.beaconVersion = c4.getElementsByTagName("beaconVersion")[0].childNodes[0].nodeValue;
                    var dn = c4.getElementsByTagName("logTo")[0];
                    l.logType = dn.getAttribute("logType");
                    if (!l.logType) {
                        l.logType = "relative"
                    }
                    l.logInterval = dn.getAttribute("logInterval") * 1000;
                    if (!l.logInterval) {
                        l.loginterval = 300 * 1000
                    }
                    l.heartBeatInterval = dn.getAttribute("heartBeatInterval") * 1000;
                    if (!l.heartBeatInterval) {
                        l.heartBeatInterval = 60 * 1000
                    }
                    l.secondaryLogTime = dn.getAttribute("secondaryLogTime") * 1000;
                    if (!l.secondaryLogTime) {
                        l.secondaryLogTime = 15 * 1000
                    }
                    l.isSessionWithRebufferLimit = dn.getAttribute("isSessionWithRebufferLimit");
                    if (!l.isSessionWithRebufferLimit) {
                        l.isSessionWithRebufferLimit = 500
                    }
                    l.fastTCPEnabled = dn.getAttribute("fastTCPEnabled");
                    if (!l.fastTCPEnabled) {
                        l.fastTCPEnabled = 0
                    }
                    if (l.fastTCPEnabled == 1) {
                        c.fastTCPEnabled = true
                    }
                    l.aisRequestLimit = dn.getAttribute("aisRequestLimit");
                    if (!l.aisRequestLimit) {
                        l.aisRequestLimit = 3
                    }
                    if (bQ) {
                        bQ.aisRequestLimit = l.aisRequestLimit
                    }
                    l.aisRequestInterval = dn.getAttribute("aisRequestInterval") * 1000;
                    if (!l.aisRequestInterval) {
                        l.aisRequestInterval = 30 * 1000
                    }
                    if (bQ) {
                        bQ.aisRequestInterval = l.aisRequestInterval
                    }
                    l.startupTimeOutlierLimit = dn.getAttribute("startupTimeOutlierLimit") * 1000;
                    if (!l.startupTimeOutlierLimit) {
                        l.startupTimeOutlierLimit = 600 * 1000
                    }
                    l.visitTimeout = dn.getAttribute("visitTimeout") * 60 * 1000;
                    if (!l.visitTimeout) {
                        l.visitTimeout = 60 * 60 * 1000
                    }
                    l.urlParamSeparator = dn.getAttribute("urlParamSeparator");
                    if (!l.urlParamSeparator) {
                        l.urlParamSeparator = "~"
                    }
                    l.encodedParamSeparator = dn.getAttribute("encodedParamSeparator");
                    if (!l.encodedParamSeparator) {
                        l.encodedParamSeparator = "*@*"
                    }
                    l.initBrowserCloseTime = dn.getAttribute("initBrowserCloseTime");
                    if (!l.initBrowserCloseTime) {
                        l.initBrowserCloseTime = 15 * 60 * 1000
                    }
                    l.seekThreshold = dn.getAttribute("seekThreshold") * 1000;
                    if (!l.seekThreshold) {
                        l.seekThreshold = 2000
                    }
                    var c2 = dn.getAttribute("delayTimer");
                    if (c2) {
                        a7.time = c2
                    }
                    var c9 = dn.getAttribute("disableDelay");
                    if (c9 == 1) {
                        a7.enabled = false
                    }
                    l.beaconUrl = dn.getElementsByTagName("host")[0].childNodes[0].nodeValue;
                    if ((l.beaconUrl.indexOf("http://") == -1) && (l.beaconUrl.indexOf("https://") == -1)) {
                        l.beaconUrl = "http://" + l.beaconUrl
                    }
                    l.beaconUrl += dn.getElementsByTagName("path")[0].childNodes[0].nodeValue;
                    l.maxLogLineLength = dn.getAttribute("maxLogLineLength");
                    if (!l.maxLogLineLength) {
                        l.maxLogLineLength = 2048
                    }
                    l.maxLogLineLength -= l.beaconUrl.length;
                    l.logVersion = "2.0";
                    l.formatVersion = "1.1";
                    if (dn.getElementsByTagName("formatVersion") && dn.getElementsByTagName("formatVersion")[0] && dn.getElementsByTagName("formatVersion")[0].childNodes[0]) {
                        l.formatVersion = dn.getElementsByTagName("formatVersion")[0].childNodes[0].nodeValue
                    }
                    l.useKey = parseInt(c4.getElementsByTagName("statistics")[0].getAttribute("useKey"));
                    var di = c4.getElementsByTagName("feedback")[0];
                    if (di != null && di !== "") {
                        bf.shouldSendFLine = true;
                        bf.limit = di.getAttribute("limit");
                        if (!bf.limit) {
                            bf.limit = 3
                        }
                        bf.socialShareLimit = di.getAttribute("socialShareLimit");
                        if (!bf.socialShareLimit) {
                            bf.socialShareLimit = 1
                        }
                    }
                    var c1 = c4.getElementsByTagName("security")[0];
                    if (c1 != null && c1 !== "") {
                        var ds = c1.getElementsByTagName("ViewerDiagnostics")[0];
                        if (ds != null && ds !== "") {
                            aE.viewerDiagnostics = {};
                            var c6 = ds.getElementsByTagName("salt")[0];
                            if (c6 != null && c6 !== "") {
                                aE.viewerDiagnostics.salt = {};
                                var c8 = c6.getAttribute("value");
                                var dq = c6.getAttribute("version");
                                if (c8 != null && c8 !== "") {
                                    aE.viewerDiagnostics.salt.value = c8;
                                    aE.viewerDiagnosticsEnabled = true;
                                    if (dq != null && dq !== "") {
                                        aE.viewerDiagnostics.salt.version = dq
                                    }
                                    aE.viewerDiagnostics.salt.bytes = c6.getAttribute("bytes") * 2;
                                    if (!aE.viewerDiagnostics.salt.bytes) {
                                        aE.viewerDiagnostics.salt.bytes = 16 * 2
                                    }
                                    aE.viewerDiagnostics.salt.iterations = c6.getAttribute("iterations");
                                    if (!aE.viewerDiagnostics.salt.iterations) {
                                        aE.viewerDiagnostics.salt.iterations = 50
                                    }
                                } else {
                                    aE.viewerDiagnosticsEnabled = false
                                }
                            }
                        }
                    }
                    var db = c4.getElementsByTagName("bucketInfo")[0];
                    cb.bucketLength = db.getElementsByTagName("bucketLength")[0].childNodes[0].nodeValue;
                    cb.bucketCount = db.getElementsByTagName("bucketCount")[0].childNodes[0].nodeValue;
                    ck = true;
                    for (var dh in a2) {
                        try {
                            if (dh.substring(0, 4) == "_cd_") {
                                cH(dh)
                            }
                        } catch (dp) {
                        }
                    }
                    m();
                    bd();
                    bA();
                    var dr = c4.getElementsByTagName("match");
                    for (var dm = 0; dm < dr.length; dm++) {
                        match = dr[dm];
                        try {
                            parentKey = match.parentNode.parentNode.getAttribute("name");
                            if (!bK[parentKey]) {
                                bK[parentKey] = {}
                            }
                            bK[parentKey][match.getAttribute("key")] = {
                                type: match.getAttribute("type"),
                                name: match.getAttribute("name"),
                                value: match.getAttribute("value")
                            }
                        } catch (dp) {
                            bt(dp)
                        }
                    }
                    aY();
                    I();
                    aI()
                }
            }
        } catch (dp) {
            bt("Exception,  readConfig :" + dp)
        }
    }

    function cH(e) {
        var cV = bn.common;
        if (cV != null) {
            var cU = {};
            cU.name = e;
            cU.key = e;
            cV.push(cU)
        }
    }

    function m() {
        try {
            var cU = bn.split;
            for (var cV = 0; cV < cU.length; cV++) {
                by[cU[cV].name] = cU[cV].key
            }
        } catch (cW) {
        }
    }

    function aY() {
        var cX = {};
        try {
            if (!bK.bitRateBucketTimes) {
                bK.bitRateBucketTimes = {};
                cX = bK.bitRateBucketTimes;
                cX.U = {key: "U", type: "range"};
                cX.S = {key: "S", max: 1500, value: "max:1500", type: "range"};
                cX.Q = {key: "Q", min: 1500, max: 2500, value: "min:1500;max:2500", type: "range"};
                cX.D = {key: "D", min: 2500, value: "min:2500", type: "range"}
            } else {
                var cZ, cW, cV;
                for (cV in bK.bitRateBucketTimes) {
                    cX = bK.bitRateBucketTimes[cV];
                    if (cX) {
                        cX.key = cV;
                        if (!cX.value) {
                            cX.category = "first"
                        } else {
                            cZ = cX.value;
                            cW = cZ.split(";");
                            for (var cU = 0; cU < cW.length; cU++) {
                                if (cW[cU].indexOf("min:") != -1) {
                                    cX.min = parseInt(cW[cU].split(":")[1])
                                } else {
                                    if (cW[cU].indexOf("max:") != -1) {
                                        cX.max = parseInt(cW[cU].split(":")[1])
                                    }
                                }
                            }
                        }
                    }
                }
            }
            bY.bitRateBucketMap = {};
            for (var cY in bK.bitRateBucketTimes) {
                bY.bitRateBucketMap[cY] = 0
            }
        } catch (c0) {
            bt("Exception, find bit rate match rules :" + c0)
        }
    }

    function I() {
        bt("fillVideoWithConfig function");
        if (ax && ax.akamai) {
            var e = ax.akamai;
            e.populateMetricsFromConfiguration();
            if (e.isSLineSent) {
                t(ax)
            }
            if (aE.viewerDiagnosticsEnabled) {
                bL(e)
            }
            e.cdn = aD(e)
        }
    }

    function aI() {
        bt("sendStoredBeacons: number of beacons to be sent = " + cA.length);
        try {
            var cV = ax.akamai;
            while (cA.length > 0) {
                var cU = cA.shift();
                bt("readConfig: sending beacon event code = " + cU.code);
                cU.element.populateMetricsFromConfiguration();
                cU.element.xViewerId = b1.xViewerId;
                cU.element.xViewerIdVersion = b1.xViewerIdVersion;
                cU.element.cdn = aD(cU.element);
                bJ(cU.element, cU.code, cU.synch)
            }
        } catch (cW) {
            bt("Exception,  sendStoredBeacons" + cW)
        }
    }

    cE(al, au.url, false, true);
    function aD(cW) {
        if (a2.cdn) {
            return a2.cdn
        } else {
            try {
                for (key in bK.cdn) {
                    var cZ = bK.cdn[key];
                    if (cZ && cZ.name && cZ.value) {
                        var cY = cW[cZ.name];
                        var cU = cZ.value.split(",");
                        for (var cV = 0; cV < cU.length; cV++) {
                            if (cY && (cY.indexOf(cU[cV].trim()) != -1)) {
                                return key;
                                break
                            }
                        }
                    }
                }
            } catch (cX) {
                bt("Exception Get CDN" + cX.message)
            }
        }
    }

    function aq(cV) {
        var cU = "";
        var e;
        if (cV.indexOf("://") != -1) {
            e = cV.indexOf("://");
            cV = cV.substring(e + 3)
        }
        if (cV.indexOf("/") != -1) {
            e = cV.indexOf("/");
            if (cV.indexOf("?") != -1) {
                var cW = cV.indexOf("?");
                e = (e < cW) ? e : cW
            }
            cU = cV.substring(0, e)
        } else {
            if (cV.indexOf("?") != -1) {
                var e = cV.indexOf("?");
                cU = cV.substring(0, e)
            } else {
                cU = cV
            }
        }
        return cU
    }

    function ao(cY, cX, e, cW) {
        var cV = cY.currentState;
        var cU = cY.seekObject;
        if (cW == "S" && cU.seekStartStreamTime == -1) {
            cU.seekStartEpochTime = cV.timeUpdateClockTime;
            cU.seekEndEpochTime = cX;
            cU.seekStartStreamTime = cV.timeUpdateStreamTime;
            cU.seekEndStreamTime = e
        } else {
            if (cW == "S" && cU.seekEndStreamTime == cV.timeUpdateStreamTime) {
                cU.seekEndEpochTime = cX;
                cU.seekEndStreamTime = e
            } else {
                if (cU.seekStartStreamTime != -1) {
                    cY.seekTime += cU.seekEndEpochTime - cU.seekStartEpochTime;
                    if (cY.seekIntervalsAsString != "-") {
                        cY.seekIntervalsAsString += "," + cU.seekStartStreamTime + ":" + cU.seekEndStreamTime
                    } else {
                        cY.seekIntervalsAsString = cU.seekStartStreamTime + ":" + cU.seekEndStreamTime
                    }
                    if (cY.pauseSeekSession != "-") {
                        cY.pauseSeekSession += ",S(" + cU.seekStartStreamTime + ":" + (cU.seekStartEpochTime - cY.startTimer) + "-" + cU.seekEndStreamTime + ":" + (cU.seekEndEpochTime - cY.startTimer) + ")"
                    } else {
                        cY.pauseSeekSession = "S(" + cU.seekStartStreamTime + ":" + (cU.seekStartEpochTime - cY.startTimer) + "-" + cU.seekEndStreamTime + ":" + (cU.seekEndEpochTime - cY.startTimer) + ")"
                    }
                    ++cY.seekCount;
                    cY.seekObject = {
                        seekStartEpochTime: -1,
                        seekEndEpochTime: -1,
                        seekStartStreamTime: -1,
                        seekEndStreamTime: -1
                    }
                }
            }
        }
    }

    function O(cV, cU) {
        bt("set RebufferSession : curTime = " + cU);
        try {
            var cX = Math.round(cU - cV.lastLogTime - cV.curRebufferTime);
            var cY = Math.round(cV.curRebufferTime);
            cV.currRebufferEndEpoch = Math.round(cU);
            cV.currRebufferStartEpoch = Math.round(cU - cY);
            if (cY > l.isSessionWithRebufferLimit) {
                cV.isSessionWithRebuffer = 1
            }
            if (cV.rebufferSession) {
                cV.rebufferSession = cV.rebufferSession + ";" + cX + ":" + cY
            } else {
                cV.rebufferSession = cX + ":" + cY
            }
        } catch (cW) {
            bt("Error, set RebufferSession" + cW.message)
        }
    }

    function cl(c0, cU) {
        var cX;
        var cZ;
        if (cU == "B") {
            var cV = "";
            if (c0.rebufferSession) {
                var e = c0.rebufferSession.split(";");
                for (var cW = 0; cW < e.length; cW++) {
                    var cY = e[cW].split(":");
                    if (cW == 0) {
                        cV += "0:" + cY[1]
                    } else {
                        cV += e[cW]
                    }
                    if (cW != e.length - 1) {
                        cV += ";"
                    }
                }
                bt("newRebufferSession = " + cV);
                c0.rebufferSession = cV
            }
            cZ = 1;
            cX = 0
        } else {
            cZ = 0;
            if (c0.lastRebufferEndEpoch > 0) {
                cX = c0.firstRebufferStartEpoch - c0.lastRebufferEndEpoch
            } else {
                cX = -1
            }
        }
        c0.rebufferSession = cZ + ":" + cX + ";" + c0.rebufferSession;
        c0.lastRebufferEndEpoch = c0.currRebufferEndEpoch
    }

    function b8(cX, cW) {
        var cU = 1;
        cX.rebufferSessionH = null;
        if (!cX.rebufferSessionArrayHLine || ((cX.rebufferSessionArrayHLine) && (cX.rebufferSessionArrayHLine.length === 0))) {
            return
        }
        while (cX.rebufferSessionArrayHLine[cU] && ((cW - cX.rebufferSessionArrayHLine[cU]) > (2 * l.heartBeatInterval))) {
            cX.rebufferSessionArrayHLine.shift();
            cX.rebufferSessionArrayHLine.shift();
            if (cX.isSessionWithRebufferH == 1) {
                cX.sendIsSessionWithRebufferH = 0;
                cX.isSessionWithRebufferH = null
            }
        }
        while (cX.rebufferSessionArrayHLine[cU]) {
            var e = cW - cX.rebufferSessionArrayHLine[cU - 1];
            var cV = cX.rebufferSessionArrayHLine[cU] - cX.rebufferSessionArrayHLine[cU - 1];
            if (cX.sendIsSessionWithRebufferH == 1) {
                if (cV > l.isSessionWithRebufferLimit) {
                    cX.isSessionWithRebufferH = 1
                }
            }
            if (cX.rebufferSessionH) {
                cX.rebufferSessionH = cX.rebufferSessionH + ";" + e + ":" + cV
            } else {
                cX.rebufferSessionH = e + ":" + cV
            }
            cU = cU + 2
        }
        cU = cU - 1;
        if (cX.rebufferSessionArrayHLine[cU]) {
            var e = cW - cX.rebufferSessionArrayHLine[cU];
            if (cX.sendIsSessionWithRebufferH == 1) {
                if (e > l.isSessionWithRebufferLimit) {
                    cX.isSessionWithRebufferH = 1
                }
            }
            if (cX.rebufferSessionH) {
                cX.rebufferSessionH = cX.rebufferSessionH + ";" + e + ":" + e
            } else {
                cX.rebufferSessionH = e + ":" + e
            }
        }
    }

    function cj(e) {
        if (a2.deliveryType) {
            return a2.deliveryType
        } else {
            return e.deliveryType
        }
    }

    function bV(cV) {
        var e = cV.readyState;
        var cU = cV.status;
        if (parseInt(cU / 100) === 4 || cU === 0) {
            bt("readServerIp: serverIpFailed request falied as status is ,in 400 series");
            X = true
        }
        if (e == 4 && cU == 200) {
            var cX = cV.responseXML;
            if (cX) {
                var cW;
                if (cX.documentElement) {
                    cW = cX.documentElement
                } else {
                    cW = cX
                }
                if (bx) {
                    ch.serverip = cW.getElementsByTagName("ip")[0].childNodes[0].nodeValue
                } else {
                    ch.serverip = cW.getElementsByTagName("serverip")[0].childNodes[0].nodeValue
                }
                bt("readServerIp : diagnostics.serverip =  " + ch.serverip)
            }
        }
    }

    function ac(e) {
        var cW = e.akamai;
        if (X) {
            bt("getting ServerIp : serverIp request failed");
            return
        }
        if (cW.hostName) {
            try {
                var cV = null;
                if (cW.protocol) {
                    if (cW.protocol.indexOf("rtmp") != -1) {
                        cV = "http://" + cW.hostName + "/fcs/ident";
                        bx = true
                    } else {
                        cV = cW.protocol + "://" + cW.hostName + "/serverip"
                    }
                    bt("getting ServerIp : serverIpPath = " + cV);
                    cE(bV, cV, false, true)
                }
            } catch (cU) {
                X = true;
                bt("getting ServerIp: error, xmphttprequest")
            }
        }
    }

    function ab(cV) {
        var cU = "";
        var cX = cV.readyState;
        var cW = cV.status;
        if (parseInt(cW / 100) === 4 || cW === 0) {
            bt("read fast tcp: fast tcp Failed request falied as status is 400 series");
            c.fastTCPFailed = true
        }
        try {
            if (cX == 4 && cW == 200) {
                var c1 = cV.responseXML;
                if (c1) {
                    bt("populating fast tcp");
                    var c2;
                    if (c1.documentElement) {
                        c2 = c1.documentElement
                    } else {
                        c2 = c1
                    }
                    if (c2 && c2.firstElementChild) {
                        var e = c2.firstElementChild;
                        var cY = "";
                        var c0 = "";
                        if (e) {
                            if (e.hasAttribute("key")) {
                                c0 = e.getAttribute("key");
                                cY = e.childNodes[0].nodeValue;
                                cU = c0 + ":" + cY
                            }
                            while (e.nextElementSibling) {
                                e = e.nextElementSibling;
                                if (e.hasAttribute("key")) {
                                    c0 = e.getAttribute("key");
                                    cY = e.childNodes[0].nodeValue;
                                    if (cU) {
                                        cU += "," + c0 + ":" + cY
                                    } else {
                                        cU = c0 + ":" + cY
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (cU) {
                c.ftcp = cU
            }
        } catch (cZ) {
            bt("Exception,  read fast tcp" + cZ)
        }
    }

    function ca(e) {
        var cW = e.akamai;
        if (c.fastTCPFailed) {
            bt("getting fast tcp: request failed");
            return
        }
        if (cW.hostName) {
            try {
                var cV = cW.protocol + "://" + cW.hostName + "/protocol-info";
                bt("getting fast tcp : fastTCPPath = " + cV);
                cE(ab, cV, false, true)
            } catch (cU) {
                c.fastTCPFailed = true;
                bt("getting ServerIp: error, xmphttprequest")
            }
        }
    }

    function aH(cU, cX) {
        try {
            var cV = cU.akamai;
            if (l && l.logInterval && !cX) {
                cV.fastTCPServerIpTimer = bE(aH, l.logInterval, [cU])
            }
            if (!X) {
                ac(cU)
            }
            if (!c.fastTCPFailed && c.fastTCPEnabled) {
                ca(cU)
            }
            if (X && c.fastTCPFailed) {
                bH(cV.fastTCPServerIpTimer)
            }
        } catch (cW) {
            bt("Exception get fast tcp server ip")
        }
    }

    function a5(e) {
        var cU = null;
        if (e.objectBased) {
            if (e.errorReason) {
                cU = e.errorReason
            } else {
                cU = b0[0]
            }
        } else {
            if (e.error && e.error.code) {
                cU = b0[e.error.code]
            } else {
                cU = b0[0]
            }
        }
        return cU
    }

    function aa(cU) {
        var e = "Play.End.Detected";
        if (cU.objectBased) {
            if (cU.endReason) {
                e = cU.endReason
            }
        }
        return e
    }

    function v() {
        b1.viewerId = a2.viewerId ? a2.viewerId : null;
        b1.viewerDiagnosticsId = a2.viewerDiagnosticsId ? a2.viewerDiagnosticsId : (a2.viewerId ? a2.viewerId : null)
    }

    function d(cU) {
        var e = cS();
        return e
    }

    function az(cV) {
        var cX = b1.viewerId;
        if (cX == "-") {
            return
        }
        if (!cX) {
            try {
                if (window && window.localStorage && window.localStorage.getItem("akamai_clientId")) {
                    cX = window.localStorage.getItem("akamai_clientId")
                } else {
                    if (y("HTML_ViewerId")) {
                        cX = y("HTML_ViewerId")
                    } else {
                        try {
                            cX = cS();
                            if (window && window.localStorage) {
                                window.localStorage.setItem("akamai_clientId", cX)
                            }
                            try {
                                ba("HTML_ViewerId", cX)
                            } catch (cW) {
                            }
                        } catch (cU) {
                            bt("window.localStorage Exception :" + cU)
                        }
                    }
                }
            } catch (cW) {
                bt("Exception,  getting viewerId" + cW);
                cX = cS()
            }
        }
        return cX
    }

    function bL(cZ, cW) {
        var cY = null;
        if (b1 && b1.viewerDiagnosticsId) {
            cY = b1.viewerDiagnosticsId
        }
        var cU = "";
        var cX = 50;
        var e = 16 * 2;
        if (!cY || cY == "-") {
            return
        }
        if (cW && cZ.xViewerId) {
            return
        }
        aR(cZ);
        bt("get Viewer DiagnosticsID");
        cY = encodeURIComponent(cY);
        if (aE && aE.viewerDiagnostics && aE.viewerDiagnostics.salt && aE.viewerDiagnostics.salt.value) {
            cU = aE.viewerDiagnostics.salt.value
        }
        if (aE && aE.viewerDiagnostics && aE.viewerDiagnostics.salt && aE.viewerDiagnostics.salt.iterations) {
            cX = aE.viewerDiagnostics.salt.iterations
        }
        if (aE && aE.viewerDiagnostics && aE.viewerDiagnostics.salt && aE.viewerDiagnostics.salt.bytes) {
            e = aE.viewerDiagnostics.salt.bytes
        }
        var cV = bm.PBKDF2(cY, cU, {keySize: e / 8, iterations: cX});
        cZ.xViewerId = cV;
        b1.xViewerId = cV
    }

    function aR(cU) {
        var e = null;
        if (aE && aE.viewerDiagnostics && aE.viewerDiagnostics.salt && aE.viewerDiagnostics.salt.version) {
            e = aE.viewerDiagnostics.salt.version
        }
        cU.xViewerIdVersion = e;
        b1.xViewerIdVersion = e
    }

    function cC(cV, cW, cU) {
        var e;
        if (cW == "viewerId" || cW == "clientId" || cW == "viewerDiagnosticsId") {
            return
        }
        if (cU) {
            if (a2[cU]) {
                e = a2[cU]
            } else {
                if (cV[cU]) {
                    e = cV[cU]
                }
            }
        }
        cV[cW] = e
    }

    this.getValueFromQueryString = function () {
        return E(key, searchURL)
    };
    function E(cV, cZ, cX) {
        if (cX == null) {
            cX = ""
        }
        try {
            if (cZ == "" || cZ == null) {
                return
            }
            cV = cV.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var cW = new RegExp("[\\?&]" + cV + "=([^&#]*)");
            var cU = cW.exec(cZ);
            if (cU == null) {
                return cX
            } else {
                return cU[1]
            }
        } catch (cY) {
            bt("Exception,  getValueFromQueryString :" + cY);
            return cX
        }
    }

    function bB(e) {
        var cU = e.akamai;
        bH(cU.fastTCPServerIpTimer);
        aH(e)
    }

    function bE(cW, cY, cV) {
        try {
            var cU = null;
            cU = setTimeout(function () {
                cW.apply(undefined, cV)
            }, cY);
            return cU
        } catch (cX) {
            bt("Exception, set window timeout:" + cX);
            try {
                cU = window.setTimeout(function () {
                    cW.apply(undefined, cV)
                }, cY)
            } catch (cX) {
                return null
            }
            return cU
        }
    }

    function bH(cU) {
        try {
            clearTimeout(cU)
        } catch (cV) {
            bt("Exception clear window timeout:" + cV);
            try {
                window.clearTimeout(cU)
            } catch (cV) {
            }
        }
    }

    function t(e) {
        bt("startBeaconTImer");
        var cU = e.akamai;
        if (cU.areTimerStarted) {
            return
        }
        bt("startBeaconTimer: starting beacon timer");
        cU.firstPLineTimer = bE(cN, l.secondaryLogTime, [e]);
        cU.hLineTimer = bE(cI, l.heartBeatInterval, [e]);
        cU.fastTCPServerIpTimer = bE(bB, (l.logInterval - 5000), [e]);
        if (e.objectBased) {
            F = 500
        }
        cU.pollingTimer = bE(cs, F, [e]);
        cU.areTimerStarted = true
    }

    function bo(e) {
        var cU = e.akamai;
        if (cU) {
            if (cU.hLineTimer) {
                bH(cU.hLineTimer)
            }
            if (cU.pollingTimer) {
                bH(cU.pollingTimer)
            }
            if (cU.fastTCPServerIpTimer) {
                bH(cU.fastTCPServerIpTimer)
            }
            if (cU.firstPLineTimer) {
                bH(cU.firstPLineTimer)
            }
            if (bQ && bQ.retryTimer) {
                bH(bQ.retryTimer)
            }
        }
    }

    function cL(cU) {
        var cX = cU.akamai;
        bf.akamai = {};
        bf.dataSent = {};
        cX.areTimerStarted = false;
        cX.isCLineSent = false;
        cX.isELineSent = false;
        cX.lastRebufferEndEpoch = 0;
        cX.connectTime = 0;
        a7.browserClose = false;
        cX.totalPlayClockTime = cX.totalStreamTime = cX.totalRebufferCount = cX.totalRebufferTime = 0;
        cX.isVisitEnd = 0;
        cX.sequenceId = "0";
        ay(cU);
        cX.attemptId = cX.sessionId = d(cX);
        v();
        cX.clientId = cX.viewerId = az(cX);
        ba("HTML_ViewerId", cX.clientId, 395);
        if (aE.viewerDiagnosticsEnabled) {
            bL(cX)
        } else {
        }
        cX.lastPLineSentTime = cX.hLineSentCount = cX.lastSLineSentTime = cX.lastHLineSentTime = 0;
        cX.lastHTime = 0;
        Q("HTML_LastCLineTime");
        bu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var cY = parseInt(y("HTML_VisitCountCookie"));
        if (!cY || cY == "") {
            cX.isVisitStart = 1;
            cY = 0;
            ba("HTML_VisitCountCookie", cY)
        }
        var cZ = parseInt(y("HTML_isPlayingCount"));
        if (!cZ || cZ == "") {
            cZ = 0;
            ba("HTML_isPlayingCount", cZ)
        }
        var e = y("HTML_VisitValueCookie");
        if (!e || e == "") {
            ba("HTML_VisitValueCookie", "0|0|0|0|0|0|0|0|0|0|0|0|0")
        }
        var cW = y("HTML_BitRateBucketCsv");
        if (!cW || cW == "") {
            ba("HTML_BitRateBucketCsv", "0,0,0,0,0,0,0,0")
        }
        var cV = y(b4);
        if (!cV || cV == "") {
            cX.browserSessionId = cX.visitId = cS();
            ba(b4, cX.visitId)
        } else {
            cX.browserSessionId = cX.visitId = y(b4)
        }
    }

    function A(e, cW) {
        var cV = e.akamai;
        cV.isILineSent = true;
        ++cV.iLineCount;
        cV.lastSLineSentTime = cW;
        if (cV.iLineCount == 1) {
            var cX = parseInt(y("HTML_VisitCountCookie"));
            ++cX;
            ba("HTML_VisitCountCookie", cX);
            f = cW
        }
        var cU = parseInt(y("HTML_VisitIntervalStartTime"));
        if (!cU || cU == " ") {
            cU = cW;
            ba("HTML_VisitIntervalStartTime", cU)
        }
        bu[0] = 1;
        cV.sendVLine = true
    }

    function aj(cY, cX) {
        try {
            var cW = ax.akamai;
            if (cW.clearVisitTimeoutId) {
                bH(cW.clearVisitTimeoutId)
            }
            cL(ax);
            cW.logInterval = "0";
            if (!ck) {
                var cV = cx(cW);
                var cU = {element: cV, code: "init", synch: cY};
                cA.push(cU)
            } else {
                bJ(cW, "init", cY)
            }
            cW.lastLogTime = cX;
            ++cW.sequenceId;
            A(ax, cX);
            cW.currentState.state = ci.init;
            bt(": sendBeaconILineAd : Setting state to init");
            cW.currentState.timeUpdateClockTime = cX;
            cW.startTimer = cX
        } catch (cZ) {
            bt("Exception, send I line AD:" + cZ)
        }
    }

    function cN(e) {
        var cV = bM();
        var cU = e.akamai;
        cU.lastPLineSentTime = cV;
        q(e, "playing", false, cV)
    }

    function r(c0, c2, cX, cW) {
        try {
            bt("start of the session function");
            var cY = c0.akamai;
            if (!cY || !cY.firstTimePlay) {
                return
            }
            if (cY.adLoadTime && cY.adLoadTime > cY.iLineSentTime) {
                cY.startupTime = cY.adLoadTime - cY.iLineSentTime;
                if (cY.adEndTime) {
                    cY.startupTime += cX - cY.adEndTime
                }
            } else {
                cY.startupTime = cX - cY.iLineSentTime
            }
            if (cY.startupTime > l.startupTimeOutlierLimit) {
                cY.outlierStartupTime = cY.startupTime;
                cY.startupTime = 0
            }
            cY.bufferingTime = cY.startupTime;
            var c1 = {type: "startup", startTime: 0, endTime: cY.startupTime};
            ay(c0);
            var cV = w(c0);
            bT(cV, cY);
            cY.streamUrl = cV;
            if (cV != null && cV.indexOf("?") != -1) {
                cV = cV.substring(0, cV.indexOf("?"))
            }
            if (cV != null && cV != "") {
                if (/.m3u8$/.exec(cV)) {
                    cY.format = "L";
                    cY.playerFormat = cY.playerType + ":" + cY.format
                } else {
                    cY.format = "P";
                    cY.playerFormat = cY.playerType + ":" + cY.format;
                    cY.deliveryType = "O"
                }
            }
            cY.streamLength = parseInt(B(c0));
            cY.played = [];
            var cU = parseInt(y("HTML_isPlayingCount"));
            cU = cU + 1;
            ba("HTML_isPlayingCount", cU);
            v();
            if (aE.viewerDiagnosticsEnabled) {
                bL(cY, true)
            }
            cY.lastSLineSentTime = cX;
            q(c0, "playStart", false, cX);
            cY.rebufferSessionArrayHLine = [];
            cY.isSLineSent = true;
            if (ck) {
                t(c0)
            }
            bu[1] = 1;
            cY.isFirstTitle = null;
            cY.isVisitStart = null;
            cY.firstTimePlay = false;
            cY.initPlayed(cW)
        } catch (cZ) {
            bt("Exception, send S line:" + cZ)
        }
    }

    function cG(cU, cX, cW) {
        try {
            bt("send beacon I line");
            var cV = cU.akamai;
            cV.cdn = aD(cV);
            aH(cU, true);
            if (!cV.iLineSentTime) {
                cV.iLineSentTime = cW
            }
            if (cU.videoWidth && cU.videoHeight) {
                cV.videoSize = cU.videoWidth + "x" + cU.videoHeight
            }
            if (!cV.isILineSent) {
                cL(cU);
                q(cU, "init", cX, cW);
                A(cU, cW);
                if (cV.clearVisitTimeoutId) {
                    bH(cV.clearVisitTimeoutId)
                }
            }
        } catch (cY) {
            bt("Exception send I line:" + cY)
        }
    }

    function cI(e) {
        var cV = e.akamai;
        cV.hLineTimer = bE(cI, l.heartBeatInterval, [e]);
        var cU = bM();
        q(e, "heartBeat", false, cU);
        cV.lastHLineSentTime = cU;
        cV.hLineSentCount++;
        if ((cV.hLineSentCount % (l.logInterval / l.heartBeatInterval)) == 0) {
            q(e, "playing", false, cU);
            cV.lastPLineSentTime = cU
        }
    }

    function bs(cU, cY, cX, cW) {
        try {
            bt("sendBeaconCLine : endReasonCode = " + cY);
            var cV = cU.akamai;
            cV.endReasonCode = cY;
            q(cU, "complete", cX, cW);
            var c1 = parseInt(y("HTML_isPlayingCount"));
            c1 = c1 - 1;
            ba("HTML_isPlayingCount", c1);
            cV.isVisitStart = null;
            cV.isCLineSent = true;
            cV.firstTimePlay = true;
            bo(cU);
            var c0 = cW;
            ba("HTML_LastCLineTime", c0)
        } catch (cZ) {
            bt("Exception, send beacon C Line:" + cZ)
        }
    }

    function g(cU, c0, cX, cW) {
        try {
            var cV = cU.akamai;
            if (c0) {
                cV.errorCode = c0
            } else {
                cV.errorCode = "UNKNOWN"
            }
            bt("sendBeaconELine : errorCode = " + cV.errorCode);
            bu[3] = 1;
            if (cV.sequenceId == 1) {
                bu[11] = 1;
                v();
                if (aE.viewerDiagnosticsEnabled) {
                    bL(cV, true)
                }
            }
            cV.playerState = "E";
            q(cU, "error", cX, cW);
            if (cV.isSLineSent) {
                var c1 = parseInt(y("HTML_isPlayingCount"));
                c1 = c1 - 1;
                ba("HTML_isPlayingCount", c1)
            }
            cV.isELineSent = true;
            cV.isVisitStart = null;
            cV.firstTimePlay = true;
            bo(cU);
            var cZ = cW;
            b6(cV);
            ba("HTML_LastCLineTime", cZ)
        } catch (cY) {
            bt("Exception, send beacon E line:" + cY)
        }
    }

    function ag(cU, cY) {
        try {
            bt("sendBeaconVLine");
            var cX = cU.akamai;
            cX.isVisitEnd = 1;
            n(cX);
            var cV = parseInt(y("HTML_VisitIntervalStartTime"));
            cX.visitMaxPersistentBitRateBucket = bZ();
            cX.visitInterval = cY - cV;
            if (cV == "" || cV == null || isNaN(cV)) {
                cX.visitInterval = cY - f
            }
            cX.sessionId = null;
            cX.attemptId = null;
            cX.sequenceId = null;
            Q("HTML_BitRateBucketCsv");
            Q("HTML_VisitValueCookie");
            Q("HTML_VisitIntervalStartTime");
            Q("HTML_LastCLineTime");
            Q("HTML_VisitCountCookie");
            Q("HTML_isPlayingCount");
            Q(b4);
            q(cU, "visit", true, cY);
            bf.akamai = {};
            bf.dataSent = {};
            bt("sendBeaconVLine: beacon sent");
            cX.sendVLine = false;
            cX.iLineCount = 0;
            bH(cU.akamai.clearVisitTimeoutId);
            var cW = cX.isPlaylist;
            cU.akamai = new aV(ax);
            if (typeof(akamaiBCVideoObject) != "undefined") {
                cU.akamai.isPlaylist = cW
            }
        } catch (cZ) {
            bt("Exception, send beacon V line:" + cZ)
        }
    }

    function W() {
        var e = y("HTML_VisitValueCookie");
        var cX = e.split("|");
        var cY;
        for (var cV = 0; cV < bu.length; cV++) {
            z[cV] += bu[cV]
        }
        bt("setVisitValueCookie :: visit values saved" + z);
        for (var cW = 0; cW < cX.length; cW++) {
            cX[cW] = parseInt(cX[cW]) + bu[cW]
        }
        var cU = cX.join("|");
        ba("HTML_VisitValueCookie", cU)
    }

    function a1() {
        try {
            var cX = y("HTML_BitRateBucketCsv");
            var cY = ar.split(",");
            var cU = cX.split(",");
            var cV = 0;
            for (var cW in bY.bitRatePlayTime) {
                cW = parseInt(cW);
                cV = parseInt((cW - 1) / 500000);
                if (cV > 7) {
                    cV = 7
                }
                cU[cV] = parseInt(cU[cV]) + bY.bitRatePlayTime[cW];
                cY[cV] = parseInt(cY[cV]) + bY.bitRatePlayTime[cW]
            }
            cX = cU.join(",");
            ba("HTML_BitRateBucketCsv", cX);
            ar = cY.join(",")
        } catch (cZ) {
            bt("Exception set bit rate bucketcsv" + cZ)
        }
    }

    function b5(e) {
        bt("entered setVisitValueParameters");
        bu[4] = e.totalPlayClockTime;
        bu[5] = e.totalPlayStreamTime;
        bu[6] = e.totalRebufferCount;
        bu[7] = e.totalRebufferTime;
        bu[8] = e.totalAdPlayClockTime;
        bu[9] = e.totalAdStartCount;
        bu[10] = e.totalAdAbandonCount;
        if (e.totalPlayClockTime > 5000) {
            bu[2] = 1
        }
        a1();
        W()
    }

    function n(cW) {
        try {
            var c1 = y("HTML_VisitValueCookie");
            var cU = c1.split("|");
            var cY = true;
            if (cU == "" || cU == null) {
                cY = false
            }
            var c2;
            var c0 = [];
            if (cY) {
                c0 = cU
            } else {
                c0 = z
            }
            var cZ = ["visitAttempts", "visitPlays", "visitViews", "visitErrors", "visitPlayClockTime", "visitPlayStreamTime", "visitRebufferCount", "visitRebufferTime", "visitAdPlayClockTime", "visitAdStartCount", "visitAdAbandonCount", "visitStartupErrors"];
            for (var cV = 0; cV < cZ.length; cV++) {
                cW[cZ[cV]] = c0[cV]
            }
        } catch (cX) {
            bt("Exception get visit value  cookie : " + cX)
        }
    }

    function bZ() {
        try {
            var cY = y("HTML_BitRateBucketCsv");
            var cV = cY.split(",");
            var cU = false;
            if (cV == null || cV == "") {
                cV = ar.split(",")
            }
            cV[0] = parseInt(cV[0]);
            var c0 = "00", cW = cV[0];
            for (var cX = 0; cX < cV.length; cX++) {
                cV[cX] = parseInt(cV[cX]);
                if (cV[cX] > 0) {
                    cU = true
                }
                if (cW < cV[cX]) {
                    cW = cV[cX];
                    c0 = "0" + cX
                }
            }
            if (cU) {
                return c0
            }
        } catch (cZ) {
            bt("Exception, get visit max bit rate bucket" + cZ)
        }
    }

    function bb(cW) {
        try {
            var cU = encodeURI(cW);
            cU = cU.replace(/#/g, "%23");
            return cU
        } catch (cV) {
            bt("Exception,  encoding beacon");
            return cW
        }
    }

    function a3() {
        try {
            bt("send delayed beacon");
            if (a7.queue && a7.queue.length > 0) {
                var cU = a7.queue.shift();
                a7.timer = bE(a3, a7.time, []);
                bt("sending delayed beacon ::" + cU.url, "BEACON");
                cE(null, cU.url, cU.isSync)
            } else {
                bt("send delayed beacon : clear the timer");
                bH(a7.timer);
                a7.timer = null
            }
        } catch (cV) {
        }
    }

    function at(cY, cX, cW) {
        if (bR == 0) {
            bt("put beacon On Wire, dont send beacon isACtive is zero");
            return
        }
        var e = l.beaconUrl + "?" + cY;
        try {
            if (a7.enabled) {
                var cV = {};
                if (a7.browserClose) {
                    if (a7.timer) {
                        bH(a7.timer)
                    }
                    if (a7.queue && a7.queue.length > 0) {
                        while (a7.queue.length > 0) {
                            cV = a7.queue.shift();
                            bt("put beacon on wire, send beacon from queue::" + cV.url, "BEACON");
                            cE(null, cV.url, cV.isSync)
                        }
                    }
                    bt("put beacon on wire browser close::" + e, "BEACON");
                    cE(null, e, cX)
                } else {
                    bt("put beacon on wire pushing beacon in queue::" + e);
                    cV.url = e;
                    cV.isSync = cX;
                    a7.queue.push(cV);
                    if (a7.timer) {
                        bt("put beacon on wire: timer is running")
                    } else {
                        bt("put beacon on wire: call send delayed beacon");
                        a3()
                    }
                }
            } else {
                bt("put beacon on wire" + e, "BEACON");
                cE(null, e, cX)
            }
        } catch (cU) {
            bt("failed to send beacon");
            bt(cU)
        }
    }

    function cw(cU, cV) {
        try {
            cU = cU.substring(0, cV);
            return cU
        } catch (cW) {
            bt("Exception,  getTruncatedMetric" + cW);
            return cU
        }
    }

    function cO(c0, cY, cU, cZ) {
        try {
            var cW;
            for (var cX = 0; cX < cY.length; cX++) {
                cW = cY[cX].name;
                var cV = null;
                if (cW in c0) {
                    cV = c0[cW]
                }
                if (cY[cX].value) {
                    cV = cY[cX].value
                }
                if (cV || cV == 0) {
                    if (cY[cX].sendOnce) {
                        if (cY[cX].isSent === false) {
                            if (cV != 0) {
                                cY[cX].isSent = true
                            }
                            h(cV, cY, cW, cX, cZ, cU)
                        }
                    } else {
                        h(cV, cY, cW, cX, cZ, cU)
                    }
                }
            }
        } catch (c1) {
            bt("Exception, assemble logs:" + c1)
        }
    }

    function h(c0, c1, cV, cX, cU, cY) {
        try {
            if (c1[cX].regExpJS) {
                var c2 = new RegExp(c1[cX].regExpJS);
                var cW = c2.exec(c0);
                if (cW) {
                    c0 = cW[cW.length - 1]
                }
            }
        } catch (cZ) {
            bt("Exception,  evaluating regExpJS attribute for metric : " + cV)
        }
        c0 = String(c0).replace(/~/g, l.encodedParamSeparator);
        if (c1[cX].size) {
            c0 = cw(c0, c1[cX].size)
        }
        if (c1[cX].key in cU) {
        } else {
            cU[c1[cX].key] = c1[cX].key;
            cY.push((l.useKey ? c1[cX].key : cV) + "=" + c0)
        }
    }

    function bJ(c4, c0, cZ) {
        try {
            bt("getBeaconStrings : eventCode =  " + c0);
            var cX = bn.common;
            var df = [];
            var c3 = bn[c0];
            if (c3 == null || c3 == "undefined") {
                bt("getbeaconstrings, return as eventmetrics undefined");
                return
            }
            var c8 = [];
            var de = {};
            if (!c4.eventCode) {
                c4.eventCode = ad[c0]
            }
            cO(c4, cX, df, de);
            if (c0 == "error") {
                c4.updateTerminateMetrics();
                b5(c4, bu)
            }
            if (c0 == "complete") {
                c4.updateTerminateMetrics();
                var cU = bn.playing;
                b5(c4, bu);
                cO(c4, cU, c8, de)
            }
            cO(c4, c3, c8, de);
            var c7 = df.join(l.urlParamSeparator);
            c7 = bb(c7);
            var dc = 0;
            try {
                for (var da in by) {
                    if (l.useKey) {
                        dc += by[da].length + 3 + l.urlParamSeparator.length
                    } else {
                        dc += da.length + 3 + l.urlParamSeparator.length
                    }
                }
            } catch (dd) {
                dc = 12
            }
            dc--;
            var c2 = l.maxLogLineLength - dc - c7.length - 3 - l.beaconUrl.length;
            if (c2 <= 0) {
                c2 = 4780 - dc - c7.length - 3 - l.beaconUrl.length
            }
            var c9 = [];
            var c6 = "";
            if (c2 > 0) {
                if (c8.length > 0) {
                    var db;
                    var cV = "";
                    var cY = "";
                    for (db = 0; db < c8.length; db++) {
                        cY = bb(c8[db]);
                        if (cY.length >= c2) {
                            c9.push(cY)
                        } else {
                            if (cV.length + cY.length <= c2) {
                                if (cV) {
                                    cV += l.urlParamSeparator + cY
                                } else {
                                    cV = cY
                                }
                            } else {
                                c9.push(cV);
                                cV = ""
                            }
                        }
                    }
                    if (cV != "") {
                        c9.push(cV)
                    }
                }
                var cW = c9.length;
                if (cW > 1) {
                    for (var c5 = 1; c5 <= cW; ++c5) {
                        c6 = c7 + l.urlParamSeparator;
                        c6 += ((l.useKey ? by.partNumber : "partNumber") + "=" + c5) + l.urlParamSeparator;
                        c6 += ((l.useKey ? by.totalParts : "totalParts") + "=" + cW) + l.urlParamSeparator;
                        c6 += c9[c5 - 1];
                        c6 += l.urlParamSeparator;
                        if (bn[c0]) {
                            at(c6, cZ, c4)
                        }
                    }
                } else {
                    c6 = c7 + l.urlParamSeparator + c9[0] + l.urlParamSeparator;
                    at(c6, cZ, c4)
                }
            } else {
                var c1 = c8.join(l.urlParamSeparator);
                c1 = bb(c1);
                c6 = c7 + l.urlParamSeparator + c1 + l.urlParamSeparator;
                if (bn[c0]) {
                    at(c6, cZ, c4)
                }
            }
        } catch (dd) {
            bt("Exception, get beacon Strings:" + dd)
        }
    }

    function b6(e) {
        bf.fLineCount = 0;
        var cU = cx(e);
        bf.akamai = cU;
        bf.akamai.customDataPopulated = false
    }

    function s() {
        try {
            var cY = "socialShare:";
            var cU = cY.length;
            var cV = bf.socialSharingObj;
            for (var cW in a2) {
                if (cW.indexOf(cY) != -1) {
                    if (cW in bf.dataSent) {
                        if (bf.dataSent[cW].count < bf.socialShareLimit) {
                            ++bf.dataSent[cW].count;
                            if (cV == null) {
                                cV[cW.substring(cU)] = a2[cW]
                            } else {
                                if (cW.substring(cU) in cV) {
                                    cV[cW.substring(cU)] = parseInt(cV[cW.substring(cU)]) + parseInt(a2[cW])
                                } else {
                                    cV[cW.substring(cU)] = a2[cW]
                                }
                            }
                        }
                    } else {
                        bf.dataSent[cW] = {};
                        bf.dataSent[cW].value = a2[cW];
                        bf.dataSent[cW].count = 1;
                        cV[cW.substring(cU)] = a2[cW]
                    }
                    delete a2[cW]
                }
            }
            bf.socialSharingObj = cV
        } catch (cX) {
            bt("Exception,  getFeedbackObj" + cX);
            bf.socialSharing = null
        }
    }

    function cP(cV) {
        try {
            var cX = null;
            if (bf.socialSharingObj != null) {
                for (var cU in bf.socialSharingObj) {
                    if (cX == null) {
                        cX = cU + ":" + bf.socialSharingObj[cU] + ","
                    } else {
                        cX += cU + ":" + bf.socialSharingObj[cU] + ","
                    }
                }
            }
            if (cX != null) {
                cV.socialSharing = cX.substring(0, cX.length - 1)
            }
        } catch (cW) {
            bt("Exception,  getFeedbackData" + cW);
            cV.socialSharing = null
        }
        bf.socialSharingObj = {}
    }

    function bw(cW) {
        try {
            for (var cV in bn) {
                if (bn[cV]) {
                    for (var cU = 0; cU < bn[cV].length; cU++) {
                        if (bn[cV][cU].fallback && !a2[bn[cV][cU].name]) {
                            cC(cW, bn[cV][cU].name, bn[cV][cU].fallback)
                        }
                    }
                }
            }
        } catch (cX) {
        }
    }

    function aU(cV) {
        try {
            var cU = R.streamName ? R.streamName : cV.streamName
        } catch (cW) {
        }
        try {
            if (a2.title) {
                cV.title = a2.title
            } else {
                cV.title = a2.eventName ? a2.eventName : cU
            }
            if (a2.eventName) {
                cV.eventName = a2.eventName
            } else {
                cV.eventName = a2.title ? a2.title : cU
            }
        } catch (cW) {
            bt("Exception,  getting title and eventName, " + cW)
        }
    }

    function aZ(cZ, c2, cW, cU) {
        bt("updating metrics for playing and end events");
        var cY = cZ.akamai;
        var c0 = 0;
        var c1 = cY.playerState;
        var cV = true;
        cY.currentStreamTime = parseInt(av(cZ));
        switch (cY.currentState.state) {
            case ci.playing:
                cY.playerState = "PL";
                if (c2 - cY.seekTime > 0) {
                    cY.updatePlayClockTime(c2 - cY.seekTime, cY.currentState.lastEventClockTime, cW)
                }
                if (cY.playClockTime < 0) {
                    cY.playClockTime = 0
                }
                cY.updatePlayed(cY.currentStreamTime);
                break;
            case ci.pause:
                cY.pauseDuration += c2;
                cY.playerState = "PS";
                break;
            case ci.rebuffering:
                cY.rebufferTime += c2;
                cY.curRebufferTime += c2;
                O(cY, cW);
                cY.playerState = "B";
                c0 = cW - cY.curRebufferTime;
                break;
            case ci.resumeBuffering:
                cY.playerState = "RB";
                cY.resumeBufferTime += c2;
                break;
            case ci.ended:
                cY.updatePlayed(cY.currentStreamTime);
                break;
            case ci.seek:
                if ((cW - cY.currentState.timeUpdateClockTime) > 0) {
                    ao(cY, cW, cY.currentStreamTime, "S")
                }
                cY.currentState.timeUpdateClockTime = cW;
                cY.playerState = "SK";
                break;
            default:
                cV = false;
                break
        }
        bY.getTransitionSession(cY);
        ao(cY);
        if (cY.rebufferSession) {
            cl(cY, c1);
            cY.firstRebufferStartEpoch = c0
        }
        if (cY.playClockTime > 5000) {
            cY.isView = 1
        }
        if (cV) {
            cY.currentState.lastEventClockTime = cW
        }
        cY.bytesLoaded = bW(cZ);
        if (cY.played) {
            var e = cY.played;
            cY.playStreamTime = 0;
            for (var cX = 0; cX < e.length; cX++) {
                cY.playStreamTime += parseInt(e[cX][1] - e[cX][0])
            }
            if (cY.logType == "R") {
                cY.playStreamTime -= cY.lastPlayStreamTime;
                cY.lastPlayStreamTime += cY.playStreamTime
            }
        }
        if (cU && cY.endReasonCode != "Browser.Close" && !cY.streamTitleSwitchReason) {
            cY.playerState = "E"
        }
    }

    function cK(cW) {
        try {
            var cU = "-";
            if (document && document.referrer) {
                var cV = document.referrer;
                cV = cV.split("/", 3);
                if (cV && cV[2]) {
                    cU = cV[2]
                }
            }
            if (window == window.top) {
                cW.pageUrl = a2.pageUrl ? a2.pageUrl : document.URL;
                cW.pageHost = (a2.pageUrl && aq(a2.pageUrl)) ? aq(a2.pageUrl) : document.location.hostname;
                cW.pageReferrer = a2.pageReferrer ? a2.pageReferrer : (document.referrer ? document.referrer : "-");
                cW.pageReferrerHost = (a2.pageReferrer && aq(a2.pageReferrer)) ? aq(a2.pageReferrer) : (document.referrer ? cU : "-")
            } else {
                cW.pageUrl = a2.pageUrl ? a2.pageUrl : (document.referrer ? document.referrer : "-");
                cW.pageHost = (a2.pageUrl && aq(a2.pageUrl)) ? aq(a2.pageUrl) : (document.referrer ? cU : "-");
                cW.pageReferrer = a2.pageReferrer ? a2.pageReferrer : "NA";
                cW.pageReferrerHost = (a2.pageReferrer && aq(a2.pageReferrer)) ? aq(a2.pageReferrer) : "NA"
            }
        } catch (cX) {
        }
    }

    function aT(cV) {
        try {
            var cU;
            for (cU in R) {
                if ((cU != "viewerId") && (cU != "clientId") && (cU != "viewerDiagnosticsId") && (cU != "pluginVersion")) {
                    cV[cU] = R[cU]
                }
            }
            if ("pluginVersion" in R) {
                cV.pluginVersion = bD + ":" + R.pluginVersion
            }
        } catch (cW) {
        }
    }

    function cn(cX, cW) {
        bt("populate custom data, eventCode = " + cW);
        try {
            cK(cX);
            cX.deliveryType = cj(cX);
            cX.device = a2.device ? a2.device : aO;
            if (cW == "playing" || cW == "complete" || cW == "feedback" || cW == "error") {
                cP(cX);
                if ((cX.socialSharing == null || cX.socialSharing == "") && cW == "feedback" && (!cX.customDataChanged)) {
                    --bf.fLineCount;
                    return
                }
            }
            var cV;
            for (cV in a2) {
                if ((cV != "viewerId") && (cV != "clientId") && (cV != "viewerDiagnosticsId")) {
                    if (!(cV in b3)) {
                        cX[cV] = a2[cV]
                    }
                }
            }
            if (bQ && bQ.akamai) {
                for (var cU in bQ.akamai) {
                    cX[cU] = bQ.akamai[cU]
                }
            }
            aU(cX);
            cX.cdn = aD(cX)
        } catch (cY) {
            bt("Exception,  populate Custom Data , " + cY)
        }
    }

    function q(c1, cY, c0, cW) {
        try {
            bt("sendBeacon: eventCode = " + cY + ", clocktime = " + cW);
            var cX = c1.akamai;
            var c4 = cW - cX.currentState.lastEventClockTime;
            if (cY != "init") {
                cX.logInterval = (cX.lastLogTime <= 0) ? "0" : (cW - cX.lastLogTime) / 1000
            } else {
                cX.logInterval = "0"
            }
            if (!cX.customDataPopulated) {
                cn(cX, cY)
            }
            cX.serverIp = (ch.serverip) ? ch.serverip : "-";
            cX.fastTCP = (c.ftcp) ? c.ftcp : "-";
            cX.eventCode = ad[cY];
            if (cX.hLineSentCount > 0) {
                cX.lastHTime = (cW - cX.lastHLineSentTime) / 1000
            } else {
                cX.lastHTime = (cW - cX.lastSLineSentTime) / 1000
            }
            if (cY == "heartBeat") {
                var c3 = cX.logInterval;
                cX.logInterval = (cW - cX.lastPLineSentTime) / 1000;
                b8(cX, cW)
            }
            if (cX.logInterval < 0) {
                cX.logInterval = "0"
            }
            var cV = false;
            if (cY == "complete") {
                cY = "playing";
                cV = true
            }
            cX.endOfStream = c1.ended ? "1" : "0";
            cX.currentClockTime = cW - cX.startTimer;
            cX.currentStreamTime = parseInt(av(c1));
            if (cY == "playStart") {
            }
            if (cY == "error") {
            }
            if (cY == "playing" && !cX.playEndMetricsUpdated) {
                if (cV) {
                    b8(cX, cW)
                }
                bt("send Beacon, updating play and end metrics");
                aZ(c1, c4, cW, cV);
                ay(c1)
            }
            if (!cX.customDataPopulated) {
                bw(cX)
            }
            aT(cX);
            if (!ck) {
                var c2 = cx(cX);
                var cU = {element: c2, code: (cV) ? "complete" : cY, synch: c0};
                cA.push(cU);
                if (cY == "playing" || cY == "playStart") {
                    cX.clearRelativeMetrics()
                }
                if (cY != "heartBeat") {
                    bt("send beacon :configurationPopulated false sequenceId = " + cX.sequenceId);
                    ++cX.sequenceId;
                    cX.lastLogTime = cW
                } else {
                    cX.logInterval = c3
                }
                return
            }
            if (cY == "playStart") {
                aQ()
            }
            cX.populateMetricsFromConfiguration();
            cX.xViewerId = b1.xViewerId;
            cX.xViewerIdVersion = b1.xViewerIdVersion;
            if (cV) {
                bJ(cX, "complete", c0)
            } else {
                bJ(cX, cY, c0)
            }
            cX.qualityOfExperience = null;
            cV = false;
            if (cY == "playing" || cY == "playStart") {
                cX.clearRelativeMetrics()
            }
            if (cY != "heartBeat") {
                ++cX.sequenceId;
                cX.lastLogTime = cW
            } else {
                cX.logInterval = c3
            }
        } catch (cZ) {
            bt("Exception, send beacon:" + cZ)
        }
    }

    function cx(cV, cX) {
        var cX = cX || {};
        try {
            for (var cU in cV) {
                if ((typeof cV[cU] === "object") && (cV[cU])) {
                    cX[cU] = (cV[cU].constructor === Array) ? [] : {};
                    cx(cV[cU], cX[cU])
                } else {
                    cX[cU] = cV[cU]
                }
            }
            return cX
        } catch (cW) {
        }
    }

    this.logMessage = function (cU, e) {
        bt(cU, e)
    };
    function bt(cY, cV) {
        try {
            if (H.configURLCsmaDebug == 1 || H.pageURLCsmaDebug == 1 || H.configDebug == 1) {
                try {
                    if (H.printException) {
                        if (cY.indexOf("Exception") != -1) {
                            cV = "ERROR"
                        }
                    }
                } catch (cX) {
                }
                try {
                    P(cY, cV)
                } catch (cU) {
                }
                try {
                    console.log(cY)
                } catch (cU) {
                }
            } else {
                if (!ck) {
                    var cW = {message: cY, msgType: cV};
                    u.push(cW)
                }
            }
        } catch (cU) {
        }
    }

    function P(cV, e) {
        if (e == null || e == "") {
            e = "TRACE"
        }
        if (cV == null || cV == "") {
            return
        }
        if (typeof AkamaiAnalytics_debugWindow_available == "function" && AkamaiAnalytics_debugWindow_available() == "1") {
            AkamaiAnalytics_debugWindow_appendLog(cV, e)
        } else {
            var cU = {message: cV, msgType: e};
            u.push(cU)
        }
    }

    function bd() {
        try {
            if (H.configURLCsmaDebug == 1 || H.pageURLCsmaDebug == 1 || H.configDebug == 1) {
                if (H.logStoredMsg) {
                    if (typeof AkamaiAnalytics_debugWindow_available == "function" && AkamaiAnalytics_debugWindow_available() == "1") {
                        if (H.logTimer) {
                            bH(H.logTimer)
                        }
                        H.logStoredMsg = false;
                        if (u.length) {
                            for (var cU = 0; cU < u.length; cU++) {
                                bt(u[cU].message, u[cU].msgType)
                            }
                            u = []
                        }
                    } else {
                        H.logTimer = bE(bd, 1000, [])
                    }
                }
            }
        } catch (cV) {
        }
    }

    var a6, a, Y;
    var b4 = "AkamaiAnalytics_BrowserSessionId";
    var bp = null;
    var aA = null;
    var bI = null;
    var cq = null;
    var cy = null;
    var aO = null;
    var a9 = null;
    if (navigator && navigator.userAgent) {
        a9 = navigator.userAgent
    }
    function cf() {
        if (navigator && navigator.userAgent) {
            try {
                var e = navigator.userAgent;
                var cX = /\((\w+)/;
                var cV = cX.exec(e);
                aA = cV[1].toLowerCase();
                if (aA.indexOf("compatible") != -1 || aA.indexOf("windows") != -1) {
                    aA = "Windows"
                } else {
                    if (aA.indexOf("x11") != -1) {
                        aA = "Linux"
                    } else {
                        if (aA.indexOf("macintosh") != -1 || aA.indexOf("mac os") != -1 || aA.indexOf("macos") != -1) {
                            aA = "Mac OS"
                        } else {
                            if (aA.indexOf("ipad") != -1) {
                                aA = "iPad"
                            } else {
                                if (aA.indexOf("iphone") != -1) {
                                    aA = "iPhone"
                                } else {
                                    if (aA.indexOf("ipod") != -1) {
                                        aA = "iOS"
                                    } else {
                                        if (e.indexOf("Android") != -1) {
                                            aA = "Android"
                                        } else {
                                            aA = "Others"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (cW) {
                bt("Exception,  finding Osname");
                aA = "Others"
            }
            bI = aA;
            try {
                cX = /(NT|OS X|Linux|CPU.*?OS) ([0-9\._]+)/;
                cV = cX.exec(e);
                cy = cV[2] ? cV[2] : "";
                if (cy) {
                    bI += " " + cy
                }
                var cU = null;
                if (aA == "Windows") {
                    cU = aW(cy);
                    aA = aA + " " + cU
                }
            } catch (cW) {
                bt("Exception,  OSVersion" + cW)
            }
        }
    }

    function aW(e) {
        var cU = null;
        if (e) {
            if (e == "6.3" || e == "6.2") {
                cU = "8"
            } else {
                if (e == "6.1") {
                    cU = "7"
                } else {
                    if (e == "6.0") {
                        cU = "Vista"
                    } else {
                        if (e == "5.2" || e == "5.1") {
                            cU = "XP"
                        } else {
                            cU = "Other"
                        }
                    }
                }
            }
        }
        return cU
    }

    function J() {
        if (navigator && navigator.userAgent) {
            var e = navigator.userAgent;
            var cW = /(MSIE|Chrome|Version|Firefox)[ \/]([0-9]+)/;
            try {
                var cU = cW.exec(e);
                bp = cU[1];
                if (cU[1] == "Version") {
                    cW = /(Opera|Safari)/;
                    var cX = cW.exec(e);
                    bp = cX[1]
                }
            } catch (cV) {
                bt("Exception,  browserName" + cV)
            }
            try {
                bt("browser version = " + cU[2]);
                cq = cU[2];
                if (bp && cq) {
                    bp = bp + " " + cq
                }
            } catch (cV) {
                bt("Exception,  browserVersion" + cV)
            }
        }
    }

    function bv() {
        if (navigator && navigator.userAgent) {
            try {
                var cU = navigator.userAgent;
                cU = cU.toLowerCase();
                if (cU.indexOf("ipad") != -1) {
                    aO = "iPad"
                } else {
                    if (cU.indexOf("iphone") != -1) {
                        aO = "iPhone"
                    } else {
                        if (cU.indexOf("android") != -1) {
                            aO = "Android Device"
                        } else {
                            if (cU.indexOf("macintosh") != -1 || cU.indexOf("windows") != -1 || cU.indexOf("compatible") != -1) {
                                aO = "Desktop"
                            } else {
                                aO = "Others"
                            }
                        }
                    }
                }
            } catch (cV) {
                bt("Exception,  getitng device name : " + cV);
                aO = "Others"
            }
        }
    }

    cf();
    J();
    bv();
    var ci = {ended: 0, init: 1, playing: 2, pause: 3, seek: 4, rebuffering: 5, resumeBuffering: 6};

    function ct(cU) {
        try {
            switch (cU) {
                case ci.ended:
                    return "ended";
                    break;
                case ci.init:
                    return "init";
                    break;
                case ci.playing:
                    return "playing";
                    break;
                case ci.pause:
                    return "pause";
                    break;
                case ci.seek:
                    return "seek";
                    break;
                case ci.rebuffering:
                    return "rebuffering";
                    break;
                case ci.resumeBuffering:
                    return "resumeBuffering";
                    break;
                default:
                    return "undefined";
                    break
            }
        } catch (cV) {
        }
    }

    var bu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var f;
    var ar = "0,0,0,0,0,0,0,0";

    function aV(e) {
        if (e && e.customMetrics) {
            for (var cU in e.customMetrics) {
                if (!(cU in b3)) {
                    this[cU] = e.customMetrics[cU]
                }
            }
        }
        this.userAgent = a9;
        this.playerType = "HTML5";
        this.pluginVersion = bD;
        this.os = aA;
        this.fullOs = bI;
        this.osVersion = cy;
        this.browser = bp;
        this.browserVersion = cq;
        this.browserSize = window.innerWidth + "x" + window.innerHeight;
        this.rebufferCount = 0;
        this.bytesLoadedCallback = 0;
        this.lastBytesLoaded = 0;
        this.currRebufferEndEpoch = 0;
        this.totalPlayClockTime = 0;
        this.totalPlayStreamTime = 0;
        this.totalRebufferCount = 0;
        this.totalRebufferTime = 0;
        this.totalPauseCount = 0;
        this.totalPauseDuration = 0;
        this.totalSeekCount = 0;
        this.totalSeekTime = 0;
        this.totalResumeBufferCount = 0;
        this.totalResumeBufferTime = 0;
        this.totalAdPlayClockTime = 0;
        this.totalAdStartCount = 0;
        this.totalAdAbandonCount = 0;
        this.updateTerminateMetrics = function () {
            try {
                if (this.playClockTime) {
                    this.totalPlayClockTime += parseInt(this.playClockTime)
                }
                if (this.playStreamTime) {
                    this.totalPlayStreamTime += parseInt(this.playStreamTime)
                }
                if (this.rebufferCount) {
                    this.totalRebufferCount += parseInt(this.rebufferCount)
                }
                if (this.rebufferTime) {
                    this.totalRebufferTime += parseInt(this.rebufferTime)
                }
                if (this.pauseCount) {
                    this.totalPauseCount += parseInt(this.pauseCount)
                }
                if (this.pauseDuration) {
                    this.totalPauseDuration += parseInt(this.pauseDuration)
                }
                if (this.seekCount) {
                    this.totalSeekCount += parseInt(this.seekCount)
                }
                if (this.seekTime) {
                    this.totalSeekTime += parseInt(this.seekTime)
                }
                if (this.resumeBufferCount) {
                    this.totalResumeBufferCount += parseInt(this.resumeBufferCount)
                }
                if (this.resumeBufferTime) {
                    this.totalResumeBufferTime += parseInt(this.resumeBufferTime)
                }
                if (this.adPlayClockTime) {
                    this.totalAdPlayClockTime += parseInt(this.adPlayClockTime)
                }
                if (this.adCount) {
                    this.totalAdStartCount += parseInt(this.adCount)
                }
                if (this.adAbandonCount) {
                    this.totalAdAbandonCount += parseInt(this.adAbandonCount)
                }
                var cV = bM();
                this.startupAbondonWaitTime = cV;
                this.playInterval = cV
            } catch (cW) {
                bt("Unable to update cumulative metrics")
            }
        };
        this.clearRelativeMetrics = function () {
            var cV = ["rebufferCount", "rebufferTime", "playClockTime", "playStreamTime", "seekCount", "seekTime", "pauseCount", "pauseDuration", "resumeBufferCount", "resumeBufferTime", "averagedBitRate", "transitionUpSwitchCount", "transitionDownSwitchCount", "rebufferSession", "curRebufferTime", "adCount", "adPlayClockTime", "adStartupTime", "adAbandonCount", "adPauseTime"];
            this.updateTerminateMetrics();
            for (var cW = 0; cW < cV.length; ++cW) {
                this[cV[cW]] = 0
            }
            this.pauseIntervalsAsString = "-";
            this.seekIntervalsAsString = "-";
            this.pauseSeekSession = "-";
            this.transitionStreamTimeSession = "-";
            this.socialSharing = null;
            this.adSession = null;
            bf.socialSharing = null;
            bf.socialSharingObj = {};
            bY.bitRateArr = [];
            delete this.rebufferSession
        };
        this.populateMetricsFromConfiguration = function () {
            this.beaconId = aM.beaconId;
            this.beaconVersion = aM.beaconVersion;
            this.logType = (l.logType == "relative") ? "R" : "C";
            this.logVersion = l.logVersion;
            this.startupTimeOutlierLimit = l.startupTimeOutlierLimit;
            this.formatVersion = l.formatVersion;
            this.bucketCount = cb.bucketCount;
            this.bucketLength = cb.bucketLength;
            for (var cW in bn) {
                if (bn[cW]) {
                    for (var cV = 0; cV < bn[cW].length; cV++) {
                        if (bn[cW][cV].value) {
                            this[bn[cW][cV].name] = bn[cW][cV].value
                        }
                    }
                }
            }
        };
        this.initPlayed = function (cV) {
            this.played.push([cV, cV]);
            this.playingIndex = 0
        };
        this.updatePlayClockTime = function (cW, cV, cX) {
            this.playClockTime += cW;
            bY.updateBitRateArr(cW)
        };
        this.updatePlayed = function (cV, cY) {
            var cX = this.played;
            if (!cX) {
                return
            }
            for (var cW = 0; cW < cX.length; cW++) {
            }
            for (var cW = this.playingIndex; cW < cX.length && cV > cX[cW][0]; cW++) {
            }
            if (cW != this.playingIndex) {
                cX[this.playingIndex][1] = Math.max(cV, cX[cW - 1][1]);
                cX.splice(this.playingIndex + 1, cW - this.playingIndex - 1)
            } else {
                cX[this.playingIndex][1] = Math.max(cV, cX[this.playingIndex][1])
            }
            if (cY == null) {
                return
            }
            for (cW = 0; cW < cX.length; cW++) {
                if (cX[cW][0] <= cY && cX[cW][1] >= cY) {
                    this.playingIndex = cW;
                    return
                } else {
                    if ((cW + 1) < cX.length && cX[cW][1] < cY && cX[cW + 1][0] > cY) {
                        cW++;
                        this.playingIndex = cW;
                        cX.splice(cW, 0, [cY, cY]);
                        return
                    }
                }
            }
            if (cW == cX.length) {
                cX.push([cY, cY]);
                this.playingIndex = cW
            }
        };
        this.isVisitEnd = 0;
        this.sequenceId = "0";
        this.isSLineSent = false;
        this.sendVLine = false;
        this.played = [];
        this.iLineCount = 0;
        this.isPlaylist = false;
        this.isFirstTitle = 1;
        this.currentState = {
            state: ci.ended,
            lastEventClockTime: 0,
            pauseStartStreamTime: 0,
            pauseStartClockTime: 0,
            timeUpdateStreamTime: 0,
            timeUpdateClockTime: 0,
            pollingTimerStreamTime: 0,
            seekStartStreamPos: 0
        };
        this.seekObject = {
            seekStartEpochTime: -1,
            seekEndEpochTime: -1,
            seekStartStreamTime: -1,
            seekEndStreamTime: -1
        };
        this.clearRelativeMetrics();
        bt("value of configurationPopulated" + ck);
        if (ck) {
            this.populateMetricsFromConfiguration()
        }
        this.loadStartILine = false;
        this.canPlayUpdated = false;
        this.canPlayEventAutoPlay = true;
        this.format = "P";
        this.playerFormat = this.playerType + ":" + this.format;
        this.deliveryType = "O";
        this.firstTimeProgress = true;
        this.firstTimePlay = true;
        this.isILineSent = false;
        this.seekFrom = 0;
        this.lastPlayStreamTime = 0;
        this.lastPlayLogTime = 0;
        this.lastLogTime = 0;
        this.curRebufferTime = 0;
        this.sendIsSessionWithRebufferH = 1
    }

    ax.akamai = new aV(ax);
    function cp() {
        try {
            var cV, cU;
            for (cV in bn) {
                if (bn[cV]) {
                    for (cU = 0; cU < bn.length; cU++) {
                        if (bn[cV][cU].isSent && bn[cV][cU].isSent === true) {
                            bn[cV][cU].isSent = false
                        }
                    }
                }
            }
        } catch (cW) {
        }
    }

    function a0(cY) {
        bt("endOfTheSession");
        var cX = cY.akamai;
        var cZ = cX.isPlaylist;
        var cV = cX.visitId;
        var e = cX.viewerId;
        var cW = cX.streamName;
        var c1 = cX.cdn;
        var c0 = cX.sendVLine;
        var cU = cX.iLineCount;
        cY.akamai = null;
        cp();
        cX = cY.akamai = new aV(cY);
        cX.visitId = cX.browserSessionId = cV;
        cX.viewerId = cX.clientId = e;
        cX.cdn = c1;
        aC = -1;
        cX.streamName = cW;
        cX.iLineCount = cU;
        cY.akamai.clearVisitTimeoutId = bE(cB, l.visitTimeout, [cY, 1]);
        cX.sendVLine = c0;
        cX.isPlaylist = cZ;
        if (cY.played) {
            cY.played.length = 0
        }
        bY.clearBitRate()
    }

    function bk() {
        try {
            if (this.readyState == 4 && this.status == 200 && this.responseText) {
                var cZ = this.akamai;
                var cU = this.responseText.split("\n");
                var c1 = "";
                var cY = /PROGRAM-ID=(\d+)/;
                var cV, cW;
                if (cU) {
                    for (cW = 0; cW < cU.length; cW++) {
                        if ((cV = cY.exec(cU[cW]))) {
                            if (cV[1] == c1) {
                                break
                            } else {
                                c1 = cV[1]
                            }
                        }
                    }
                    if (cW != cU.length) {
                        cZ.format = "L";
                        cZ.playerFormat = cZ.playerType + ":" + cZ.format
                    }
                }
                cY = /^#EXT((INF)|(-X-STREAM-INF))[^\n]*\n([^\n]*)\n/m;
                bt("Checking");
                if ((cV = cY.exec(this.responseText))) {
                    bt("Checking done " + cV[4]);
                    if (/.m3u8$/.exec(cV[4])) {
                        try {
                            var cX = new XMLHttpRequest();
                            cX.open("GET", cV[4], true);
                            cX.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    if (this.responseText) {
                                        if (/^#EXT-X-ENDLIST/m.exec(this.responseText)) {
                                            cZ.deliveryType = "O"
                                        }
                                    }
                                }
                            };
                            if (cX.overrideMimeType) {
                                cX.overrideMimeType("text/plain")
                            }
                            cX.send(null)
                        } catch (c0) {
                            bt("parsePlaylist, Exception,  parsing play list, " + c0)
                        }
                    } else {
                        if (/^#EXT-X-ENDLIST/m.exec(this.responseText)) {
                            cZ.deliveryType = "O"
                        }
                    }
                }
            }
        } catch (c0) {
            bt("Exception,  parsePlaylist : " + c0)
        }
    }

    var b0 = ["UNKNOWN", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED"];

    function bG(e) {
        if (b2 && b2.dataset && b2.dataset.isad && b2.dataset.isad == "true") {
            return true
        } else {
            return false
        }
    }

    function bO(cV, cU, cY, cX) {
        if (cU == "playing") {
            ce = []
        }
        var cW = {};
        cW.eventType = cU;
        cW.eventTime = cX;
        if (cY) {
            cW.streamUrl = cY
        }
        if (cU == "error") {
            cW.errorCode = a5(cV)
        }
        if (ce && ce.length > 0) {
            var e = ce[ce.length - 1];
            if (e.eventType == cW.eventType && e.streamUrl == cW.streamUrl) {
                if (cU == "error") {
                    e.errorCode = cW.errorCode
                }
                e.eventTime = cW.eventTime
            } else {
                ce.push(cW)
            }
        } else {
            ce.push(cW)
        }
    }

    function L(cU, c1, c0, cW) {
        try {
            var cZ = false;
            if (ce.length > 0) {
                var cV = ce[ce.length - 1];
                bt("check error events array, previous event is : " + cV.eventType);
                if (cV.eventType == "error" && c0 == cV.streamUrl) {
                    if (c1 == "error") {
                        var cY = a5(cU);
                        if (cV.errorCode == cY) {
                            cZ = true
                        } else {
                            cZ = false
                        }
                        cV.eventTime = cW;
                        cV.errorCode = cY
                    } else {
                        if (c1 == "play" && cV.eventTime && (cW - cV.eventTime <= 2000)) {
                            cZ = true
                        }
                    }
                }
            }
        } catch (cX) {
            bt("Exception,  checkErrorEventsArray" + cX);
            cZ = false
        }
        return cZ
    }

    function bl(cV) {
        if (bG(cV)) {
            bt("handle Seeking Event : video tag is of type AD, return");
            return
        }
        try {
            var cX = bM();
            var cU = parseInt(av(cV));
            var cZ = cV.akamai;
            var cW = cZ.currentState;
            var c2 = cX - cW.lastEventClockTime;
            var cY = cX - cZ.startTimer;
            var c0 = cW.state;
            if (cW.state == ci.playing) {
                cZ.updatePlayClockTime(c2, cW.lastEventClockTime, cX)
            }
            if (cZ.isPlaylist && (cW.state == ci.ended) && (cZ.browser == "Safari")) {
            }
            cW.lastEventClockTime = cX
        } catch (c1) {
            bt("Exception,  handle Seeking Event : " + c1)
        }
    }

    function U(cV, cX, cU) {
        if (bG(cV)) {
            bt("handle Seeked Event : video tag is of type AD, return");
            return
        }
        try {
            if (!cX) {
                cX = bM()
            }
            if (!cU) {
                cU = parseInt(av(cV))
            }
            var cZ = cV.akamai;
            var cW = cZ.currentState;
            var c2 = cX - cW.lastEventClockTime;
            var cY = cX - cZ.startTimer;
            var c0 = cW.state;
            bt("entered function handle Seeked Event, currentstate = " + ct(cW.state));
            if (c0 == ci.pause || c0 == ci.playing || c0 == ci.rebuffering || cW.state == ci.seek) {
                if ((cX - cW.timeUpdateClockTime) > 0) {
                    ao(cZ, cX, cU, "S")
                }
                switch (c0) {
                    case ci.playing:
                        cZ.updatePlayed(cW.timeUpdateStreamTime, cU);
                        cW.lastEventClockTime = cX;
                        cZ.updatePlayClockTime(c2, cW.lastEventClockTime, cX);
                        cW.state = ci.seek;
                        cW.seekStartStreamPos = cU;
                        break;
                    case ci.rebuffering:
                        bt("handle seeked event, previous state is rebuffering");
                        cZ.rebufferTime += c2;
                        cZ.curRebufferTime += c2;
                        if (cZ.rebufferSessionArrayHLine) {
                            cZ.rebufferSessionArrayHLine.push(cX)
                        }
                        try {
                            O(cZ, cX);
                            cZ.curRebufferTime = 0
                        } catch (c1) {
                            bt("Error...Play" + c1.message)
                        }
                        cW.lastEventClockTime = cX;
                        cW.state = ci.seek;
                        break
                }
            }
        } catch (c1) {
            bt("Exception,  handle Seeked Event :" + c1)
        }
    }

    function Z(cV, c3) {
        if (bG(cV)) {
            bt("handlePauseEvent : video tag is of type AD, return");
            return
        }
        try {
            bt("entered function handle Pause Event");
            var cX = bM(c3);
            var cU = parseInt(av(cV));
            var c1 = cV.akamai;
            var cW = c1.currentState;
            var cY = B(cV);
            if (c1.firstTimePlay || cW.state == ci.pause) {
                return
            }
            if (cY && cY != 0 && cU && cU != 0) {
                if (Math.abs(cY - cU) < 1000) {
                    return
                }
            }
            var c4 = cX - cW.lastEventClockTime;
            var cZ = cX - c1.startTimer;
            var c0 = cW.state;
            switch (c0) {
                case ci.playing:
                    c1.updatePlayClockTime(c4, cW.lastEventClockTime, cX);
                    ++c1.pauseCount;
                    ao(c1, cX, cU, "P");
                    if (c1.pauseSeekSession != "-") {
                        c1.pauseSeekSession += ",P(" + cU + ":" + cZ + ")"
                    } else {
                        c1.pauseSeekSession = "P(" + cU + ":" + cZ + ")"
                    }
                    c1.updatePlayed(cU);
                    break;
                case ci.rebuffering:
                    ++c1.pauseCount;
                    ao(c1, cX, cU, "P");
                    if (c1.pauseSeekSession != "-") {
                        c1.pauseSeekSession += ",P(" + cU + ":" + cZ + ")"
                    } else {
                        c1.pauseSeekSession = "P(" + cU + ":" + cZ + ")"
                    }
                    c1.rebufferTime += c4;
                    c1.curRebufferTime += c4;
                    if (c1.rebufferSessionArrayHLine) {
                        bt("handlePauseEvent : pushing, rebufferSessionArrayHLine");
                        c1.rebufferSessionArrayHLine.push(cX)
                    }
                    try {
                        O(c1, cX);
                        c1.curRebufferTime = 0
                    } catch (c2) {
                        bt("Error...Pause" + c2.message)
                    }
                    break
            }
            cW.state = ci.pause;
            cW.pauseStartStreamTime = cU;
            cW.pauseStartClockTime = cX;
            cW.lastEventClockTime = cX
        } catch (c2) {
            bt("Exception,  handlePauseEvent : " + c2)
        }
    }

    function bF(cW, cV) {
        try {
            if (ax && ax.akamai) {
                bt("handle bit rate switch");
                try {
                    cW = parseInt(cW)
                } catch (cZ) {
                    bt("Exception,bit rate to int :" + cZ);
                    return
                }
                if (isNaN(cW)) {
                    bt("handle bitrate swtich, bite rate isNaN")
                }
                var cY = ax.akamai;
                var cX = cY.currentState;
                var cU = av(ax);
                if (bY.currentBitRate != "-") {
                    if (cW > bY.currentBitRate) {
                        cY.transitionUpSwitchCount++
                    } else {
                        if (cW < bY.currentBitRate) {
                            cY.transitionDownSwitchCount++
                        }
                    }
                }
                if (cX && cX.state == ci.playing) {
                    i(ax, cV)
                }
                bY.currentBitRate = cW;
                bY.currentStartPos = cU
            }
        } catch (cZ) {
            bt("Exception, handle bit rate switch:" + cZ)
        }
    }

    function am(cV, c0) {
        if (bG(cV)) {
            bt("handle Play Event : video tag is of type AD, return");
            return
        }
        try {
            var cY = bM(c0);
            var c4 = w(cV);
            if (cV.akamai && cV.akamai.postRollTimer) {
                bt("handle play event: send the C line without changing set data");
                bH(cV.akamai.postRollTimer);
                delete cV.akamai.postRollTimer;
                ai(cV, cY)
            }
            if (!cV.objectBased && !c4) {
                bt("handle play event, video is null");
                return
            }
            if (L(cV, "play", c4, cY)) {
                bt("handle play Event: play is thrown after error, return, curTime = " + cY);
                return
            }
            bO(cV, "play", c4, cY);
            var c2 = cV.akamai;
            var cU = parseInt(av(cV));
            var cW = c2.currentState;
            var c5 = cY - cW.lastEventClockTime;
            var cZ = cY - c2.startTimer;
            var c1 = cW.state;
            bt("entered function handle Play Event, current state = " + ct(cW.state));
            switch (c1) {
                case ci.ended:
                    bT(c4, c2);
                    c2.streamUrl = c4;
                    c2.startTimer = cY;
                    c2.streamLength = parseInt(B(cV));
                    if (c4 != null && c4.indexOf("?") != -1) {
                        c4 = c4.substring(0, c4.indexOf("?"))
                    }
                    if (c4 != null && c4 != "" && (/.m3u8$/.exec(c4))) {
                        c2.format = "L";
                        c2.playerFormat = c2.playerType + ":" + c2.format;
                        c2.deliveryType = "L";
                        try {
                            var cX = new XMLHttpRequest();
                            cX.akamai = c2;
                            cX.open("GET", c4, true);
                            cX.onreadystatechange = bk;
                            if (cX.overrideMimeType) {
                                cX.overrideMimeType("text/plain")
                            }
                            cX.send(null)
                        } catch (c3) {
                            bt("handleplayEvent, Exception,  parsing play list, " + c3)
                        }
                    }
                    aC = -1;
                    cG(cV, false, cY);
                    c2.currentState.state = ci.init;
                    bt(cY + ": handlePlayBackEvent : Setting state to init");
                    c2.currentState.timeUpdateClockTime = cY;
                    c2.currentState.timeUpdateStreamTime = 0;
                    c2.currentState.lastEventClockTime = cY;
                    c2.isPlaylist = true;
                    break;
                case ci.pause:
                    c2.pauseDuration += c5;
                    if (c2.pauseIntervalsAsString != "-") {
                        c2.pauseIntervalsAsString += "," + cW.pauseStartStreamTime + ":" + (cY - cW.pauseStartClockTime)
                    } else {
                        c2.pauseIntervalsAsString = cW.pauseStartStreamTime + ":" + (cY - cW.pauseStartClockTime)
                    }
                    if (c2.pauseSeekSession != "-") {
                        c2.pauseSeekSession += ",R(" + cW.pauseStartStreamTime + ":" + cZ + ")"
                    } else {
                        c2.pauseSeekSession = "R(" + cW.pauseStartStreamTime + ":" + cZ + ")"
                    }
                    c2.updatePlayed(cW.pauseStartStreamTime, cU);
                    c2.currentState.lastEventClockTime = cY;
                    ++c2.resumeBufferCount;
                    cW.state = ci.resumeBuffering;
                    break;
                case ci.init:
                    if (!c2.iLineSentTime) {
                        c2.iLineSentTime = cY
                    }
                    if (c2.loadStartILine && !c2.canPlayEventAutoPlay && !c2.canPlayUpdated) {
                        c2.iLineSentTime = cY;
                        c2.canPlayUpdated = true
                    }
                    break
            }
        } catch (c3) {
            bt("Exception,  handle Play Event:" + c3)
        }
    }

    function i(cW, cU) {
        if (bG(cW)) {
            bt("handle Playing Event : video tag is of type AD, return");
            return
        }
        try {
            var cY = bM(cU);
            var c3 = w(ax);
            if (!cW.objectBased && !c3) {
                bt("handle playing event, video is null");
                return
            }
            bO(cW, "playing", c3, cY);
            var cV = parseInt(av(cW));
            var c1 = cW.akamai;
            var cX = c1.currentState;
            var c4 = cY - cX.lastEventClockTime;
            var cZ = cY - c1.startTimer;
            var c0 = cX.state;
            bt("entered function handle Playing Event, current State = " + ct(cX.state));
            switch (c0) {
                case ci.rebuffering:
                    c1.rebufferTime += c4;
                    c1.curRebufferTime += c4;
                    if (c1.rebufferSessionArrayHLine) {
                        c1.rebufferSessionArrayHLine.push(cY)
                    }
                    try {
                        O(c1, cY);
                        c1.curRebufferTime = 0
                    } catch (c2) {
                        bt("Error...Play" + c2.message)
                    }
                    break;
                case ci.pause:
                case ci.resumeBuffering:
                    c1.resumeBufferTime += c4;
                    if (c4 == 0 && c1.resumeBufferCount > 0) {
                        --c1.resumeBufferCount
                    }
                    break;
                case ci.init:
                    r(cW, c4, cY, cV);
                    bY.currentStartPos = cV;
                    break;
                case ci.ended:
                    bt("handle Playing Event : dispatch play and playing event");
                    am(cW, cY);
                    i(cW, cY);
                    break;
                case ci.playing:
                    c1.updatePlayClockTime(c4, cX.lastEventClockTime, cY);
                    break;
                case ci.seek:
                    if ((cY - cX.timeUpdateClockTime) > 0) {
                        ao(c1, cY, cV, "S");
                        c1.updatePlayed(cX.seekStartStreamPos, cV)
                    }
                    break
            }
            cX.state = ci.playing;
            cX.lastEventClockTime = cY
        } catch (c2) {
            bt("Exception,  handle Playing Event:" + c2)
        }
    }

    function C(cW, cV) {
        if (bG(cW)) {
            bt("handleWaitingEvent : video tag is of type AD, return");
            return
        }
        try {
            var c1 = cW.akamai;
            if (c1.currentState.state == ci.rebuffering) {
                bt("already inside handleWaiting Event");
                return
            }
            var cY = bM(cV);
            var cU = parseInt(av(cW));
            var cX = c1.currentState;
            var c3 = cY - cX.lastEventClockTime;
            var cZ = cY - c1.startTimer;
            var c0 = cX.state;
            bt("entered function handle Waiting Event, current state = " + ct(cX.state));
            switch (c0) {
                case ci.playing:
                    c1.updatePlayClockTime(c3, cX.lastEventClockTime, cY);
                    ++c1.rebufferCount;
                    if (c1.rebufferCount == 1 && c1.playerState != "B") {
                        c1.firstRebufferStartEpoch = Math.round(cY)
                    }
                    if (c1.rebufferSessionArrayHLine) {
                        bt("handleWaitingEvent : pushing, rebufferSessionArrayHLine" + cY);
                        c1.rebufferSessionArrayHLine.push(cY)
                    }
                    c1.updatePlayed(cU);
                    cX.state = ci.rebuffering;
                    break;
                case ci.pause:
                    ++c1.resumeBufferCount;
                    cX.state = ci.resumeBuffering;
                    break;
                case ci.init:
                    break
            }
            cX.lastEventClockTime = cY;
            bt("handle waiting event, if seek starts, stream pos = " + cU);
            cX.seekStartStreamPos = cU
        } catch (c2) {
            bt("Exception,  handleWaitingEvent:" + c2)
        }
    }

    function p(e) {
        if (bG(e)) {
            bt("handleAbortEvent : video tag is of type AD, return");
            return
        }
        N(e)
    }

    function N(cV, c5) {
        if (bG(cV)) {
            bt("handle Error Event : video tag is of type AD, return");
            return
        }
        try {
            var cX = bM(c5);
            var c4 = w(cV);
            var c3 = a5(cV);
            if (!cV.objectBased && !c4) {
                bt("handle error event, video is null");
                return
            }
            if (L(cV, "error", c4, cX)) {
                bt("handle Error Event: consecutive error events thrown, return, curTime = " + cX);
                return
            }
            if (cV && cV.akamai && !cV.akamai.isILineSent) {
                bt("handle Error Event: calling handle Play Event");
                am(cV, cX)
            }
            bO(cV, "error", c4, cX);
            var cU = parseInt(av(cV));
            var c0 = cV.akamai;
            var cW = c0.currentState;
            var c6 = cX - cW.lastEventClockTime;
            var cY = cX - c0.startTimer;
            var cZ = cW.state;
            bt("entered function handle Error Event, current state = " + ct(cW.state));
            if (cW.state == ci.playing) {
                c0.updatePlayClockTime(c6, cW.lastEventClockTime, cX)
            }
            if (c0.isELineSent || c0.isCLineSent) {
                return
            }
            g(cV, c3, cX);
            cW.state = ci.ended;
            var c2 = parseInt(y("HTML_LastCLineTime"));
            a0(cV);
            cW.lastEventClockTime = cX
        } catch (c1) {
            bt("Exception,  handleErrorEvent:" + c1)
        }
    }

    function bC(cX, cV) {
        if (bG(cX)) {
            bt("handle Ended Event WithDelay : video tag is of type AD, return");
            return
        }
        try {
            var c0 = cX.akamai;
            var cW = c0.currentState;
            bt("entered function handle Ended Event WithDelay, current state" + ct(cW.state));
            var cZ = bM(cV);
            var cY = aa(cX);
            var cU = cZ - cW.lastEventClockTime;
            if (c0.pollingTimer) {
                bH(c0.pollingTimer)
            }
            if (bQ && bQ.retryTimer) {
                bH(bQ.retryTimer)
            }
            if (c0.hLineTimer) {
                bH(c0.hLineTimer)
            }
            if (c0.fastTCPServerIpTimer) {
                bH(c0.fastTCPServerIpTimer)
            }
            if (c0.firstPLineTimer) {
                bH(c0.firstPLineTimer)
            }
            if (bQ && bQ.retryTimer) {
                bH(bQ.retryTimer)
            }
            if (c0.postRollTimer) {
                bt("handle Ended Event WithDelay: postRollTimer already started return");
                return
            }
            cn(c0, "complete");
            aT(c0);
            bw(c0);
            c0.postRollTimer = bE(ai, 1000, [cX]);
            b6(c0);
            c0.customDataPopulated = true;
            b8(c0, cZ);
            aZ(cX, cU, cZ, true);
            c0.playEndMetricsUpdated = true
        } catch (c1) {
            bt("Exception,  handle Ended Event WithDelay" + c1);
            ai(cX, cZ)
        }
    }

    function ai(cV, c0) {
        try {
            var c2 = cV.akamai;
            if (c2.postRollTimer) {
                bH(c2.postRollTimer);
                delete c2.postRollTimer
            }
            if (c2.isELineSent || c2.isCLineSent) {
                bt("handle Ended Event : already sent C line, return");
                return
            }
            var cY = bM(c0);
            var cU = parseInt(av(cV));
            var cW = c2.currentState;
            var c5 = cY - cW.lastEventClockTime;
            var cZ = cY - c2.startTimer;
            var c1 = cW.state;
            bt("entered function handle Ended Event, current state" + ct(cW.state));
            if (!c2.playEndMetricsUpdated) {
                aZ(cV, c5, cY, true);
                c2.playEndMetricsUpdated = true
            }
            cW.state = ci.ended;
            var cX = aa(cV);
            if (c2.streamTitleSwitchReason != null && c2.streamTitleSwitchReason != "") {
                cX = c2.streamTitleSwitchReason
            }
            bs(cV, cX, false, cY);
            var c4 = parseInt(y("HTML_LastCLineTime"));
            a0(cV);
            cW.lastEventClockTime = cY
        } catch (c3) {
            bt("Exception,  handle Ended Event :" + c3)
        }
    }

    this.getViewerId = function () {
        try {
            var cU = ax.akamai;
            if (cU && cU.viewerId) {
                return cU.viewerId
            } else {
                return null
            }
        } catch (cV) {
            return null
        }
    };
    this.setData = function (e, cU) {
        a4(e, cU)
    };
    this.handleStreamSwitch = function () {
        cm()
    };
    this.handleTitleSwitch = function (e) {
        cu(e)
    };
    this.handleFeedbackEvent = function () {
        aw()
    };
    this.handleApplicationExit = function () {
        aP()
    };
    function a4(cU, cV) {
        try {
            if (ax && ax.akamai && ax.akamai.isSLineSent) {
                bt("setData() API called after 'Start Of Play' for dimension -> " + cU + "|All custom dimensions should be set before the play is initiated.", "WARN")
            } else {
                bt("Set Data(" + cU + ":" + cV + ")")
            }
            if (cU == "customDataObject") {
                bP(cV)
            } else {
                if (cU == "customDataFunction") {
                    be = cV
                } else {
                    try {
                        if (cV != null) {
                            cV = cV.trim()
                        }
                    } catch (cW) {
                    }
                    if (cU == "viewerId" || cU == "viewerDiagnosticsId") {
                        if (cV == null || cV == "") {
                            cV = "-"
                        }
                    }
                    try {
                        if (ck) {
                            if (cU.substring(0, 4) == "_cd_") {
                                cH(cU)
                            }
                        }
                    } catch (cW) {
                    }
                    try {
                        if (cU.indexOf("std:") != -1) {
                            R[cU.substring(4)] = cV
                        } else {
                            a2[cU] = cV
                        }
                    } catch (cW) {
                        a2[cU] = cV
                    }
                    if ((cU.indexOf("socialShare:") != -1) || (cU.indexOf("feedback:") != -1)) {
                        aw()
                    }
                }
            }
        } catch (cW) {
            bt("Exception, Set Data :" + cW)
        }
    }

    function bP(cU) {
        try {
            if (typeof(cU) == "object") {
                for (var cV in cU) {
                    a4(cV, cU[cV])
                }
            }
        } catch (cW) {
            bt("Exception set custom data object" + cW)
        }
    }

    function cm(e) {
        var cU = ax.akamai;
        cU.streamTitleSwitchReason = "Stream.Switched";
        ai(ax, e)
    }

    function cu(cW, cX) {
        ax.akamai.streamTitleSwitchReason = "Title.Switched";
        var cV = ax.akamai.isFirstTitle;
        ai(ax, cX);
        try {
            if (cW != null && cW != "") {
                for (var cU in cW) {
                    a4(cU, cW[cU])
                }
            }
        } catch (cY) {
            bt("Exception, handle title switch:" + cY)
        }
        ax.akamai.isFirstTitle = cV;
        am(ax, cX);
        i(ax, cX);
        try {
            ax.akamai.currentState.timeUpdateStreamTime = parseInt(av(ax))
        } catch (cY) {
            bt("Exception,  handleTitleSwitch" + cY)
        }
    }

    function aw() {
        try {
            var c0 = "feedback:";
            var cU = c0.length;
            var cZ = false;
            var cX = bM();
            for (var cW in a2) {
                if (cW.indexOf(c0) != -1) {
                    var cV = cW.substring(cU);
                    a2[cV] = a2[cW];
                    delete a2[cW];
                    cZ = true
                }
            }
            s();
            bt("handleFeedbackEvent");
            if (bf && bf.shouldSendFLine && bf.akamai && (bf.akamai.isCLineSent || bf.akamai.postRollTimer)) {
                if (cZ) {
                    bf.akamai.customDataChanged = true
                }
                if (bf.fLineCount < bf.limit) {
                    q(bf, "feedback", false, cX)
                }
                ++bf.fLineCount;
                bf.akamai.customDataChanged = false;
                bf.akamai.socialSharing = null
            }
        } catch (cY) {
            bt("Exception, handle feed back event :" + cY)
        }
    }

    function aP() {
        try {
            if (!ax.objectBased) {
                bt("application exit, unsubscribe video events");
                cr(ax)
            }
        } catch (cU) {
        }
        aX()
    }

    function ae(cV) {
        if (bG(cV)) {
            return
        }
        try {
            if (af) {
                bt("handle time update event, return as inside background state for idevice");
                return
            }
            var cX = bM(null, true);
            var cU = parseInt(av(cV));
            var c0 = cV.akamai;
            if (!c0) {
                return
            }
            if (c0.postRollTimer) {
                return
            }
            var cW = c0.currentState;
            var c3 = cX - cW.lastEventClockTime;
            var cZ = cX - c0.startTimer;
            var c1 = cW.state;
            var cY = cU - cW.timeUpdateStreamTime;
            if (cW.timeUpdateStreamTime != 0) {
                if (Math.abs(cY) >= l.seekThreshold && c0.isSLineSent) {
                    bt("stream diff in time update is " + cY);
                    U(cV, cX, cU)
                } else {
                    if ((cY > 0) && (cY <= 750)) {
                        if (cV.objectBased) {
                            if (cW.state == ci.seek) {
                                i(cV)
                            }
                        } else {
                            if (!c0.isSLineSent || cW.state == ci.seek || cW.state == ci.rebuffering) {
                                bt("handle time update event,  dispatching playing event,  current Video state is : " + ct(cW.state));
                                i(cV)
                            }
                        }
                    }
                }
            }
            cW.timeUpdateClockTime = cX;
            cW.timeUpdateStreamTime = cU
        } catch (c2) {
            bt("Exception,  handleTimeupddate :" + c2)
        }
    }

    this.handleSessionInit = function (cU, cV) {
        try {
            if (cU) {
                if (typeof cg != "object") {
                    cg = {}
                }
                if (cU.streamHeadPosition) {
                    cg.streamHeadPosition = cU.streamHeadPosition
                }
                if (cU.streamLength) {
                    cg.streamLength = cU.streamLength
                }
                if (cU.streamURL) {
                    cg.streamURL = cU.streamURL
                }
                if (cU.bytesLoaded) {
                    cg.bytesLoaded = cU.bytesLoaded
                }
                if (cU.customDataFunction) {
                    cg.customDataFunction = cU.customDataFunction
                }
                if (cg.customDataFunction) {
                    be = cg.customDataFunction
                }
                if (cU.firstBitRate) {
                    cg.firstBitRate = cU.firstBitRate
                }
                if (cg.firstBitRate) {
                    bF(cg.firstBitRate, cV)
                }
            }
            am(ax, cV)
        } catch (cW) {
        }
    };
    this.handleBitRateSwitch = function (cU, e) {
        bF(cU, e)
    };
    this.handlePlaying = function (e) {
        am(ax, e);
        i(ax, e)
    };
    this.handlePlayEnd = function (cU, e) {
        if (ax.objectBased) {
            ax.endReason = cU
        }
        bC(ax, e)
    };
    this.handleMediaChangedEvent = function () {
        ai(ax)
    };
    this.handlePause = function (e) {
        Z(ax, e)
    };
    this.handleResume = function (e) {
        am(ax, e);
        i(ax, e)
    };
    this.handleBufferStart = function (e) {
        C(ax, e)
    };
    this.handleBufferEnd = function (e) {
        am(ax, e);
        i(ax, e)
    };
    this.handleError = function (cU, cW) {
        try {
            if (ax.objectBased) {
                ax.errorReason = cU
            }
            N(ax, cW)
        } catch (cV) {
        }
    };
    this.handleTimeupdateEvent = function () {
        ae(ax)
    };
    this.updateAdObject = function (e) {
        bh(e)
    };
    this.handleAdLoaded = function (cV, cU) {
        try {
            bg(cV, cU)
        } catch (cW) {
        }
    };
    this.handleAdStarted = function (cU, e) {
        aN(cU, e)
    };
    this.handleAdCompleted = function (e) {
        G(e)
    };
    this.handleAdFirstQuartile = function () {
        cJ()
    };
    this.handleAdMidPoint = function () {
        b()
    };
    this.handleAdThirdQuartile = function () {
        b7()
    };
    this.handleAdStopped = function (e) {
        k(e)
    };
    this.handleAdError = function (e) {
        aG(e)
    };
    this.handleSetupAISEvent = function (e, cU, cV) {
        bc(e, cU, cV)
    };
    function bc(cU, cW, cY) {
        try {
            var cV = bQ.aisRequestLimit;
            var cX = bQ.aisRequestInterval;
            bQ = new ah();
            bQ.aisRequestInterval = cX;
            bQ.aisRequestLimit = cV;
            if (!cU) {
                bt("return from ais, platform is null");
                return
            }
            bQ.platform = cU;
            bQ.version = cW ? cW : "1.0";
            if (cY) {
                bQ.aisCustomDataObj = cY
            }
            bQ.requestUrl = "http://idp.securetve.com/rest/";
            bQ.initUrl = bQ.requestUrl + bQ.version + "/" + bQ.platform + "/init/?format=jsonp&responsefield=akaMediaAnalytics.receiveAISInitRequest";
            bQ.identityUrl = bQ.requestUrl + bQ.version + "/" + bQ.platform + "/identity/?format=jsonp&responsefield=akaMediaAnalytics.receiveAISIdentityRequest";
            bQ.initUrlId = "AkamaiAISInitUrl";
            bQ.identityUrlId = "AkamaiAISIdentityUrl";
            o(bQ.initUrl, bQ.initUrlId)
        } catch (cZ) {
            bQ.requestFailed = true
        }
    }

    this.receiveAISInitRequest = function (cW) {
        try {
            bQ.initObj = cW;
            an(bQ.initUrlId);
            if (bQ.initObj == "" || bQ.initObj == null) {
                bQ.requestFailed = true;
                return
            }
            if (bQ.requestFailed) {
                return
            }
            if (bQ.initObj.authenticated) {
                bQ.akamai = {};
                bQ.akamai.ais_queryToken = bQ.initObj.querytoken;
                if (bQ.initObj.idps) {
                    var cX = bQ.initObj.idps;
                    for (var cU in cX) {
                        bQ.akamai.ais_idpId = cU;
                        bQ.akamai.ais_idpName = cX[cU].name;
                        bQ.akamai.ais_idpDisplayName = cX[cU].display_name;
                        bQ.akamai.ais_idpUrl = cX[cU].url
                    }
                }
                o(bQ.identityUrl, bQ.identityUrlId)
            } else {
                if (!bQ.requestFailed) {
                    bt("receiveAISInitRequest, retrying the request");
                    ++bQ.aisRetries;
                    if (bQ.aisRetries < bQ.aisRequestLimit) {
                        bQ.retryTimer = bE(o, bQ.aisRequestInterval, [bQ.initUrl, bQ.initUrlId])
                    }
                }
            }
        } catch (cV) {
            bQ.requestFailed = true
        }
    };
    this.receiveAISIdentityRequest = function (cV) {
        try {
            bQ.identityObj = cV;
            an(bQ.identityUrlId);
            if (cV == null || cV == "") {
                return
            }
            if (!bQ.akamai) {
                bQ.akamai = {}
            }
            if (cV.indentity && cV.identity.aisuid) {
                bQ.akamai.ais_aisuid = cV.identity.aisuid
            }
            cv()
        } catch (cU) {
            bQ.requestFailed = true
        }
    };
    function cv() {
        var cV = {};
        var cX;
        var cW;
        try {
            if (bQ && bQ.aisCustomDataObj) {
                if (!bQ.akamai) {
                    bQ.akamai = {}
                }
                for (var cU in bQ.aisCustomDataObj) {
                    cX = bQ.aisCustomDataObj[cU].split("/");
                    if (cX[0] == "INIT" && bQ.initObj) {
                        cV = bQ.initObj
                    } else {
                        if (cX[0] == "IDENTITY" && bQ.identityObj) {
                            cV = bQ.identityObj
                        }
                    }
                    if (cV) {
                        for (cW = 1; cW < cX.length; cW++) {
                            if (cX[cW] && cV[cX[cW]]) {
                                cV = cV[cX[cW]]
                            }
                        }
                        if (typeof(cV) != "object") {
                            bQ.akamai[cU] = cV
                        }
                    }
                }
            }
        } catch (cY) {
            bt("Exception,  populateAISCustomData" + cY)
        }
    }

    function o(cV, cX) {
        try {
            var cU = document.createElement("script");
            cU.setAttribute("src", cV);
            cU.id = cX;
            document.getElementsByTagName("head")[0].appendChild(cU)
        } catch (cW) {
            bt("Exception,  loading JavaScript File " + cV)
        }
    }

    function an(cW) {
        try {
            var cU = document.getElementById(cW);
            cU.parentNode.removeChild(cU)
        } catch (cV) {
            bt("Exception,  removing script with id " + cW)
        }
    }

    function cs(cU) {
        var cV, e;
        cV = cU.akamai;
        cV.pollingTimer = bE(cs, F, [cU]);
        if (cU) {
            if (cU.isBrightcoveVideo) {
                akamaiBCVideoModule.getVideoPosition(false, ak)
            } else {
                ak(0, cU)
            }
        }
    }

    function ak(e, cW) {
        var cY, cU;
        var cX = bM(null, true);
        if (ax != null && ax.isBrightcoveVideo) {
            ax.currentTime = parseInt(e);
            cU = parseInt(e * 1000);
            cW = ax
        } else {
            cU = parseInt(av(cW))
        }
        if (cU == "undefined" || isNaN(cU) || cU == "") {
            return
        }
        cY = cW.akamai;
        var cV = cY.currentState;
        if (cV.state == ci.ended) {
            return
        }
        if (cW.objectBased) {
            ae(cW)
        } else {
            if (cV.state == ci.pause || cV.state == ci.seek) {
                return
            }
            if ((cU != 0) && (cU === cV.pollingTimerStreamTime) && (cV.state != ci.rebuffering)) {
                bt("check stream head position, call handle waiting event");
                C(cW)
            } else {
                cV.pollingTimerStreamTime = cU
            }
        }
    }

    function av(cV) {
        var cU = 0;
        try {
            if (cV.objectBased) {
                if (cg && cg.streamHeadPosition) {
                    cU = cg.streamHeadPosition();
                    cV.currentTime = cU
                }
            } else {
                if (b2.currentTime) {
                    cU = b2.currentTime;
                    cV.currentTime = cU
                }
            }
        } catch (cW) {
        }
        if (cU == 0 && aC != -1) {
            cU = aC
        }
        if (cU != 0) {
            aC = cU
        }
        return (cU * 1000)
    }

    function B(cU) {
        var cW = 0;
        try {
            if (cU) {
                if (cU.objectBased) {
                    if (cg && cg.streamLength) {
                        cW = cg.streamLength();
                        cU.duration = cW
                    }
                } else {
                    cW = b2.duration;
                    cU.duration = cW
                }
            }
        } catch (cV) {
        }
        return (cW * 1000)
    }

    function w(cV) {
        var cU = "";
        try {
            if (cV) {
                if (cV.objectBased) {
                    if (cg && cg.streamURL) {
                        cU = cg.streamURL();
                        cV.currentSrc = cU
                    }
                } else {
                    cU = b2.currentSrc;
                    cV.currentSrc = cU
                }
            }
        } catch (cW) {
        }
        return cU
    }

    function co() {
        return av(ax) / 1000
    }

    function cR() {
        return B(ax) / 1000
    }

    function a8() {
        return w(ax)
    }

    function bW(cW) {
        var cU = 0, cV = 0;
        try {
            if (cW) {
                if (cW.objectBased) {
                    if (cg && cg.bytesLoaded) {
                        cU = parseInt(cg.bytesLoaded());
                        cV = cU - cW.akamai.lastBytesLoaded
                    }
                }
            }
        } catch (cX) {
        }
        cW.akamai.lastBytesLoaded = cU;
        if (cV > 0) {
            return cV
        }
    }

    function ay(cV) {
        try {
            var cU = {};
            if (be != null) {
                cU = be();
                bP(cU)
            }
        } catch (cW) {
        }
    }

    function bg(cV, cU) {
        try {
            bt("handle Ad loaded");
            if (x.isAdLoaded) {
                bt("handleAdLoaded API is called multiple times.|We have identified that 2 successive handleAdLoaded APIs are called.|Kindly ensure that sequence of Ad calls -- handleAdLoaded->handleAdStarted->handleAdComplete is maintained.", "WARN")
            }
            var cY = ax.akamai;
            if (!cY.isILineSent) {
                var cW = new Date().getTime();
                if (cU != null && cW - cU > 0) {
                }
            }
            var cX = bM(cU);
            x.clearAdAnalytics();
            x.isAdLoaded = true;
            x.adLoadTime = cX;
            x.adCount = 1;
            x.adAbandoned = true;
            if (cY.postRollTimer) {
                bo(ax);
                bH(cY.postRollTimer);
                cY.postRollAd = true;
                cY.customDataPopulated = false;
                x.type = 2
            } else {
                if (cY.isILineSent) {
                    if (cY.isSLineSent) {
                        Z(ax, cX);
                        x.type = 1
                    } else {
                        if (!cY.isSLineSent) {
                            if (!cY.adLoadTime) {
                                cY.adLoadTime = cX
                            }
                        }
                    }
                }
            }
            bh(cV);
            if (!cY.isILineSent) {
                aj(false, cX)
            }
        } catch (cZ) {
            bt("Exception,handle ad loaded:" + cZ)
        }
    }

    function aN(cV, cU) {
        try {
            bt("handle Ad Started");
            var cW = bM(cU);
            x.isAdStarted = true;
            if (!x.isAdLoaded) {
                bt("handleAdLoaded API is missing.|We have identified that handleAdStarted API is called without handleAdLoaded.|Kindly ensure that handleAdLoaded API is called for every Ad and relevant adObject is passed as an argument.", "WARN");
                bg(cV, cW)
            }
            x.playBucket = "0";
            x.adStartTime = cW;
            x.adStartupTime = cW - x.adLoadTime;
            x.startPos = av(ax);
            bh(cV)
        } catch (cX) {
            bt("Exception,handle ad started:" + cX)
        }
    }

    function G(cU) {
        try {
            bt("handleAdEnded");
            if (x.playBucket == "0") {
                bt("Ad Progress related APIs not called.|We have identified that handleAdFirstQuartile,handleAdMidPoint & handleAdThirdQuartile APIs have not been called.|It will be good if these APIs are called in order to capture more accurate Ad information", "WARN")
            }
            x.playBucket = "4";
            bN("0", cU)
        } catch (cV) {
            bt("Exception,handle ad completed:" + cV)
        }
    }

    function cJ() {
        if (!x.isAdStarted) {
            bt("handleAdStarted API is missing.|We have identified that handleAdFirstQuartile API is called without handleAdStarted.|Kindly ensure that handleAdStarted API is called for every Ad that starts successfully.", "ERROR")
        }
        x.playBucket = "1"
    }

    function b() {
        x.playBucket = "2"
    }

    function b7() {
        x.playBucket = "3"
    }

    function k(e) {
        bN("1", e)
    }

    function aG(e) {
        bN("3", e)
    }

    function bh(cV) {
        try {
            var cW = x.setDataArr;
            bt("populate ad metric");
            for (var cU = 0; cU < cW.length; cU++) {
                if (cW[cU] in cV) {
                    x[cW[cU]] = cV[cW[cU]]
                }
            }
        } catch (cX) {
        }
    }

    function bN(cX, cU) {
        try {
            var cZ = bM(cU);
            var cY = ax.akamai;
            x.endStatus = cX;
            if (cX != "0") {
                x.adAbandonCount = 1
            }
            if (x.isAdLoaded && x.isAdStarted) {
                x.adPlayClockTime = cZ - x.adStartTime
            }
            x.adSession = ap();
            var cV = ["adStartupTime", "adCount", "adPlayClockTime", "adAbandonCount"];
            for (var cW = 0; cW < cV.length; cW++) {
                cY[cV[cW]] += x[cV[cW]]
            }
            if (cY.adSession) {
                cY.adSession += "," + x.adSession
            } else {
                cY.adSession = x.adSession
            }
            x.isAdStarted = false;
            x.isAdLoaded = false;
            if (cX != "2") {
                x.adAbandoned = false;
                if (cY) {
                    if (cY.postRollAd) {
                        cY.postRollAd = null;
                        ai(ax, cZ)
                    } else {
                        if (cY.isSLineSent) {
                            am(ax, cZ);
                            i(ax, cZ)
                        } else {
                            if (!cY.isSLineSent) {
                                cY.adEndTime = cZ
                            }
                        }
                    }
                }
            }
        } catch (c0) {
            bt("Exception,populate ad end:" + c0)
        }
    }

    function ap() {
        var cU = "";
        var cV = ["adId", "type", "startPos", "adStartupTime", "adPlayClockTime", "playBucket", "endStatus", "adDuration", "adTitle", "adCategory", "adPartnerId", "adServer", "adDaypart", "adIndustryCategory", "adEvent"];
        try {
            for (var cW = 0; cW < cV.length; cW++) {
                if ((x[cV[cW]] == 0) || (x[cV[cW]] != null && x[cV[cW]] != "")) {
                    cU += x[cV[cW]] + ":"
                } else {
                    cU += ":"
                }
            }
            cU = cU.substring(0, cU.length - 1)
        } catch (cX) {
        }
        return cU
    }

    function aS(cU) {
        try {
            if (bG(cU)) {
                return
            }
            var cV = cU.akamai;
            if (cV.firstTimeProgress) {
            }
        } catch (cW) {
        }
    }

    function aF(cU) {
        try {
            if (bG(cU)) {
                return
            }
            var cV = cU.akamai;
            if (b2.autoplay) {
                am(cU);
                cV.loadStartILine = true
            }
        } catch (cW) {
        }
    }

    function b9(cU) {
        try {
            if (bG(cU)) {
                return
            }
            var cV = cU.akamai;
            if (b2.autoplay) {
                cV.canPlayEventAutoPlay = true
            } else {
                cV.canPlayEventAutoPlay = false
            }
        } catch (cW) {
        }
    }

    function bU(cU) {
        try {
            if (bG(cU)) {
                return
            }
            var cV = cU.akamai;
            if (cV.firstTimeProgress) {
                cV.firstTimeProgress = false
            }
            if (cV.logType == "R") {
            }
        } catch (cW) {
        }
    }

    function cT(cU) {
        try {
            if (bG(cU)) {
                return
            }
            var cV = cU.akamai;
            cV.streamLength = parseInt(B(cU))
        } catch (cW) {
        }
    }

    this.subscribeVideoObject = function (cU) {
        try {
            if (cU) {
                T(cU)
            }
        } catch (cV) {
        }
    };
    function T(cV) {
        bt("subscribeToEvents : video = " + cV);
        var cU = ["abort", "error", "play", "pause", "playing", "waiting", "seeking", "seeked", "ended", "timeupdate"];
        var cX = ["progress", "load", "durationchange"];
        b2 = cV;
        try {
            cV.addEventListener("play", bz.play = function () {
                am(ax)
            }, false);
            cV.addEventListener("pause", bz.pause = function () {
                Z(ax)
            }, false);
            cV.addEventListener("error", bz.error = function () {
                N(ax)
            }, false);
            cV.addEventListener("ended", bz.ended = function () {
                bC(ax)
            }, false);
            cV.addEventListener("playing", bz.playing = function () {
                i(ax)
            }, false);
            cV.addEventListener("waiting", bz.waiting = function () {
                C(ax)
            }, false);
            cV.addEventListener("timeupdate", bz.timeupdate = function () {
                ae(ax)
            }, false);
            cV.addEventListener("load", bz.load = function () {
                aS(ax)
            }, false);
            cV.addEventListener("progress", bz.progress = function () {
                bU(ax)
            }, false);
            cV.addEventListener("durationchange", bz.durationchange = function () {
                cT(ax)
            }, false);
            cV.addEventListener("canplay", bz.canplay = function () {
                b9(ax)
            }, false);
            cV.addEventListener("loadstart", bz.loadstart = function () {
                aF(ax)
            }, false);
            bt("subscribed to events completed")
        } catch (cW) {
            bt("Exception,  subscribeToEvents,unable to add listeners to video tag :" + cW)
        }
    }

    function cr(cU) {
        try {
            cU.removeEventListener("play", bz.play, false);
            cU.removeEventListener("pause", bz.pause, false);
            cU.removeEventListener("error", bz.error, false);
            cU.removeEventListener("ended", bz.ended, false);
            cU.removeEventListener("playing", bz.playing, false);
            cU.removeEventListener("waiting", bz.waiting, false);
            cU.removeEventListener("timeupdate", bz.timeupdate, false);
            cU.removeEventListener("load", bz.load, false);
            cU.removeEventListener("progress", bz.progress, false);
            cU.removeEventListener("durationchange", bz.durationchange, false);
            cU.removeEventListener("canplay", bz.canplay, false);
            cU.removeEventListener("loadstart", bz.loadstart, false)
        } catch (cV) {
            bt("Exception, unSubscribeFrom Events:" + cV)
        }
    }

    function bj(cW) {
        try {
            if (typeof(akamaiBCVideoObject) != "undefined") {
                b2 = akamaiBCVideoObject;
                ax.isBrightcoveVideo = true;
                initBrightcove()
            } else {
                if (ax.objectBased || ax.videoPassed) {
                } else {
                    if (document) {
                        var cV = document.getElementsByTagName("video");
                        bt("add MediaEvent Listeners : videos.length " + cV.length);
                        if (cV && cV.length == 0) {
                            cV = document.getElementsByTagName("audio")
                        }
                        for (var cU = 0; cU < cV.length; ++cU) {
                            T(cV[cU])
                        }
                        document.addEventListener("DOMNodeInserted", aB, false);
                        document.addEventListener("DOMNodeRemoved", aB, false);
                        document.addEventListener("DOMAttrModified", aB, false)
                    }
                }
            }
            if (cW) {
                if (cW.type == "DOMContentLoaded") {
                    document.removeEventListener("load", bj, true)
                } else {
                    if (cW.type == "load" && cV && cV.length > 0) {
                        document.removeEventListener("load", bj, true)
                    }
                }
            }
        } catch (cX) {
            bt("Exception,  add MediaEvent Listeners :" + cX)
        }
    }

    function aB(e) {
        var cU = e.target;
        if (cU.nodeType == cU.COMMENT_NODE || cU.tagName == null || (cU.tagName.toLowerCase() != "video" && cU.tagName.toLowerCase() != "audio")) {
            return
        }
        switch (e.type) {
            case"DOMNodeRemoved":
                if (cU.dataset && cU.dataset.isad && cU.dataset.isad == "true") {
                } else {
                    cB(ax, 0)
                }
                break;
            case"DOMNodeInserted":
                T(cU);
                break
        }
    }

    function cB(cV, c4) {
        bt("handle Video Unload");
        var cY = bM();
        var cZ = cV.akamai;
        var cX = parseInt(y("HTML_VisitCountCookie"));
        a7.browserClose = true;
        try {
            if (cZ && cZ.currentState.state >= ci.init && c4 == 0) {
                if (cZ.isELineSent || cZ.isCLineSent) {
                    return
                }
                if (x && x.adAbandoned) {
                    var cW = "Ad.Abandon";
                    if (cZ.postRollTimer) {
                        bH(cZ.postRollTimer);
                        delete cZ.postRollTimer
                    }
                    bs(cV, cW, true, cY)
                } else {
                    if (!cZ.firstTimePlay) {
                        var cW = "Browser.Close";
                        if (cZ.postRollTimer) {
                            bH(cZ.postRollTimer);
                            delete cZ.postRollTimer
                        }
                        bs(cV, cW, true, cY)
                    } else {
                        var c3 = "Browser.Refresh.NoStart";
                        if ((cY - cZ.startTimer) > l.initBrowserCloseTime) {
                            c3 = "Browser.Refresh.NoStart.Late"
                        }
                        g(cV, c3, true, cY)
                    }
                }
            }
        } catch (c0) {
        }
        try {
            var c2 = parseInt(y("HTML_LastCLineTime"));
            var c1 = (c2 + l.visitTimeout) - cY;
            var cU = parseInt(y("HTML_isPlayingCount"));
            bt("handle Video Unload: playing cookie =  " + cU + ", visit cookie :" + cX);
            if (cX >= 1 && c4 == 1) {
                if (c1 > 0) {
                    bH(cZ.clearVisitTimeoutId);
                    cV.akamai.clearVisitTimeoutId = bE(cB, c1, [cV, 1]);
                    return
                } else {
                    if (c1 <= 0 && cX > 1 && cU > 0) {
                        bH(cZ.clearVisitTimeoutId);
                        cV.akamai.clearVisitTimeoutId = bE(cB, l.visitTimeout, [cV, 1]);
                        return
                    }
                }
            }
            bt("handle Video Unload: decrementing HTML_VisitCountCookie");
            cX = cX - 1;
            ba("HTML_VisitCountCookie", cX);
            var cX = parseInt(y("HTML_VisitCountCookie"));
            if (cX === 0 || isNaN(cX)) {
                if (cZ.sendVLine) {
                    ag(cV, cY)
                }
            }
        } catch (c0) {
        }
    }

    function aX() {
        try {
            if (x.isAdLoaded) {
                bN("2")
            }
        } catch (cU) {
        }
        cB(ax, 0)
    }

    function cM(cU) {
        bt("handlePagehide");
        af = true;
        aX()
    }

    function cF(cU) {
        bt("handlePageshow:");
        try {
            if (ax && ax.tagName) {
                bt("handlePageShow: media tag is :" + ax.tagName);
                if (ax.akamai && af) {
                    bt("handlePageshow: send play and playing on timeupdate");
                    K = true
                }
            }
        } catch (cU) {
            bt("Exception,  handlePagehsow : " + cU)
        }
        af = false
    }

    function y(cV) {
        var cU = cV + "=";
        var cX = "";
        try {
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(cU);
                if (offset != -1) {
                    offset += cU.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) {
                        end = document.cookie.length
                    }
                    cX = document.cookie.substring(offset, end)
                }
            }
        } catch (cW) {
        }
        return cX
    }

    function Q(cU) {
        try {
            var cY = location.pathname.split("/");
            var cX = " path=";
            document.cookie = cU + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
            for (var cV = 0; cV < cY.length; cV++) {
                cX += ((cX.substr(-1) != "/") ? "/" : "") + cY[cV];
                document.cookie = cU + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;" + cX + ";"
            }
        } catch (cW) {
        }
    }

    function ba(cV, cW, cZ) {
        try {
            var cU = cV + "=" + cW + ";Path=/;";
            if (cZ) {
                if (parseInt(cZ) > 0) {
                    var cY = new Date();
                    cY.setDate(cY.getDate() + parseInt(cZ));
                    if (cY != null) {
                        cU += "expires=" + cY.toUTCString() + ";"
                    }
                }
            }
            if (document) {
                document.cookie = cU
            }
        } catch (cX) {
        }
    }

    function cD() {
        try {
            if (aA == "iPad" || aA == "iPhone") {
                return true
            }
        } catch (cU) {
            return false
        }
    }

    function M() {
        try {
            if (ax.objectBased || ax.videoPassed) {
                bj()
            } else {
                bt("adding MediaEventListeners: DOMContentLoaded");
                document.addEventListener("DOMContentLoaded", bj, false);
                bt("adding MediaEventListeners: Load");
                document.addEventListener("load", bj, true)
            }
        } catch (cU) {
            bt("Exception,  Addding DOMContentLoaded and Load event listeners :" + cU)
        }
        if (window) {
            if (cD()) {
                window.addEventListener("pagehide", cM, false);
                window.addEventListener("pageshow", cF, false)
            } else {
                if (typeof(akamaiBCVideoObject) != "undefined" && window.addEventListener) {
                    window.addEventListener("beforeunload", aX, false)
                } else {
                    if (window.addEventListener) {
                        try {
                            if (br()) {
                                window.parent.addEventListener("beforeunload", aX, false)
                            } else {
                                window.addEventListener("beforeunload", aX, false)
                            }
                        } catch (cU) {
                            bt("Exception, add window document listeners : " + cU);
                            window.addEventListener("beforeunload", aX, false)
                        }
                    } else {
                        if (window.attachEvent) {
                            try {
                                if (br()) {
                                    window.parent.attachEvent("onbeforeunload", aX)
                                } else {
                                    window.attachEvent("onbeforeunload", aX)
                                }
                            } catch (cU) {
                                window.attachEvent("onbeforeunload", aX)
                            }
                        }
                    }
                }
            }
        }
    }

    M()
}

E.trigger(E.EVENT_AKAMAI_HTML5_LOADED, "AkamaiHtml5", {});

function initAkamaiAnalytics(){
    if (typeof(akamaiBCVideoObject) != "undefined") {
        akaMediaAnalytics = new AkaHTML5MediaAnalytics(null)
    } else {
        if (typeof(AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH) != "undefined") {
            if ((AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH.indexOf("enableGenericAPI=1") == -1 && AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH.indexOf("subscribeVideo") == -1)) {
                akaMediaAnalytics = new AkaHTML5MediaAnalytics(null)
            }
        }
    }
}

function setAkamaiMediaAnalyticsData(b, c, a) {
    try {
        if (akaMediaAnalytics) {
            akaMediaAnalytics.setData(b, c)
        }
    } catch (d) {
    }
}
function akamaiGetViewerId() {
    try {
        var b = null;
        if (akaMediaAnalytics) {
            b = akaMediaAnalytics.getViewerId()
        }
    } catch (a) {
    }
    return b
}
function akamaiSetViewerId(a) {
    if (a == null || a == "") {
        a = "-"
    }
    setAkamaiMediaAnalyticsData("viewerId", a);
    setAkamaiMediaAnalyticsData("clientId", a)
}
function akamaiSetViewerDiagnosticsId(a) {
    if (a == null || a == "") {
        a = "-"
    }
    setAkamaiMediaAnalyticsData("viewerDiagnosticsId", a)
}
function akamaiUpdateAdObject(a) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.updateAdObject(a)
    }
}
function akamaiHandleAdStarted(a) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdStarted(a)
    }
}
function akamaiHandleAdCompleted() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdCompleted()
    }
}
function akamaiHandleAdLoaded(a) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdLoaded(a)
    }
}
function akamaiHandleAdFirstQuartile() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdFirstQuartile()
    }
}
function akamaiHandleAdMidPoint() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdMidPoint()
    }
}
function akamaiHandleAdThirdQuartile() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdThirdQuartile()
    }
}
function akamaiHandleAdError() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdError()
    }
}
function akamaiHandleAdStopped() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleAdStopped()
    }
}
function akamaiHandleStreamSwitch() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleStreamSwitch()
    }
}
function akamaiHandleTitleSwitch(a) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleTitleSwitch(a)
    }
}
function akamaiSetupAIS(a, b, c) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleSetupAISEvent(a, b, c)
    }
}
function akamaiHandleBitRateSwitch(a) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleBitRateSwitch(a)
    }
}
function akamaiHandleApplicationExit() {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handleApplicationExit()
    }
}
function akamaiSetVideoObject(a) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.subscribeVideoObject(a)
    }
}
function akamaiSubscribeVideoObject(a) {
    if (akaMediaAnalytics) {
        akaMediaAnalytics.subscribeVideoObject(a)
    }
};

function handlePlayEnd(){
    if (akaMediaAnalytics) {
        akaMediaAnalytics.handlePlayEnd();
    }
}