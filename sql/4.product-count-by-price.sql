-- 문제 4. 가격대별 상품개수

SELECT (FLOOR(PRICE / 10000) * 10000) AS PRICE_GROUP,  -- 가격대를 만원 단위로 계산하여 PRICE_GROUP으로 그룹화
        COUNT(PRODUCT_ID) AS PRODUCTS                   -- 해당 가격대의 상품 개수
FROM PRODUCT
GROUP BY (FLOOR(PRICE / 10000) * 10000)                  -- 가격대를 기준으로 그룹화
ORDER BY PRICE_GROUP;                                    -- 가격대 기준 오름차순 정렬 (Default ASC)
