describe("Admin Dashboard Flow", () => {
  const apiUrl = "http://localhost:5000/api";

  before(() => {
    // تأكد من وجود مستخدم أدمن للاختبار
    cy.request("POST", `${apiUrl}/auth/register`, {
      name: "E2E Admin",
      email: "e2e-admin@example.com",
      password: "password123",
      role: "admin",
    });
  });

  it("logs in, views dashboard, manages worships, and views user stats", () => {
    // 1. زيارة صفحة الدخول
    cy.visit("/login");
    cy.get('input[type="email"]').type("e2e-admin@example.com");
    cy.get('input[type="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // 2. تحقق من إعادة التوجيه للـ Dashboard
    cy.url().should("include", "/admin");
    cy.contains("Total Worships");

    // 3. أضف عبادة جديدة
    cy.contains("Add Worship").click();
    cy.get('input[name="name"]').type("Test Worship");
    cy.get('input[name="points"]').clear().type("5");
    cy.get('input[name="rewardValue"]').clear().type("10");
    cy.contains("Create").click();

    // 4. تحقق من ظهور العبادة في القائمة
    cy.contains("Test Worship").should("exist");
    cy.contains("5").should("exist");

    // 5. انتقل لقائمة المستخدمين وعرض إحصائيات طالب تجريبي
    cy.visit("/admin/users");
    cy.contains("View Stats").first().click();
    cy.contains("User Statistics").should("be.visible");
    cy.contains("Close").click();
  });
});
