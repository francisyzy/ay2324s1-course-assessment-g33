import React, { useState } from "react";
import { Table } from "react-bootstrap";
import ReadQuestion from "./ReadQuestion";
import DeleteQuestion from "./DeleteQuestion";
import UpdateQuestion from "./UpdateQuestion";

export default function QuestionTable({
  questions,
  currQuestion,
  onValChange,
  onCategoryValChange,
  onDeleteQuestion,
  onUpdateQuestion,
  clearCurrQuestion,
  updateCurrQuestion,
  isAdmin,
}) {
  return (
    <div class="question-table">
      <Table bordered striped>
        <thead>
          <tr>
            <th style={{ width: "15%" }} scope="col">
              ID
            </th>
            <th style={{ width: "25%" }} scope="col">
              Title
            </th>
            <th style={{ width: "30%" }} scope="col">
              Categories
            </th>
            <th style={{ width: "15%" }} scope="col">
              Complexity
            </th>
            {isAdmin && (
              <th style={{ width: "15%" }} scope="col">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {questions.map((data, index) => {
            var categories = "";
            data.categories.sort();
            let i = 0;
            while (i < data.categories.length) {
              categories += data.categories[i];
              if (i < data.categories.length - 1) {
                categories += ", ";
              }
              i++;
            }
            return (
              <tr key={index}>
                <td>{data.id}</td>
                <td className="hover-td">
                  <ReadQuestion question={data} />
                </td>
                <td>{categories}</td>
                <td>{data.complexity}</td>
                {isAdmin && (
                  <td className="flex-td">
                    <div>
                      <UpdateQuestion
                        question={data}
                        allQuestions={questions}
                        currQuestion={currQuestion}
                        onValChange={onValChange}
                        onCategoryValChange={onCategoryValChange}
                        onUpdateQuestion={onUpdateQuestion}
                        clearCurrQuestion={clearCurrQuestion}
                        updateCurrQuestion={updateCurrQuestion}
                      />
                    </div>
                    <div className="delete-button">
                      <DeleteQuestion
                        question={data}
                        onDeleteQuestion={onDeleteQuestion}
                      />
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
