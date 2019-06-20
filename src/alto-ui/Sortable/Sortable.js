import React, { Fragment, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { bemClass } from '../helpers/bem';
import useUniqueKey from '../hooks/useUniqueKey';

import './Sortable.scss';

const context = React.createContext();

function moveByIndex(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const handleDragEnd = (instance, result) => {
  // dropped outside the list
  if (!result.destination) return;

  const { droppableId, index: endIndex } = result.destination;

  // not reordering move
  if (result.source.droppableId !== droppableId) return;

  const { items, onChange } = instance.propsByDroppableId[droppableId];

  if (typeof onChange !== 'function') return;

  const newItems = moveByIndex(items, result.source.index, endIndex);
  onChange(newItems);
};

function Sortable(props) {
  const { className, children, items, itemIdKey, renderDraggable, renderDroppable } = props;
  const droppableId = useUniqueKey(props.id);
  const type = useUniqueKey(props.type);
  const instance = useRef({ propsByDroppableId: {} }).current;

  const sortableContext = useContext(context);

  useEffect(() => {
    if (sortableContext) sortableContext.pushDroppableId(droppableId, props);
    return () => {
      if (sortableContext) sortableContext.removeDroppableId(droppableId);
    };
  });

  const list = (
    <Droppable droppableId={droppableId} type={type}>
      {(providedDroppable, droppableSnapshot) =>
        renderDroppable({
          ref: providedDroppable.innerRef,
          className: bemClass(
            'Sortable',
            {
              dragging: droppableSnapshot.isDraggingOver,
            },
            className
          ),
          children: (
            <Fragment>
              {items.map((item, index) => (
                <Draggable key={item[itemIdKey]} draggableId={item[itemIdKey]} index={index}>
                  {(providedDraggable, draggableSnapshot) => {
                    const itemArgs = [
                      item,
                      {
                        ...providedDraggable.dragHandleProps,
                        className: bemClass('Sortable__handle', {
                          dragging: draggableSnapshot.isDragging,
                        }),
                      },
                      draggableSnapshot.isDragging,
                      index,
                    ];

                    return renderDraggable(
                      {
                        ref: providedDraggable.innerRef,
                        ...providedDraggable.draggableProps,
                        className: bemClass('Sortable__item', {
                          dragging: draggableSnapshot.isDragging,
                        }),
                        children: typeof children === 'function' ? children(...itemArgs) : null,
                      },
                      ...itemArgs
                    );
                  }}
                </Draggable>
              ))}
              {providedDroppable.placeholder}
            </Fragment>
          ),
        })
      }
    </Droppable>
  );

  if (sortableContext) {
    return list;
  }

  function pushDroppableId(id, p) {
    instance.propsByDroppableId = { ...instance.propsByDroppableId, [id]: p };
  }

  function removeDroppableId(id) {
    const { [id]: idToRemoved, ...newPropsByDroppableId } = instance.propsByDroppableId;
    instance.propsByDroppableId = newPropsByDroppableId;
  }

  pushDroppableId(droppableId, props);

  return (
    <context.Provider value={{ pushDroppableId, removeDroppableId }}>
      <DragDropContext onDragEnd={res => handleDragEnd(instance, res)}>{list}</DragDropContext>
    </context.Provider>
  );
}

Sortable.displayName = 'Sortable';

Sortable.defaultProps = {
  itemIdKey: 'id',
  renderDroppable: props => <ul {...props} />,
  renderDraggable: props => <li {...props} />,
};

Sortable.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.func,
  itemIdKey: PropTypes.string,
  items: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: PropTypes.func,
  renderDraggable: PropTypes.func,
  renderDroppable: PropTypes.func,
};

export default Sortable;
