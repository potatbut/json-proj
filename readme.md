

###### Выполнено на jquery.

------------


1. [JSON файл](https://github.com/potatbut/json-server "JSON файл") с массивами данных, где:
	- "alias" - название месяца,
	- "date_from" - дата начала месяца,
	- "date_to" - дата конца месяца,
	- "number_list" - список номеров для данного месяца,
	- "cdate" - дата, соответствующая номеру из number_list,
	- "is_visible" - статус месяца.

2. Создана таблица с двумя колонками, в одной из которых отображаются номера из number_list для выбранного месяца, а в соседней колонке для всех значений отображается соответствующая им дата из cdate в формате ДД.ММ.ГГГГ.

3. Над таблицей размещена строка поиска, ввод номера в которую отображает найденный номер в таблице, скрыв все остальные.

4. Переключение месяцев в виде табов, в них отображаются только месяцы с соответствующим значением в строке is_visible. 


------------
Еще: 
Функция, которая выводит в консоль время часового пояса UTC. Если время больше 12:00, но меньше 18:00, в консоль выводится дополнительная информция об этом.