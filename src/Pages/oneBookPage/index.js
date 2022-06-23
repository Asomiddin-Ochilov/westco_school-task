import React, { useState, useEffect } from "react";
import { getOneBookData } from "../../Redux/ApiCalls/admin/books";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import { baseURL } from './../../Redux/ApiCalls/baseUrl';
const OnePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getOneBookData(history, id, setLoading).then((res) => {
      console.log(res);
      setLoading(false);
      const { data } = res.data;
      setData(data);
    });
  }, []);
  console.log(data);
  return (
    <div className="one_page ">
      {data && (
        <React.Fragment>
          <div className="content">
            <div className="left">
              <img
                onError={(e) => {
                  e.target.src =
                    "https://beoe.gov.pk/uploads/complaints/results/default/sample.jpg";
                }}
                src={baseURL + data?.imgUrl}
                alt=""
              />
            </div>
            <div className="right">
              <div className="label font">{data?.name}</div>
              <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="description">{data?.description}</div>
              <a
                href="https://asaxiy.uz/product/knigi/toplam/super-chegirma-ellikta-mashhur-kitob-999-000-som"
                target={"_blank"}
              >
                Link to Ebook
              </a>
            </div>
          </div>
          <div className="content_body">
            <div className="label">Product description</div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium quasi itaque, qui similique sunt hic amet ad modi
            aperiam in doloremque ducimus earum, nulla necessitatibus voluptates
            excepturi autem? Nemo ipsum neque, minima illo maiores veritatis
            iusto facere nisi consequuntur, soluta quas totam quos, vero
            deleniti odit. Ab perspiciatis possimus, veniam porro labore ipsam
            laborum nesciunt facilis dolores dolor? Reprehenderit quam error
            deserunt quasi consequatur quod illum! Eligendi aut nostrum nihil
            officia eveniet ipsum quam a quaerat quo autem voluptatum vel
            commodi id labore, rem iste minima numquam architecto porro
            reprehenderit ratione quos? Dicta, mollitia! Dolor laborum autem
            saepe et quae, praesentium quisquam, alias repellendus quas maiores
            placeat explicabo pariatur architecto corrupti voluptate maxime
            facere aspernatur reprehenderit distinctio magni nobis iusto
            consequuntur quidem optio. Reiciendis obcaecati corrupti perferendis
            eaque quidem hic quisquam molestiae itaque. Ad sed ratione a
            expedita quisquam dolore. Rem, necessitatibus laudantium? Illum vero
            neque placeat at? Unde cum aspernatur sint odio esse aliquid
            similique magni obcaecati accusamus corrupti. Harum atque
            reprehenderit, laboriosam qui dicta suscipit in porro eligendi
            consequuntur laborum ipsum quos explicabo fuga sint rerum quisquam
            quia? Saepe aperiam fugiat quos tempora et! Eos quam dolores
            mollitia aliquam atque possimus veritatis placeat accusantium qui
            tempore, nemo odit.
          </div>
        </React.Fragment>
      )}
      <Loader bg={"#fff"} size={48} loading={loading} effect={false} />
    </div>
  );
};

export default OnePage;
