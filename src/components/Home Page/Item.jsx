function Item({ items, title }) {
  return (
    <div className="w-100 h-25 pa2">
      <p className="f3 ml3">{title}</p>
      <div className="w-100 flex h-100 flex-wrap">
        {items.length != 0 &&
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-column justify-center w-20 items-center pa2"
            >
              <img src={item.image} alt={item.name} className="w-25 h-25" />
              <p className="ma0 mt2">{item.name}</p>
              <p className="ma0 mt2 f6">{item.description.slice(0, 40)}...</p>
              <p>Price: ₹{item.price}</p>
              <div className="flex justify-around w-80">
                <button className=" btn buy-btn w-50 mr2 h2 bg-purple white f6 br1">
                  Visit
                </button>
                <button className=" btn buy-btn w-50 h2 bg-purple white f6 br1">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Item;
