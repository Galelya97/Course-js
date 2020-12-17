import './index.html';
import './style.css';

ymaps.ready(init);

function init() {
  let balloon;

  const myMap = new ymaps.Map(
    'map',
    {
      center: [55.753994, 37.622093],
      zoom: 10,
    },
    {
      balloonMaxWidth: 250,
      searchControlProvider: 'yandex#search',
    }
  );

  const clusterer = new ymaps.Clusterer({
    preset: 'islands#invertedVioletClusterIcons',
    hasBalloon: false,
    groupByCoordinates: true,
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,

    geoObjectHideIconOnBalloonOpen: false,
  });

  const localReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const proxyReviews = new Proxy(localReviews, {
    set: (target, prop, val) => {
      target[prop] = val;
      localStorage.setItem('reviews', JSON.stringify(target));
    },
  });
  const myGeoObjects = localReviews.map(getPlacemark);

  clusterer.add(myGeoObjects);
  myMap.geoObjects.add(clusterer);
  clusterer.events.add('click', function (e) {
    const coords = e.get('target').geometry.getCoordinates();
    openBalloon(coords);
  });

  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    '{% for review in reviews %}' +
      '<div><b>{{review.userName}}</b> [{{review.placementName}}]</div>' +
      '<div>{{review.userComment}}</div>' +
      '<br>' +
      '{% endfor %}' +
      '<h1>Отзыв:</h1>' +
      '<input id="userName" type="text" placeholder="Укажите ваше имя">' +
      '<input id="placementName" type="text" placeholder="Укажите место">' +
      '<textarea id="userComment" placeholder="Оставьте отзыв"></textarea>' +
      '<div><button id="addReviewButton">Добавить</button></div>',
    {
      build: function () {
        BalloonContentLayout.superclass.build.call(this);
        const button = document.getElementById('addReviewButton');
        button.addEventListener('click', this.myButtonClick);
      },

      clear: function () {
        const button = document.getElementById('addReviewButton');
        button.removeEventListener('click', this.myButtonClick);
        BalloonContentLayout.superclass.clear.call(this);
      },

      myButtonClick: function () {
        const userName = document.getElementById('userName').value;
        const placementName = document.getElementById('placementName').value;
        const userComment = document.getElementById('userComment').value;

        if (!placementName || !userName || !userComment) {
          alert('Заполните все поля формы!');
          return;
        }

        const review = {
          userName,
          placementName,
          userComment,
          coords: balloon.getPosition(),
        };

        proxyReviews.push(review);

        clusterer.add(getPlacemark(review));
        balloon.close();
      },
    }
  );

  balloon = new ymaps.Balloon(myMap, { contentLayout: BalloonContentLayout });
  balloon.options.setParent(myMap.options);

  // Слушаем клик на карте.
  myMap.events.add('click', function (e) {
    const coords = e.get('coords');
    openBalloon(coords);
  });

  // Создание метки.
  function openBalloon(coords) {
    if (balloon.isOpen()) {
      balloon.close();
    } else {
      const reviews = [];
      clusterer.getGeoObjects().forEach(function (item) {
        if (JSON.stringify(item.geometry.getCoordinates()) === JSON.stringify(coords)) {
          reviews.push(item.properties.get('review'));
        }
      });

      balloon.open(coords, { reviews: reviews });
    }
  }

  // Создание метки.
  function getPlacemark(review) {
    return new ymaps.Placemark(
      review.coords,
      { review },
      { preset: 'islands#violetDotIconWithCaption' }
    );
  }
}
