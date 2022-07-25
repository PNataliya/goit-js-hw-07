// В файле gallery-items.js есть массив galleryItems, который содержит объекты с информацией о изображениях: маленькое (превью), оригинальное (большое) и описание. Мы уже подключили его к каждому из JS-файлов проекта.

// Задание 1 - галерея изображений
// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. Посмотри демо видео работы галереи.

// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// 1) Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// 2) Реализация делегирования на div.gallery и получение url большого изображения.
// 3) Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// 4) Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// 5) Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
// 6) Разметка элемента галереи
// 7) Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

// <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>
// Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

// Закрытие с клавиатуры
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.

import { galleryItems } from "./gallery-items.js";
// Change code below this line

// получаем доступ к div где будет храниться коллекция
const galleryContainer = document.querySelector(".gallery");
// создаем переменую где будет храниться вся галерея
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

// добавляем созданную галерею в разметку
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

galleryContainer.addEventListener("click", onModalMarkup);

function onModalMarkup(e) {
  e.preventDefault();

  let instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onCloseEsc);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onCloseEsc);
      },
    }
  );
  instance.show();
}

// закрытие модального окна по нажатию клавиши Escape.

function onCloseEsc(e) {
  if (e.code === "Escape") {
    console.log(e.code);
  }
}

// // Hide the lightbox
// 	const _close = (next) => {

// 		// Run onClose callback and stop execution when function returns false
// 		if (opts.onClose(instance) === false) return false

// 		return close(elem, () => {

// 			// Continue with the callback when available
// 			if (typeof next === 'function') return next(instance)

// 		})

// 	}

// 	// Close lightbox when clicking the background
// 	if (opts.closable === true) elem.addEventListener('click', (e) => {

// 		// If e.target is not the same element as elem,
// 		// then the user clicked a descendant of the element.
// 		if (e.target !== elem) return

// 		// Close lightbox with the instance function
// 		_close()

// 	})

// 	// Assign instance to a variable so the instance can be used
// 	// elsewhere in the current function.
// 	const instance = {
// 		element: _element,
// 		visible: _visible,
// 		show: _show,
// 		close: _close
// 	}

// 	return instance

// }

// document.addEventListener("keydown", (e) => {
//   const modalEl = document.querySelectorAll(".basicLightbox");
//   if (e.code === "Escape") {
//     for (let i = 0; i < modalEl.length; i += 1) {
//       modalEl[i].classList.remove(".basicLightbox--visible");
//     }
//   }
// });

/* <div class="basicLightbox basicLightbox--img basicLightbox--visible">
			<div class="basicLightbox__placeholder" role="dialog"><img src="https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg"></div>
		</div> */
