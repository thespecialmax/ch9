var $ = jQuery.noConflict();

//creating redirect to search results
var myUrl = window.location.href,

	urlArr = myUrl.split('/');

if (urlArr[3] == '' || urlArr[3].length <= 0) {
	//BUGFIX: Z19561
	window.location.replace(window.location.origin.replace('http:', 'https:') + '/?page=1&status=2');
}

jQuery(document).ready(function ($) {

	var myBody = $('body');



	//lot-details page
	if (myBody.hasClass('lot-details')) {


		

		//hiding empty custom fields
		$('.description-info-content .custom-field-top').each(function () {

			$(this).css({ 'display': 'block' });

			if ($('span:not(.cat-header)', this).text() == '') {

				$(this).css({ 'display': 'none' });
			}
		});


		//adding auction name and lot name to the top link-menu
		var myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> <a href="' + $('.aucinfo').attr('href') + '" class="lotinfotab">Info</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> <a href="' + $('.catlg').attr('href') + '" class="auc-name">Catalogue</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>' + $('.lot-name').html() + '</div>';

		if ($('.lbl-offer .qtextbox-ctl input[type=text]').val() == 0) {

			$('.lbl-offer .qtextbox-ctl input[type=text]').val('');
		}

		$('.lot-details-container').prepend(myTxt);

		//check if thumbs more than one and add the gallery slider if true
		if ($('.mediaThumbnails > li').length > 3) {

			let myGallerySlider = '<div class="myGallerySliderWrap"><div class="prevImageArrow"><svg class="MuiSvgIcon-root jss692" focusable="false" viewBox="0 0 24 24" color="inherit" aria-hidden="true" role="presentation"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></div><div class="myGallerySlider"></div><div class="nextImageArrow"><svg class="MuiSvgIcon-root jss692" focusable="false" viewBox="0 0 24 24" color="inherit" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></div></div>';
			$(myGallerySlider).insertAfter($('.clicktxt'));
			$('.mediaThumbnails').appendTo($('.myGallerySlider'));



		} else {

			$('.mediaThumbnails').insertAfter($('.clicktxt'));
		}

		var myElementWidth = $('.mediaThumbnails > li').length * 114,
			lastElemWidth = $('.mediaThumbnails > li:last-child').outerWidth() + 114;

		

		var gallerySlider = function () {

			let winWidth = 0,
				scrollWidth = 0;

			let unbindAll = function () {
				$('.nextImageArrow').unbind();
				$('.prevImageArrow').unbind();
			}

			const getWindowWidth = function () {
				winWidth = $(window).width();
			}

			const nextImageClick = function () {
				//unbind all clicks before animation ends
				unbindAll();
				getWindowWidth();

				if (winWidth > 480) {
					scrollWidth = 342;
				} else {
					scrollWidth = 227;
				}


				let leftMarg = parseInt($('.mediaThumbnails > li:nth-child(1)').css('marginLeft'));
				
				
				if (Math.abs(leftMarg) <= myElementWidth - 2 * lastElemWidth) {
				
					$('.mediaThumbnails > li:nth-child(1)').animate({ 'marginLeft': leftMarg - scrollWidth }, 600, gallerySlider);
				} else {
					gallerySlider();
				}

			}

			const prevImageClick = function () {
				unbindAll();
				getWindowWidth();

				if (winWidth > 480) {
					scrollWidth = 342;
				} else {
					scrollWidth = 227;
				}

				let leftMarg = parseInt($('.mediaThumbnails > li:nth-child(1)').css('marginLeft'));
				
				if (leftMarg < 0) {
					
					$('.mediaThumbnails > li:nth-child(1)').animate({ 'marginLeft': leftMarg + scrollWidth }, 600, gallerySlider);
				} else {
					gallerySlider();
				}
			}

			$('.nextImageArrow').on('click', nextImageClick);
			$('.prevImageArrow').on('click', prevImageClick);
		}

		gallerySlider();

		if ($('ul.mediaThumbnails > li > .video-thumb-slide').length) {

			$('ul.mediaThumbnails > li > .video-thumb-slide').each(function () {

				$(this).parent().insertAfter($('ul.mediaThumbnails > li:first-child'));
			});
		}

		//Sale no
		var saleNo = $(".lot-details.lot-details-index div.myAuctionNumber").first().text().trim();


		//lot number
		let myNumb = $('.auctitle>div.tle > h3').clone();
		myNumb.find('.lot-name').remove();
		
		

		var lotNoText = myNumb.text();
		lotNoText = lotNoText.trim().replace(' ', '');
		

		//let myHtml = '<div class="myLotNumber"><span class="myLotNumberLabel">Lot No:</span><span class="myLotNumberValue">' + myNumb.text().replace('Lot #', '') + '</span></div>';
		let myHtml = '<div class="myLotNumber"><span class="myLotNumberLabel">&nbsp;</span><span class="myLotNumberValue">' + lotNoText.replace('#', ' No: ') + " - " + saleNo.trim() + '</span></div>';
		$(myHtml).prependTo($('.auc_info'));

		//saleNo




		//adding lot title
		$('<div class="myLotTitle">' + $('.lot-name').text() + '</div>').insertAfter($('.myLotNumber'));

		//adding 3 icons at the top
		let firstIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M15.9845,17.8758a2.0026,2.0026,0,1,0,.1224-.2089,1.0027,1.0027,0,0,1-.0537.1059A1.0131,1.0131,0,0,1,15.9845,17.8758ZM16.07,5.8339a1.988,1.988,0,1,0-.0561-.096q.0153.0231.0295.0474C16.0523,5.8014,16.0611,5.8176,16.07,5.8339ZM7.5249,10.8208c-.01-.0154-.02-.0313-.0294-.0474s-.0182-.0323-.0266-.0486a2,2,0,1,0,0,2.1091c.0083-.0161.017-.0322.0263-.048s.0194-.0324.03-.048a2.003,2.003,0,0,0,0-1.9171ZM9.62,10.6917a4.0268,4.0268,0,0,1,0,2.1748l5.3108,3.0947a3.9861,3.9861,0,1,1-1.01,1.726L8.6115,14.5938a4,4,0,1,1,0-5.6293L13.9189,5.867a4.003,4.003,0,1,1,1.0084,1.7272Z"></path></svg>';
		let secondIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M9,3h6V2a1,1,0,0,1,2,0V3h2a3,3,0,0,1,3,3V20a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V6A3,3,0,0,1,5,3H7V2A1,1,0,0,1,9,2Zm11,8H4v9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1Zm0-2V6a1,1,0,0,0-1-1H17V6a1,1,0,0,1-2,0V5H9V6A1,1,0,0,1,7,6V5H5A1,1,0,0,0,4,6V9Z"></path></svg>';
		let thirdIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>';
		let myScript = '<div class="addthis_inline_share_toolbox"></div>';

		$('<div class="threeIconsWrapper"><div class="firstIcon iconTop">' + firstIcon + myScript + '</div><div class="secondIcon iconTop">' + secondIcon + '</div><div class="thirdIcon iconTop"></div></div>').insertAfter($('.myLotTitle'));

		$('#watchlist_button').appendTo($('.thirdIcon'));

		$(thirdIcon).appendTo($('#removeFromWatchlist'));
		$(thirdIcon).appendTo($('#addToWatchlist'));

		$('.firstIcon').on('click', function () {

			$('.addthis_inline_share_toolbox').toggle();
		});

		//adding info, catalog and similar items links
		let aucInfoIcon = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>',
			catalogIcon = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19,16 L19,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,16.3368156 C5.45462769,16.1208455 5.96320135,16 6.5,16 L19,16 Z M19,18 L6.5,18 C5.67157288,18 5,18.6715729 5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L19,21 L19,18 Z M6.5,1 L20,1 C20.5522847,1 21,1.44771525 21,2 L21,22 C21,22.5522847 20.5522847,23 20,23 L6.5,23 C4.56700338,23 3,21.4329966 3,19.5 L3,4.5 C3,2.56700338 4.56700338,1 6.5,1 Z"></path></svg>',
			similarItemsIcon = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10.5,19a8.4635,8.4635,0,0,0,5.2618-1.824l4.5311,4.5311a1,1,0,0,0,1.4142-1.4142L17.176,15.7618A8.5,8.5,0,1,0,10.5,19Zm0-15a6.5,6.5,0,0,1,4.66,11.0317c-.023.0193-.0454.04-.0669.0612s-.042.0439-.0612.0669A6.5,6.5,0,1,1,10.5,4Z"></path></svg>';

		//$('<div class="aucInfo"><div class="aucInfoWrapper"><a href="' + $('.lotinfotab').attr('href') + '" class="aucInfoWrapperLink"><span class="aucInfoIcon">' + aucInfoIcon + '</span><span class="aucInfoText">Auction Info</span></a></div><div class="catalogWrapper"><a href="' + $('.catlg').attr('href') + '" class="catalogWrapperLink"><span class="catalogIcon">' + catalogIcon + '</span><span class="catalogText">Catalogue</span></a></div><div class="similarItemsWrapper"><a href="' + $('.similar-item a').attr('href') + '" class="similarItemsWrapperLink"><span class="similarItemsIcon">' + similarItemsIcon + '</span><span class="similarItemsText">Similar Item</span></a></div></div>').insertAfter($('.threeIconsWrapper'));
		$('<div class="aucInfo"><div class="aucInfoWrapper"><a href="' + $('.lotinfotab').attr('href') + '" class="aucInfoWrapperLink"><span class="aucInfoIcon">' + aucInfoIcon + '</span><span class="aucInfoText">Sale Info</span></a></div><div class="catalogWrapper"><a href="' + $('.catlg').attr('href') + '" class="catalogWrapperLink"><span class="catalogIcon">' + catalogIcon + '</span><span class="catalogText">Catalogue</span></a></div><div class="similarItemsWrapper"><a href="' + $('.similar-item a').attr('href') + '" class="similarItemsWrapperLink"><span class="similarItemsIcon">' + similarItemsIcon + '</span><span class="similarItemsText">Similar Assets</span></a></div></div>').insertAfter($('.threeIconsWrapper'));

		//adding timer,views and history
		let myTimerIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>',
			myViewsIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"></path></svg>',
			myHistoryIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path></svg>',
			myTimerViewsHist = '<div class="myTimerViewsHist"><div class="myTimerWrapper"><span class="myTimerIcon">' + myTimerIcon + '</span><span class="myTimerText"></span></div><div class="myViewsWrapper"><span class="myViewsIcon">' + myViewsIcon + '</span><span class="myViewsText">Viewed ' + $('.value-views').html() + ' times</span></div><div class="myHistoryWrapper"><span class="myHistoryIcon">' + myHistoryIcon + '</span><span class="myHistoryText"></span></div></div>';


		$(myTimerViewsHist).insertAfter($('.aucInfo'));
		//adding current time

		setTimeout(function () {

			if (!$('.cur_time.time-left').is(':empty')) {

				$('.cur_time.time-left').appendTo($('.myTimerText'));
			} else {

				$('.myTimerWrapper').css({ 'display': 'none' });
			}

		}, 1000);


		//adding history bids
		if (!$('.biddingHistoryLink').hasClass('hidden')) {
			$('.biddingHistoryLink').appendTo($('.myHistoryText'));
		} else {
			$('.myHistoryWrapper').css({ 'display': 'none' });
		}


		//add rrp field. Lot details page.
		if ($('.custom-field .value-rrp').html() != undefined && $('.custom-field .value-rrp').length && $('.custom-field .value-rrp').html() != '') {

			//adding RRP field
			$('<div class="myRrpFieldWrapper"><div class="myRrpLabel">' + $('.custom-field .rrp-label').html() + '</div><div class="myRrpValue">' + $('.custom-field .value-rrp').html() + '</div></div>').insertBefore($('.myTimerViewsHist'));
		}


		//bidding area changes
		$('.bidding-fieldset.placebid label.mxbid').html('Your Bid');
		let myPlaceBidIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M8,13h3v3a1,1,0,0,0,2,0V13h3a1,1,0,0,0,0-2H13V8a1,1,0,0,0-2,0v3H8a1,1,0,0,0,0,2Z"></path><path d="M12,23A11,11,0,1,0,1,12,11,11,0,0,0,12,23ZM12,3a9,9,0,1,1-9,9A9,9,0,0,1,12,3Z"></path></svg>';
		$(myPlaceBidIcon).prependTo($('.auc_info_bid .bidfrm fieldset.placebid ul li .unibtn .qbutton-ctl'));
		$(myPlaceBidIcon).prependTo($('.auc_info_bid .bidfrm fieldset.forcebid ul li .unibtn .qbutton-ctl'));

		$('.maxbid-curr').text('$');


		//adding current bid price

		if ($('#currentBid').html() != undefined) {

			function myCurrentBidUpdater() {

				$('.myCurrentBidWrapper').remove();

				let myCurrentBid = $('#currentBid').clone(),
					reserveNotMet = $('#reserve').clone(),
					myCurrentBidWrapper = '<div class="myCurrentBidWrapper"><div class="myCurrentBid">' + myCurrentBid.html() + '</div></div>';

				$(myCurrentBidWrapper).insertAfter($('.aucInfo'));


				$(".lot-details.lot-details-index div.myCurrentBidWrapper").before($(".lot-details.lot-details-index div.custom-field-lcf-rrp"));



				

				if (reserveNotMet.html() != undefined) {

					$('<div class="reserveNotMetWrapper">' + reserveNotMet.html() + '</div>').appendTo($('.myCurrentBidWrapper'));
				}






			}


			// Select the node that will be observed for mutations
			const targetNode = document.getElementById('currentBid');

			// Options for the observer (which mutations to observe)
			const config = { attributes: true, childList: true, subtree: true };

			// Callback function to execute when mutations are observed
			const callback = function (mutationsList, observer) {

				/*mutationsList.forEach(function(mutation){
						console.log(mutation.type === 'childList');
						if (mutation.type === 'childList') {
								myCurrentBidUpdater();
						}
				});*/

				for (let mutation of mutationsList) {
					if (mutation.type === 'childList') {
						myCurrentBidUpdater();
					}
				}
			};

			// Create an observer instance linked to the callback function
			const observer = new MutationObserver(callback);

			// Start observing the target node for configured mutations
			observer.observe(targetNode, config);

			myCurrentBidUpdater();
		}

		//adding buyNowAmount
		if ($('.buyNowAmount').length) {

			myBuyNowAmountWrapper = '<div class="myBuyNowAmountWrapper"><div class="myBuyNowAmount"></div></div>';

			$(myBuyNowAmountWrapper).insertAfter($('.aucInfo'));

			$('.buyNowAmount').appendTo($('.myBuyNowAmount'));

			$('.lbl-buynow-price').parent().css({ 'display': 'none' });

			let mybuyNowAmount = $('.buyNowAmount span #buyNowAmount').clone(),
				btnBuyNow = $('.bidding-fieldset.buying .unibtn .buy-now').val();

			//changing buy now button depending on the user status
			if ($('.listnav .logout').length) {
				$('.bidding-fieldset.buying .unibtn input[type=button].orng').val(btnBuyNow + ' AU$ ' + $.trim(mybuyNowAmount.text()));
			} else {
				$('.bidding-fieldset.buying .unibtn input[type=button].orng').val('Login to Buy');
			}


			var nodes = $(".lot-details.lot-details-index span.buyNowAmount")[0].childNodes;
			
			

			for (var i = 0; i < nodes.length; i++) {
				
				if (nodes[i].nodeValue != null && nodes[i].nodeValue.trim().length > 0) {


					var newElement = document.createElement("label");
					newElement.innerHTML = nodes[i].nodeValue.trim();
					newElement.id = "buy_now_lbl";
					nodes[i].replaceWith(newElement);

				}
			}

			setTimeout(
				function () {

					var selected_language = $(".lot-details.lot-details-index a.sbSelector").text().trim();
					
					if (selected_language == "English") {
						$("#buy_now_lbl").text("Buy Now (Tax Ex):");
					} else {
						$("#buy_now_lbl").text("Beli Sekarang (Ex Tax):");
					}


				}, 500);

		}

		//moving current bid area under the photo gallery
		$('.cur_bid').appendTo($('.auc_slide'));

		// 

		if ($(".lot-details.lot-details-index").html()) {




			setTimeout(
				function () {



					var saleNo = $(".lot-details.lot-details-index div.myAuctionNumber").first().text().trim();
					
					$(".lot-details.lot-details-index div#pnlOtherLots > a").each(function () {


						

						var nodes = $(this).first()[0].childNodes;
						
						for (var i = 0; i < nodes.length; i++) {
							
							

							if (nodes[i].nodeValue != null && nodes[i].nodeValue.trim().length > 0) {
								var newElement = document.createElement("label");
								var updatedText = nodes[i].nodeValue.trim().replace(/LOT/igm, "Asset No");
								newElement.innerHTML = updatedText + " - " + saleNo;
								nodes[i].replaceWith(newElement);

							}
						}


					});





					if ($(".lot-details.lot-details-index div.custom-field-lcf-rrp span.value-lcf_rrp").length > 0) {

						var rrpValue = parseInt($(".lot-details.lot-details-index div.custom-field-lcf-rrp span.value-lcf_rrp").text().trim());
						

						if ($(".lot-details.lot-details-index div.custom-field-lcf-rrp span.value-lcf_rrp").text().trim().length > 0 && rrpValue >= 1) {

							$(".lot-details.lot-details-index div.custom-field-lcf-rrp").attr("style", "display:block");

							$(".lot-details.lot-details-index div.right div.aucInfo").after($(".lot-details.lot-details-index div.custom-field-lcf-rrp"));

						}


					} else {
						
					}


				}, 1000);



		}


		//move Plant Hazard Reports
		//let myPlantHazardReports = '<div class="myPlantHazardReports"><a href="' + $('.value-plant_hazard_reports a.custom_file').attr('href') + '" class="myPlantHazardReportsLink"><div class="myPlantHazardReportsText">Plant Hazard Reports</div><div class="myPlantHazardReportsIcon"><svg class="MuiSvgIcon-root jss306 jss305" focusable="false" viewBox="0 0 64 64" aria-hidden="true" role="presentation"><path d="M32,44.3L18.8,31.1l3.6-3.6l7.1,7.1V9.3h5v25.3l7.1-7.1l3.6,3.6L32,44.3z M46.6,43.8v5.8H17.4v-5.8h-5v10.9h39.3V43.8H46.6z"></path></svg></div></a></div>';
		let myPlantHazardReports = '<div class="myPlantHazardReports"><a href="#" class="myPlantHazardReportsLink"><div class="myPlantHazardReportsText">Attachments</div><div class="myPlantHazardReportsIcon"><svg class="MuiSvgIcon-root jss306 jss305" focusable="false" viewBox="0 0 64 64" aria-hidden="true" role="presentation"><path d="M32,44.3L18.8,31.1l3.6-3.6l7.1,7.1V9.3h5v25.3l7.1-7.1l3.6,3.6L32,44.3z M46.6,43.8v5.8H17.4v-5.8h-5v10.9h39.3V43.8H46.6z"></path></svg></div></a><div class="downloadArea"></div></div>';

		if ($('.value-plant_hazard_reports a.custom_file').attr('title') != '') {

			$(myPlantHazardReports).appendTo($('.auc_slide'));
			$('.value-plant_hazard_reports > a').each(function () {

				$(this).appendTo($('.downloadArea'));
			});

			$('.myPlantHazardReportsLink').on('click', function (e) {
				e.preventDefault();
				$('.downloadArea').toggle();
			});
		}


		//if user is not logged in we change login button left corners
		if ($('.auc_info_bid .bidfrm fieldset.placebid ul li .unibtn .qbutton-ctl input.orng.place-bid').val() == 'Login to bid') {

			$('.auc_info_bid .bidfrm fieldset.placebid ul li .unibtn .qbutton-ctl input.orng.place-bid').addClass('not-logged-in');
		}

		//adding custom fields table
		let myCustomFieldTable = '<div class="myCustomFieldTableWrapper"><div class="myCustomFieldTable"></div></div>';

		$(myCustomFieldTable).insertAfter($('.auc_info_bid'));

		//adding start time
		let myStartTime = '<div class="myStartTime"><div class="myStartTimeIcon myIcon">\
        						<svg class="MuiSvgIcon-root jss432" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>\
        					</div>\
        					<div class="myStartTimeText myText">\
        						<div class="myCustomTitle">Start Time</div>\
        						<div class="myCustomValue">' + $('.value-auction-start-date').html() + '</div>\
        					</div></div>';
		if ($('.value-auction-start-date').text() != '') {

			$(myStartTime).appendTo($('.myCustomFieldTable'));
		}

		//adding GST 
		let myGST = '<div class="myGST"><div class="myGSTIcon myIcon">\
        						<svg class="MuiSvgIcon-root jss432" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M17.5,18.7793a1.5,1.5,0,1,0-1.5-1.5A1.5,1.5,0,0,0,17.5,18.7793Zm0,2a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0, 0,1,17.5,20.7793Zm-11-13a1.5,1.5,0,1,0-1.5-1.5A1.5,1.5,0,0,0,6.5,7.7793Zm0,2a3.5,3.5,0,1,1,3.5-3.5A3.5, 3.5,0,0,1,6.5,9.7793ZM18.2929,4.0722a1,1,0,1,1,1.4142,1.4143l-14,14a1,1,0,1,1-1.4142-1.4143Z"></path></svg>\
        					</div>\
        					<div class="myGSTText myText">\
        						<div class="myCustomTitle">Tax</div>\
        						<div class="myCustomValue">' + $('.value-gst-info').html() + '</div>\
        					</div></div>';
		if ($('.value-gst-info').text() != '') {

			$(myGST).appendTo($('.myCustomFieldTable'));
		}

		//adding End Time
		let myEndTime = '<div class="myEndTime"><div class="myEndTimeIcon myIcon">\
        						<svg class="MuiSvgIcon-root jss432" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>\
        					</div>\
        					<div class="myEndTimeText myText">\
        						<div class="myCustomTitle">End Time</div>\
        						<div class="myCustomValue">' + $('.value-lot-end-date').html() + '</div>\
        					</div></div>';
		if ($('.value-lot-end-date').text() != '') {

			$(myEndTime).appendTo($('.myCustomFieldTable'));
		}

		//adding Buyer's Premium
		let myBuyerPremium = '<div class="myBuyerPremium"><div class="myBuyerPremiumIcon myIcon">\
        						<svg class="MuiSvgIcon-root jss432" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></svg>\
        					</div>\
        					<div class="myBuyerPremiumText myText">\
        						<div class="myCustomTitle">Buyer\'s Premium</div>\
        						<div class="myCustomValue">' + $('.value-premium-info').html() + '</div>\
        					</div></div>';
		if ($('.value-premium-info').text() != '') {

			$(myBuyerPremium).appendTo($('.myCustomFieldTable'));
		}

		//adding Sale Location
		let mySaleLocation = '<div class="mySaleLocation"><div class="mySaleLocationIcon myIcon">\
        						<svg class="MuiSvgIcon-root jss432" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M17.2259527,19.8127445 C16.2070021,20.8883035 15.118253,21.8681776 14.0291768,22.735405 C13.6473986,23.0394136 13.2921737,23.3081093 12.9722093,23.5391947 C12.777224,23.6800174 12.6351454,23.77842 12.5547002,23.8320502 C12.2188008,24.0559831 11.7811992,24.0559831 11.4452998,23.8320502 C11.3648546,23.77842 11.222776,23.6800174 11.0277907,23.5391947 C10.7078263,23.3081093 10.3526014,23.0394136 9.97082322,22.735405 C8.88174698,21.8681776 7.7929979,20.8883035 6.77404732,19.8127445 C3.80240157,16.6760073 2,13.3716045 2,9.99999985 C2.00000008,4.47715241 6.47715256,-2.22044605e-16 12,0 C17.5228474,2.22044605e-16 21.9999999,4.47715241 22,9.99999985 C22,13.3716045 20.1975984,16.6760073 17.2259527,19.8127445 Z M12.7833232,21.1708447 C13.803622,20.3583846 14.8242479,19.4398213 15.7740473,18.4372552 C18.4274016,15.6364924 20,12.7533953 20,9.99999987 C19.9999999,5.58172193 16.418278,2 12,2 C7.58172205,2 4.00000007,5.58172193 4,9.99999987 C4,12.7533953 5.57259843,15.6364924 8.22595268,18.4372552 C9.1757521,19.4398213 10.196378,20.3583846 11.2166768,21.1708447 C11.4951711,21.3926087 11.7576885,21.5936102 12,21.7726167 C12.2423115,21.5936102 12.5048289,21.3926087 12.7833232,21.1708447 Z M12,13.9999999 C9.790861,13.9999999 8,12.2091389 8,9.99999987 C8,7.79086087 9.790861,5.99999987 12,5.99999987 C14.209139,5.99999987 16,7.79086087 16,9.99999987 C16,12.2091389 14.209139,13.9999999 12,13.9999999 Z M12,11.9999999 C13.1045695,11.9999999 14,11.1045694 14,9.99999987 C14,8.89543037 13.1045695,7.99999987 12,7.99999987 C10.8954305,7.99999987 10,8.89543037 10,9.99999987 C10,11.1045694 10.8954305,11.9999999 12,11.9999999 Z"></path></svg>\
        					</div>\
        					<div class="mySaleLocationText myText">\
        						<div class="myCustomTitle">Sale Location</div>\
        						<div class="myCustomValue">' + $('.value-sale-location').html() + '</div>\
        					</div></div>';
		if ($('.value-sale-location').text() != '') {

			$(mySaleLocation).appendTo($('.myCustomFieldTable'));
		}

		//adding Condition
		let myCondition = '<div class="myCondition"><div class="myConditionIcon myIcon">\
        						<svg class="MuiSvgIcon-root jss432" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><defs><clipPath id="ab"><path d="M9,3V5h6V3ZM7,5H6A1,1,0,0,0,5,6V20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H17a2,2,0,0,1-2,2H9A2,2,0,0,1,7,5ZM17,3h1a3,3,0,0,1,3,3V20a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V6A3,3,0,0,1,6,3H7A2,2,0,0,1,9,1h6A2,2,0,0,1,17,3Z" fill="none"></path></clipPath></defs><rect x="-2" y="-4" width="28" height="32" clip-path="url(#ab)"></rect></svg>\
        					</div>\
        					<div class="myConditionText myText">\
        						<div class="myCustomTitle">Condition</div>\
        						<div class="myCustomValue">' + $('.value-condition').html() + '</div>\
        					</div></div>';
		if ($('.value-condition').text() != '') {

			$(myCondition).appendTo($('.myCustomFieldTable'));
		}

		//adding Enquires
		let myEnquires = '<div class="myEnquires"><div class="myEnquiresIcon myIcon">\
        						<svg class="MuiSvgIcon-root jss432" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><defs><clipPath id="abc"><path d="M21,7.9207l-8.4265,5.8985a1,1,0,0,1-1.147,0L3,7.9207V18a1.0059,1.0059,0,0,0,1,1H20a1.0059, 1.0059,0,0,0,1-1ZM20.8934,5.554A1.0059,1.0059,0,0,0,20,5H4a1.0059,1.0059,0,0,0-.8934.554L12, 11.7793ZM23,5.9826q0,.0149,0,.03V18a3.0059,3.0059,0,0,1-3,3H4a3.0059,3.0059,0,0, 1-3-3V6.0123q0-.0149,0-.03A3.006,3.006,0,0,1,4,3H20A3.006,3.006,0,0,1,23,5.9826Z" fill="none"></path></clipPath></defs><rect x="-4.0001" y="-2" width="32.0002" height="28" clip-path="url(#abc)"></rect></svg>\
        					</div>\
        					<div class="myEnquiresText myText">\
        						<div class="myCustomTitle">Enquiries</div>\
        						<div class="myCustomValue">' + $('.value-auction-email').html() + '</div>\
        					</div></div>';
		if ($('.value-auction-email').text() != '') {

			$(myEnquires).appendTo($('.myCustomFieldTable'));
		}

		setTimeout(function () {
			$('.list_carousel h3.dk_title').html('Recommend Assets');
		}, 2000);

		var winWidth = $(window).width();
		if (winWidth <= 568) {

			function tabsChange() {

				$('ul#nav>li').each(function () {
					$(this).removeClass('active');
					$('section', this).removeClass('is-open').addClass('tabnone');
				});
			}

			tabsChange();
		}

		//check if tab has terms and condition
		$('#nav>li>a').each(function () {

			if ($(this).html() == 'Terms and conditions') {
				$(this).addClass('terms-and-conditions');
			}
		});
	}


	//catalog info page
	if (myBody.hasClass('auctions-info')) {

		//adding auction name and lot name to the top link-menu
		var myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> <a href="' + $('.catlg').attr('href') + '" class="auc-name">Catalogue</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>' + $('.myAuctionNameText').html() + '</div>';

		$('#wrapper').prepend(myTxt);
	}

	//profile
	if (myBody.hasClass('profile')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> Profile </div>';
		$('#wrapper').prepend(myTxt);
	}

	//my-alerts
	if (myBody.hasClass('my-alerts')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> Alerts </div>';
		$('.container').prepend(myTxt);
	}

	//my-items-bidding"
	if (myBody.hasClass('my-items-bidding')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> Bidding on </div>';
		$('#wrapper').prepend(myTxt);
	}

	//my-items-watchlist
	if (myBody.hasClass('my-items-watchlist')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> Watchlist </div>';
		$('#wrapper').prepend(myTxt);
	}

	//my-items-watchlist
	if (myBody.hasClass('my-items-won')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> Items Won </div>';
		$('#wrapper').prepend(myTxt);
	}

	//my-items-watchlist
	if (myBody.hasClass('my-items-not-won')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> Items Not Won </div>';
		$('#wrapper').prepend(myTxt);
	}

	//my-items-watchlist
	if (myBody.hasClass('my-items-all')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> All Items </div>';
		$('#wrapper').prepend(myTxt);
	}

	//my-items-watchlist
	if (myBody.hasClass('my-invoices')) {

		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> Invoices </div>';
		$('#wrapper').prepend(myTxt);
	}


	if ($(".auctions.auctions-catalog").html()) {





	}

	if (myBody.hasClass('auctions-catalog') || myBody.hasClass('search') || myBody.hasClass('my-items')) {


		//
		var saleType = $(".auctions.auctions-catalog span#acf_sale_type").text().trim();
		if (saleType.length > 0) {

			var saleTypeHTML = `
			
			<div class="mySalesTypeWrapper">
					<div class="mySalesNameText"><span id='sales_type_title'>Sale Type:</span> <span 'sales_type_value' >`+ saleType + `</span></div>
			</div>
			
			`;
			$(".auctions.auctions-catalog div.myAuctionNameWrapper").after(saleTypeHTML);

		}


		//adding RRP field

		$('.timed-forcebid').on('click', function () {

			
			$(this).focus();
		});

		//move advanced search elements
		$('.advSearchAccordionContent .categories').insertBefore($('.advSearchAccordionContent .sort-by'));
		$('.advSearchAccordionContent .categories-match').insertAfter($('.advSearchAccordionContent .categories'));

		//check if catalog top custom fields exist

		$('.myTopCatalogContainer .myStartDate').html() == '' || $('.myTopCatalogContainer .myStartDate').text().trim().length == 0 ? $('.myStartTimeTop').css({ 'display': 'none' }) : false;
		$('.myTopCatalogContainer .myEnquiresTopValue').html() == '' ? $('.myEnquiresTop').css({ 'display': 'none' }) : false;
		$('.myTopCatalogContainer .mySaleLocationTopValue').html() == '' ? $('.mySaleLocationTop').css({ 'display': 'none' }) : false;
		$('.myTopCatalogContainer .myBuyerPremiumTopValue').html() == '' ? $('.myBuyerPremiumTop').css({ 'display': 'none' }) : false;
		$('.myTopCatalogContainer .myEndTimeTopValue').html() == '' || $('.myTopCatalogContainer .myStartDate').text().trim().length == 0 ? $('.myEndTimeTop').css({ 'display': 'none' }) : false;
		$('.myTopCatalogContainer .myDescriptionValue').html() == '' ? $('.myDescriptionValue').css({ 'display': 'none' }) : false;

		if ($('.myTopCatalogContainer .myStartDate').html() == '' || $('.myTopCatalogContainer .myStartDate').text().trim().length == 0) {
			$(".auctions.auctions-catalog div.jss304:nth-child(2)").attr("style", "border-right:1px solid #E5E5E5");
			$(".auctions.auctions-catalog div.MuiBox-root.jss301 div.jss303").attr("style", "padding-bottom:20px");

		}

		let myTimerIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>';

		$('<div class="myTimerWrapper"><div class="myTimerIcon">' + myTimerIcon + '</div><div class="myTimerText">' + $('.myStartDate').html() + '</div></div>').insertAfter($('.myAuctionNameWrapper'));

		//adding auction name and lot name to the top link-menu
		var myURL = window.location.href.split('/');
		let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Sales</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> <a href="/auctions/info/id/' + myURL[6] + '" class="lotinfotab">Info</a> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg> ' + $('.myAuctionNameText').text() + '</div>';

		$('.right.col_rt').prepend(myTxt);

		//adding views icons
		let myGridViewIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M4,4 L4,9 L9,9 L9,4 L4,4 Z M3,2 L10,2 C10.5522847,2 11,2.44771525 11,3 L11,10 C11,10.5522847 10.5522847,11 10,11 L3,11 C2.44771525,11 2,10.5522847 2,10 L2,3 C2,2.44771525 2.44771525,2 3,2 Z M14,2 L21,2 C21.5522847,2 22,2.44771525 22,3 L22,10 C22,10.5522847 21.5522847,11 21,11 L14,11 C13.4477153,11 13,10.5522847 13,10 L13,3 C13,2.44771525 13.4477153,2 14,2 Z M15,9 L20,9 L20,4 L15,4 L15,9 Z M14,13 L21,13 C21.5522847,13 22,13.4477153 22,14 L22,21 C22,21.5522847 21.5522847,22 21,22 L14,22 C13.4477153,22 13,21.5522847 13,21 L13,14 C13,13.4477153 13.4477153,13 14,13 Z M15,20 L20,20 L20,15 L15,15 L15,20 Z M3,13 L10,13 C10.5522847,13 11,13.4477153 11,14 L11,21 C11,21.5522847 10.5522847,22 10,22 L3,22 C2.44771525,22 2,21.5522847 2,21 L2,14 C2,13.4477153 2.44771525,13 3,13 Z M4,20 L9,20 L9,15 L4,15 L4,20 Z"></path></svg>',
			myListViewIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>';

		$('<div class="listView">' + myListViewIcon + ' List</div>').appendTo($('.grid_list > .lst'));
		$('<div class="gridView">' + myGridViewIcon + ' Grid</div>').appendTo($('.grid_list > .sqr'));

		const myChangeFunction = function () {


			$('.aucbid.auclisted .item-block').each(function () {

				var lotNoValue = $(this).find(".auc-lot-link").text() + "-" + $(".auctions.auctions-catalog div.myAuctionNumber").text();
				
				$(this).find(".auc-lot-link").text(lotNoValue);


				//moving estimates box to the title area
				$('.info-col-mobile', this).appendTo($('.info-col', this));

				//adding $ sign to the input
				$("<div class='myDollarSign'>$</div>").prependTo($('.bdinfo .left .currency-input .qtextbox-ctl', this));

				//marking estimates as estimates
				$('ul.price-info > li').each(function () {

					if ($('span.title', this).text() == 'Estimates') {

						$(this).addClass('myEstimates');
					}
				});

				//changing place of the watchlist checkbox
				const myWatchListWrapper = '<div class="myWatchListWrapper"></div>';

				$(myWatchListWrapper).appendTo($('.list-cols.info-col', this));

				$('.bd-chk', this).appendTo($('.myWatchListWrapper', this));

				//adding history and reserve not met
				const myHistoryReserve = '<div class="myHistoryReserve"><div class="myHistoryBidWrapper"><div class="myHistoryBidIcon"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path></svg></div><div class="myHistoryBidText"></div></div><div class="myReserveNotMet"></div></div>';
				$(myHistoryReserve).insertAfter($('div.bdttle', this));
				$('.reserve-not-met', this).appendTo($('.myReserveNotMet', this));

				if ($('.item-bidhistory .value .bid-history a', this).length) {

					let myBidTxt = $('.item-bidhistory .value .bid-history', this).html();

					myBidTxt = myBidTxt.replace('Bidding history(', '');
					myBidTxt = myBidTxt.replace(')', '');

					$('.myHistoryBidText', this).html(myBidTxt);
				}

				let rendomNumb = (Math.random() * 10000).toFixed(0);

				//adding timer, location and condition
				const myTimerIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>',
					mySaleLocationIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M17.2259527,19.8127445 C16.2070021,20.8883035 15.118253,21.8681776 14.0291768,22.735405 C13.6473986,23.0394136 13.2921737,23.3081093 12.9722093,23.5391947 C12.777224,23.6800174 12.6351454,23.77842 12.5547002,23.8320502 C12.2188008,24.0559831 11.7811992,24.0559831 11.4452998,23.8320502 C11.3648546,23.77842 11.222776,23.6800174 11.0277907,23.5391947 C10.7078263,23.3081093 10.3526014,23.0394136 9.97082322,22.735405 C8.88174698,21.8681776 7.7929979,20.8883035 6.77404732,19.8127445 C3.80240157,16.6760073 2,13.3716045 2,9.99999985 C2.00000008,4.47715241 6.47715256,-2.22044605e-16 12,0 C17.5228474,2.22044605e-16 21.9999999,4.47715241 22,9.99999985 C22,13.3716045 20.1975984,16.6760073 17.2259527,19.8127445 Z M12.7833232,21.1708447 C13.803622,20.3583846 14.8242479,19.4398213 15.7740473,18.4372552 C18.4274016,15.6364924 20,12.7533953 20,9.99999987 C19.9999999,5.58172193 16.418278,2 12,2 C7.58172205,2 4.00000007,5.58172193 4,9.99999987 C4,12.7533953 5.57259843,15.6364924 8.22595268,18.4372552 C9.1757521,19.4398213 10.196378,20.3583846 11.2166768,21.1708447 C11.4951711,21.3926087 11.7576885,21.5936102 12,21.7726167 C12.2423115,21.5936102 12.5048289,21.3926087 12.7833232,21.1708447 Z M12,13.9999999 C9.790861,13.9999999 8,12.2091389 8,9.99999987 C8,7.79086087 9.790861,5.99999987 12,5.99999987 C14.209139,5.99999987 16,7.79086087 16,9.99999987 C16,12.2091389 14.209139,13.9999999 12,13.9999999 Z M12,11.9999999 C13.1045695,11.9999999 14,11.1045694 14,9.99999987 C14,8.89543037 13.1045695,7.99999987 12,7.99999987 C10.8954305,7.99999987 10,8.89543037 10,9.99999987 C10,11.1045694 10.8954305,11.9999999 12,11.9999999 Z"></path></svg>',
					myConditionIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><defs><clipPath id="conditionIcon' + rendomNumb + '"><path d="M9,3V5h6V3ZM7,5H6A1,1,0,0,0,5,6V20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H17a2,2,0,0,1-2,2H9A2,2,0,0,1,7,5ZM17,3h1a3,3,0,0,1,3,3V20a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V6A3,3,0,0,1,6,3H7A2,2,0,0,1,9,1h6A2,2,0,0,1,17,3Z" fill="none"></path></clipPath></defs><rect x="-2" y="-4" width="28" height="32" clip-path="url(#conditionIcon' + rendomNumb + ')"></rect></svg>';

				const myTimerLocationCondition = '<div class="myTimerLocationConditionWrapper">\
        										  		<div class="myInnerTimerWrapper">\
        										  			<div class="myTimerIcon">' + myTimerIcon + '</div>\
        										  			<div class="myTimerText"></div>\
        										  		</div>\
        										  		<div class="mySaleLocationWrapper">\
        										  			<div class="mySaleLocationIcon">' + mySaleLocationIcon + '</div>\
        										  			<div class="mySaleLocationText"></div>\
        										  		</div>\
        										  		<div class="myConditionWrapper">\
        										  			<div class="myConditionIcon">' + myConditionIcon + '</div>\
        										  			<div class="myConditionText"></div>\
        										  		</div>\
        										  </div>';

				$(myTimerLocationCondition).insertAfter($('.list-cols.info-col-mobile', this));

				//adding timer if timer exists
				$('.timelft.time-left', this).appendTo($('.myTimerText', this));

				if (!$('.timelft.time-left', this).length || $('.item-win-bid', this).length || $('#item-status', this).length) {

					$('.myInnerTimerWrapper', this).css({ 'display': 'none' });

				}


				//adding sale location if field exists
				if ($('.item-citem_location', this).length) {

					$('.item-citem_location .value', this).appendTo($('.mySaleLocationText', this));

				} else {

					$('.mySaleLocationWrapper', this).css({ 'display': 'none' });

				}

				//adding condition if field exists
				if ($('.item-ccondition', this).length) {

					$('.item-ccondition .value', this).appendTo($('.myConditionText', this));

				} else {

					$('.myConditionText', this).parent().css({ 'display': 'none' });

				}

				//adding icon to the bidding button
				const myPlaceBidIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M8,13h3v3a1,1,0,0,0,2,0V13h3a1,1,0,0,0,0-2H13V8a1,1,0,0,0-2,0v3H8a1,1,0,0,0,0,2Z"></path><path d="M12,23A11,11,0,1,0,1,12,11,11,0,0,0,12,23ZM12,3a9,9,0,1,1-9,9A9,9,0,0,1,12,3Z"></path></svg>';
				$(myPlaceBidIcon).appendTo($('.bdinfo section.right .unibtn .qbutton-ctl', this));


				let myCurrentBidUpdater = function (elem) {

					$('.myCurrentStartBidText', elem).remove();


					//adding starting bid or current bid to the right area
					const myCurrentStartBidText = '<div class="myCurrentStartBidText"></div>';
					$(myCurrentStartBidText).prependTo($('.bidding-col', elem));

					if ($('.item-starting-bid', elem).length) {

						$('.item-starting-bid .value', elem).clone().appendTo($('.myCurrentStartBidText', elem));

					} else if ($('.item-currentbid', elem).length) {

						$('.item-currentbid .value', elem).clone().appendTo($('.myCurrentStartBidText', elem));

					}
				}

				// Select the node that will be observed for mutations
				const targetNode = $(this).find('.price-info')[0];

				// Options for the observer (which mutations to observe)
				const config = { attributes: true, childList: true, subtree: true };

				// Callback function to execute when mutations are observed
				const callback = function (mutationsList, observer) {

					/*mutationsList.forEach(function(mutation){
							if (mutation.type === 'childList') {
									myCurrentBidUpdater();
							}
					});*/

					for (let mutation of mutationsList) {

						if (mutation.type === 'childList') {

							myCurrentBidUpdater(this);
						}
					}
				};

				// Create an observer instance linked to the callback function
				const observer = new MutationObserver(callback.bind(this));

				// Start observing the target node for configured mutations
				observer.observe(targetNode, config);


				myCurrentBidUpdater(this);


				//RRP field
				if ($('.item-crrp .value', this).length && $('.item-crrp .value', this).html() != undefined && $('.item-crrp .value', this).html() != '') {

					var rrpValue = parseInt($(this).find(".item-crrp .value").text().trim());
					


					//adding RRP field
					if(rrpValue >= 1){
						$('<div class="myRrpFieldWrapper"><div class="myRrpLabel">' + $('.item-crrp .title', this).html() + '</div><div class="myRrpValue">' + $('.item-crrp .value', this).html() + '</div></div>').insertAfter($('.myCurrentStartBidText', this));
					}
					
				}
			});


			//catalog page grid view

			$('.aucbid.aucgrid .item-block').each(function () {

				var lotNoValue = $(this).find(".auc-lot-link").text() + "-" + $(".auctions.auctions-catalog div.myAuctionNumber").text();
				
				$(this).find(".auc-lot-link").text(lotNoValue);


				$('.bdttle', this).insertAfter($('figure', this));

				$('.bd-chk', this).prependTo($('.bdttle', this));

				//adding icon to the bidding button
				const myPlaceBidIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M8,13h3v3a1,1,0,0,0,2,0V13h3a1,1,0,0,0,0-2H13V8a1,1,0,0,0-2,0v3H8a1,1,0,0,0,0,2Z"></path><path d="M12,23A11,11,0,1,0,1,12,11,11,0,0,0,12,23ZM12,3a9,9,0,1,1-9,9A9,9,0,0,1,12,3Z"></path></svg>';
				$(myPlaceBidIcon).appendTo($('.bdinfo section.right .unibtn .qbutton-ctl', this));

				if ($('.item-crrp .value', this).length && $('.item-crrp .value', this).html() != undefined && $('.item-crrp .value', this).html() != '') {

					var rrpValue = parseInt($(this).find(".item-crrp .value").text().trim());
					


					//adding RRP field cagalogue page grid view
					if(rrpValue >= 1){
						$('<div class="myRrpFieldWrapper"><div class="myRrpLabel">' + $('.item-crrp .title', this).html() + '</div><div class="myRrpValue">' + $('.item-crrp .value', this).html() + '</div></div>').insertBefore($('.bdinfo', this));
					}
					
				}

			});




		}

		myChangeFunction();


		$(".auctions.auctions-catalog div.grid_list").append("<div id='advanced_search'></div>");



		$(".auctions.auctions-catalog div.grid_list").append("<div id='grid_options'></div>");
		$("#grid_options").append($(".auctions.auctions-catalog div.grid_list span"));
		$("#grid_options").append($(".auctions.auctions-catalog div.grid_list a"));

		$("#advanced_search").append($(".auctions.auctions-catalog div.filters div.search_toggle.search-toggle-wrapper"));

		// $(".auctions.auctions-catalog div.filters.toppag div.itmspage").append("<div id='pagination_options'></div>");
		// $("#pagination_options").append($(".auctions.auctions-catalog span.txt.textTop"));
		// $("#pagination_options").append($(".auctions.auctions-catalog div.filters.toppag div.itmspage div.selectdrp"));



		$(".auctions.auctions-catalog div.filters.toppag div.itmspage").append($(".auctions.auctions-catalog div.toppag.filters div.pagintn div.page label"));


		$(".auctions.auctions-catalog div.itmspage span.txt").text("Assets per page");


		if ($(".auctions.auctions-catalog div.toppag.filters div.pagintn div.page").length) {

			var nodes = $(".auctions.auctions-catalog div.toppag.filters div.pagintn div.page").first()[0].childNodes;
			
			for (var i = 0; i < nodes.length; i++) {
				
				if (nodes[i].nodeValue != null && nodes[i].nodeValue.trim().length > 0) {


					var newElement = document.createElement("label");
					newElement.id = "lbl_pgn_" + i;
					newElement.innerHTML = nodes[i].nodeValue.trim();
					nodes[i].replaceWith(newElement);

				}
			}

			var viewingItemsElement = $(".auctions.auctions-catalog label#lbl_pgn_2").clone();
			$(viewingItemsElement).attr("id", "bottom_viewwing_items");
			$(".auctions.auctions-catalog div.itmspage.left div.selectdrp").last().after(viewingItemsElement);


			$(".auctions.auctions-catalog div.filters.toppag div.itmspage div.selectdrp").after($(".auctions.auctions-catalog div.page label#lbl_pgn_2"));

		}







	}

	//index page
	if (myBody.hasClass('index')) {

		$('.auclting').each(function () {

			//adding auction number
			$('<div class="myAuctionNumberWrapper"><div class="myAutionNumberText">Sale No:</div><div class="myAutionNumber">' + $('li.aucdes span.sale-no', this).text() + '</div></div>').prependTo($('.aucdes', this));

			//adding auction type
			var auctionTypeKey = $(this).find("li.auc-cf-name-sale-type.auc-cf-select span.auc-cf-key").text().trim();
			var auctionTypeValue = $(this).find("li.auc-cf-name-sale-type.auc-cf-select span.auc-cf-val").text().trim();


			
			if (auctionTypeValue.length > 0) {

				$('<div class="myAuctionTypeWrapper"><div class="myAuctionTypeText">' + auctionTypeKey + ' :</div><div class="myAuctionType">' + auctionTypeValue + '</div></div>').insertAfter($('li.aucdes div h6', this));

			} else {
				$('<div class="myAuctionTypeWrapper"><div class="myAuctionTypeText">&nbsp;</div><div class="myAuctionType">&nbsp;</div></div>').insertAfter($('li.aucdes div h6', this));
			}

			//$('<div class="myAuctionTypeWrapper"><div class="myAuctionTypeText">Auction Type: </div><div class="myAuctionType">' + $('.aucdes > div > p > a:first-child', this).text() + '</div></div>').insertAfter($('li.aucdes div h6', this));

			//adding status and number of lots in auction
			const myStatusNumberOfLots = '<div class="myStatusNumberOfLotsWrapper"><div class="myStatus">' + $('.aucdes div p span a', this).text() + '</div><div class="myNumberOfLotsWrapper"><div class="myNumberOfLotsIcons"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M21.3351,4.5482l-8-4a3,3,0,0,0-2.67,0L2.6628,4.5493A2.9991,2.9991,0,0,0,1,7.2332v9.52a2.9974,2.9974,0,0,0,1.65,2.6931l8.0028,4.0014a3,3,0,0,0,2.6847,0l8-4A2.9994,2.9994,0,0,0,23,16.7651V7.2329A3,3,0,0,0,21.3351,4.5482ZM11,21.3857,3.5473,17.6593A.9988.9988,0,0,1,3,16.7607V7.6118l8,4ZM4.2412,5.9962l7.3161-3.658a.9988.9988,0,0,1,.8869.0006L19.759,5.9962,12,9.8757ZM21,16.7637a1,1,0,0,1-.555.8945L13,21.3807V11.6118l8-4Z"></path></svg></div><div class="myNumberOfLotsText">' + $('.aucdes div p:nth-child(4)', this).text() + '</div></div></div>';
			$(myStatusNumberOfLots).insertAfter($('.myAuctionTypeWrapper', this));

			//adding start end time and location
			const myStartEndTimeLocation = '<div class="myStartEndTimeLocationWrapper"><div class="myStartEndTimeWrapper"><div class="myStartEndTimeIcon"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg></div><div class="myStartEndTimeText"></div></div><div class="myLocationWrapper"><div class="myLocationIcon"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M17.2259527,19.8127445 C16.2070021,20.8883035 15.118253,21.8681776 14.0291768,22.735405 C13.6473986,23.0394136 13.2921737,23.3081093 12.9722093,23.5391947 C12.777224,23.6800174 12.6351454,23.77842 12.5547002,23.8320502 C12.2188008,24.0559831 11.7811992,24.0559831 11.4452998,23.8320502 C11.3648546,23.77842 11.222776,23.6800174 11.0277907,23.5391947 C10.7078263,23.3081093 10.3526014,23.0394136 9.97082322,22.735405 C8.88174698,21.8681776 7.7929979,20.8883035 6.77404732,19.8127445 C3.80240157,16.6760073 2,13.3716045 2,9.99999985 C2.00000008,4.47715241 6.47715256,-2.22044605e-16 12,0 C17.5228474,2.22044605e-16 21.9999999,4.47715241 22,9.99999985 C22,13.3716045 20.1975984,16.6760073 17.2259527,19.8127445 Z M12.7833232,21.1708447 C13.803622,20.3583846 14.8242479,19.4398213 15.7740473,18.4372552 C18.4274016,15.6364924 20,12.7533953 20,9.99999987 C19.9999999,5.58172193 16.418278,2 12,2 C7.58172205,2 4.00000007,5.58172193 4,9.99999987 C4,12.7533953 5.57259843,15.6364924 8.22595268,18.4372552 C9.1757521,19.4398213 10.196378,20.3583846 11.2166768,21.1708447 C11.4951711,21.3926087 11.7576885,21.5936102 12,21.7726167 C12.2423115,21.5936102 12.5048289,21.3926087 12.7833232,21.1708447 Z M12,13.9999999 C9.790861,13.9999999 8,12.2091389 8,9.99999987 C8,7.79086087 9.790861,5.99999987 12,5.99999987 C14.209139,5.99999987 16,7.79086087 16,9.99999987 C16,12.2091389 14.209139,13.9999999 12,13.9999999 Z M12,11.9999999 C13.1045695,11.9999999 14,11.1045694 14,9.99999987 C14,8.89543037 13.1045695,7.99999987 12,7.99999987 C10.8954305,7.99999987 10,8.89543037 10,9.99999987 C10,11.1045694 10.8954305,11.9999999 12,11.9999999 Z"></path></svg></div><div class="myLocationText"></div></div></div>';
			$(myStartEndTimeLocation).insertAfter($('.myStatusNumberOfLotsWrapper', this));


			//if start end time exist - add it to start time if not - hide the field
			if ($('.auc-starts-ending-date', this).length) {

				$('.auc-starts-ending-date', this).prependTo($('.myStartEndTimeText', this));
			} else {

				$('.myStartEndTimeWrapper', this).css({ 'display': 'none' });
			}

			//if location exists - add it to location field, if not - hide the field
			if ($('.auc-cf-name-sale-location .auc-cf-val', this).text() != '') {

				$('.auc-cf-name-sale-location .auc-cf-val', this).prependTo($('.myLocationText', this));
			} else {

				$('.myLocationWrapper', this).css({ 'display': 'none' });
			}
		});
	}

	if (myBody.hasClass('auction6') || myBody.hasClass('auction590') || myBody.hasClass('auction592') || myBody.hasClass('auction593') || myBody.hasClass('auction594') || myBody.hasClass('auction637')) {

		$('.item-block').each(function () {

			if ($('.bdinfo section:not(.next-bid-section) .auclistbtn a.orng', this).first().html() == 'Login to bid') {

				$('.bdinfo section:not(.next-bid-section) .auclistbtn a.orng', this).first().parent().css({ 'display': 'none' });
			} else {

			}
		});
	}


	if (myBody.hasClass('my-settlements-view')) {

		window.open = function (url, windowName, windowFeatures) {
			return false;
		};
	}

	// make the height of the description tab adjusted

	if (myBody.hasClass('lot-details') || myBody.hasClass('auctions-info')) {

		winWidth = $(window).width();

		if (winWidth >= 568) {

			$('ul#nav > li').each(function () {

				$(this).removeClass('.active');

				$('> section', this).removeClass('.is-open').addClass('tabhide');
			});

			$('ul#nav > li:first-child').addClass('active');

			$('ul#nav > li:first-child > section').addClass('is-open').removeClass('tabhide');

			var tabHeight = $('.is-open .ins_cnt').outerHeight();

			$('ul#nav').css({ 'height': tabHeight + 40 });

			$('#nav > li > a').on('click', function () {

				$(this).siblings('.tabhide').css({ 'display': 'block' }).removeClass('tabhide').addClass('is-open');

				const $this = $(this);

				const myHeight = function () {
					tabHeight = $this.parent().find('.ins_cnt').outerHeight();
					$('ul#nav').css({ 'height': tabHeight + 40 });
				}

				setTimeout(myHeight, 100);

			});
		}
	}

	if (myBody.hasClass('register-revise-billing')) {

		$('.loginfrm ul.frm>li.cc-info-ctrls input[type="password"]').attr('autocomplete', 'new-password');
		$('#ReviseBillingInfoForm').attr('autocomplete', 'false');
	}

	//load an external js into the head section of the page
	function loadScript(sScriptSrc) {
		var oHead = document.getElementsByTagName('head')[0];
		var oScript = document.createElement('script');
		oScript.type = 'text/javascript';
		oScript.src = (sScriptSrc.indexOf('//') == 0 ? document.location.protocol : '') + sScriptSrc;
		oHead.appendChild(oScript);
	}

	var additionalJS = ['https://www.googletagmanager.com/gtag/js?id=UA-150273964-2'];
	for (idx in additionalJS) { loadScript(additionalJS[idx]); }
	//-- end

	/* .search.search-index div.filters.toppag div.pagintn */

	if ($(".search.search-index")) {
		$(".search.search-index div.filters.toppag div.pagintn").prepend("<div id='items_page_and_page'></div>");

		$("#items_page_and_page").append($(".search.search-index div.filters.toppag div.itmspage"));
		$("#items_page_and_page").append($(".search.search-index div.toppag.filters div.pagintn div.page"));

		$(".search.search-index div.itmspage span.txt").text("Assets per page");

		setTimeout(function () {


			$(".search.search-index div.auc_srch.auclist").prepend("<div id='adv_search_grid_list'></div>");
			$("#adv_search_grid_list").append($(".search.search-index div.filters.toppag"));
			$("#adv_search_grid_list").append($(".search.search-index div.auc_srch.auclist div.grid_list"));

			$("#adv_search_grid_list").after($(".search.search-index div.filters.toppag div.pagintn"));


		}, 1000);


		$(".search.search-index #adv_search_auctions div.ui-widget label").text("Sale");

	}


});
